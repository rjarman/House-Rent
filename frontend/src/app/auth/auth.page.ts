import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Login } from '../types';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  private profilePhoto: any;

  isRegistered: boolean;
  loginForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });
  registerForm = this.formBuilder.group({
    userName: [''],
    email: [''],
    password: [''],
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.isRegistered = false;
  }

  toRegister() {
    this.isRegistered = false;
  }

  toLogin() {
    this.isRegistered = true;
  }

  checkLogin() {
    const loginData: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginData);
  }

  checkRegister() {
    this.authService.register(this.registerForm, this.profilePhoto);
  }

  setImages(event) {
    if (event.target.files.length > 0) {
      this.profilePhoto = event.target.files;
    }
  }
}
