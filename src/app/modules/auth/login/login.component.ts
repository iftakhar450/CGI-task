import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('admin', [Validators.required]),
    password: new FormControl('12345', [Validators.required]),
  });

  constructor(private router: Router) { }

  /**
   * Getters for Login form
   */
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  ngOnInit(): void {
  }
  /**
   * Sign Function
   */
  signIn() {
    if (!this.loginForm.valid) return;
    this.router.navigateByUrl('/dashboard')
  }

}
