import { Component, Input } from '@angular/core';
import { UserResponse } from '../../interfaces/userResponse';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.scss'
})
export class InfoUserComponent {

  userResponse: UserResponse | null = null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userResponse = JSON.parse(params['data']);
    });
  }

  goBack(): void{
    this.router.navigate(['/home']);
  }
}
