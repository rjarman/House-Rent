import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../shared/types';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public isRegistered: boolean;

  private profilePhoto: any;

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
  ngOnInit() {}
  public toRegister() {
    this.isRegistered = false;
  }
  public toLogin() {
    this.isRegistered = true;
  }
  public checkLogin() {
    const loginData: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginData);
  }
  public checkRegister() {
    this.authService.register(this.registerForm, this.profilePhoto);
  }

  setImages(event) {
    if (event.target.files.length > 0) {
      this.profilePhoto = event.target.files;
    }
  }
}
