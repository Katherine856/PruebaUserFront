import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../client.service';
import { UserResponse } from '../../interfaces/userResponse';
import { InfoUserComponent } from '../info-user/info-user.component';
import { Router } from '@angular/router';

const COMMA_SEPARATED_NUMBER_PATTERN = /^[0-9,]{10,14}$/;

@Component({
  selector: 'app-form-user',
  standalone: true,
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss',
  imports: [ReactiveFormsModule, CommonModule, InfoUserComponent]
})
export class FormUserComponent {

  showErrorAlert: boolean = false;
  errorMessage: string = '';
  document: string = '';
  user: UserResponse | null = null;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern(COMMA_SEPARATED_NUMBER_PATTERN)]]
    });
  }

  onInputChange(): void {
    const value = this.form.controls['documentNumber'].value;

    const cleanedValue = value.replace(/,/g, '');

    if (!/^\d*$/.test(cleanedValue)) {
      return;
    }

    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    this.form.controls['documentNumber'].setValue(formattedValue, { emitEvent: false });
  }

  onSearch(): void {
    if (this.form.valid) {
      const documentNumber = this.form.controls['documentNumber'].value.replace(/\D/g, '');
      const documentType = this.form.controls['documentType'].value;
      console.log(documentType, documentNumber)
      this.clientService.getUserInfo(documentType, documentNumber).subscribe({
        next: (response) => {
          this.user = response;
          this.showErrorAlert = false;
          this.router.navigate(['/info-user'], { queryParams: { data: JSON.stringify(this.user) } });
        },
        error: (error) => {
          this.showErrorAlert = true;
          this.errorMessage = error.error.message || "No se pudo procesar la solicitud";
        }
      });
    }
  }
}
