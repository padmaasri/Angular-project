import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild, computed, effect, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceService } from './service.service';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

import { MatSort } from '@angular/material/sort';
import Inputmask from 'inputmask';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { FacebookLoginProvider } from 'angularx-social-login';
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { CustomValidateComponent } from './custom-validate/custom-validate.component';
import { MatDatepicker } from '@angular/material/datepicker';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.get('start')?.value;
    const endDate = control.get('end')?.value;

    if (startDate && endDate && startDate > endDate) {
      return { dateRangeInvalid: true };
    }

    return null;
  };
}

export const authConfig: AuthConfig = {
  issuer: 'https://www.linkedin.com/oauth/v2/authorization',
  redirectUri: window.location.origin + '/auth/linkedin/callback',
  clientId: '8110cgvg7wbie7',
  responseType: 'code',
  scope: 'r_liteprofile r_emailaddress', // Define the scope you need
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  ngOninit() {


  }

  ngAfterViewInit() {
    Inputmask({ mask: '99/99/9999' }).mask(document.getElementById('date'));
    Inputmask({ mask: '99/99/9999' }).mask(document.getElementById('todate'));
  }
  @Input() control: any;
  title = 'dynamic-table';

  form: FormGroup;
  values: any
  @ViewChild('myInput') myInputElementRef: ElementRef;
  mobilepattern = /^\d{10}$/;
  pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/;
  emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  spacepattern = /^[^\s]+/
  constructor(private service: ServiceService, private dialog: MatDialog, private fb: FormBuilder,
    private authService: SocialAuthService, private oauthService: OAuthService,
    private el: ElementRef) {
    this.form = this.fb.group({
      customInputControl: ['', Validators.required],
      customnumberControl: ['', Validators.required],
      custompasswordControl: ['', Validators.required],
      customemailControl: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    })


  }
  // constructor(private el: ElementRef) { }

  // @HostListener('input', ['$event'])
  // onInput(event: InputEvent) {
  //   const input = event.target as HTMLInputElement;
  //   let value = input.value.replace(/\D/g, '');

  //   if (value.length > 4) {
  //     value = value.slice(0, 4);
  //   }

  //   if (value.length > 2) {
  //     value = `${value.slice(0, 2)}:${value.slice(2)}`;
  //   }

  //   input.value = value;
  // }
  loginWithLinkedIn() {
    this.oauthService.initLoginFlow();
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  @ViewChild('picker') picker: MatDatepicker<Date>;
  ngOnInit(): void {



  }

}


