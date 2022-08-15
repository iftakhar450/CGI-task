import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  ReactiveFormsModule,
} from '@angular/forms';

import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['username'].setValue(
      userEmail
    );
    fixture.componentInstance.loginForm.controls['password'].setValue(
      userPassword
    );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        FlexLayoutModule
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('created a form with username and password input and login button', () => {
    const usernameContainer =
      fixture.debugElement.nativeElement.querySelector('#username');
    const passwordContainer =
      fixture.debugElement.nativeElement.querySelector('#password');
    const loginBtnContainer =
      fixture.debugElement.nativeElement.querySelector('#login-btn');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('should not show in username error', async () => {
    component.loginForm.controls.username.setValue('admin');
    fixture.detectChanges();
    expect(
      component.loginForm.controls['username'].hasError('username')
    ).toBeFalse();
  });

  it('should not show in password error', async () => {
    component.loginForm.controls.username.setValue('12345');
    fixture.detectChanges();
    expect(
      component.loginForm.controls['password'].hasError('password')
    ).toBeFalse();
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm('', '12345');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    const usernameInput =
      fixture.debugElement.nativeElement.querySelectorAll('#username');
    expect(usernameInput[0].classList).toContain('ng-invalid');
  });

  it('When password is blank, username field should display red outline ', () => {
    updateForm('admin', '');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    const passwordInput =
      fixture.debugElement.nativeElement.querySelectorAll('#password');
    expect(passwordInput[0].classList).toContain('ng-invalid');
  });
});
