import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(private router: Router, private fb: FormBuilder,
    private service: AuthService) { }


  ngOnInit(): void {
    this.onSubmit()
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log(this.loginForm, "login")

      // Call the authentication service's login method
      if (this.service.login(username, password)) {

        this.router.navigate(["/dashboard"]);
      } else {
        // Handle authentication error (show error message, etc.)
      }

    }
  }





}
