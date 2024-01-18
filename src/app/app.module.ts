import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { AppRoutingModuleModule } from './app-routing-module/app-routing-module.module';
import { FacebookLoginProvider } from 'angularx-social-login';
import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyMatDatepickerModule } from "@ngx-formly/material/datepicker";
import * as moment from 'moment';
import { CustomValidateComponent } from './custom-validate/custom-validate.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTimepickerModule } from 'mat-timepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextMaskModule } from 'angular2-text-mask';
import { SignalConceptComponent } from './signal-concept/signal-concept.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { custompipe } from './custom-pipe';
import { DateFormatPipe } from './date-pipe';
import { MatMenuModule } from '@angular/material/menu';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TableComponent } from './table/table.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { SharedModule } from './shared/shared.module';
import { CdkMenuModule } from '@angular/cdk/menu';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddComponent } from './add/add.component';

import { CashfreeComponent } from './cashfree/cashfree.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';
import { LoginComponent } from './login session/login/login.component';
import { AuthGuard } from './login session/auth.guard';
function dateRangeValidator(
  control: AbstractControl,
  field: FormlyFieldConfig
): ValidationErrors | null {
  const model = control.value;
  if (!!model.end && !!model.start && moment(model.end).isAfter(moment(model.start))) {
    console.log("valid");
    return { dateRangeValidator: true }; // this is the opposite of what I thought it should be??
  } else {
    console.log("invalid");
    return null;
  }
}
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    CustomInputComponent,
    custompipe,
    DateFormatPipe,
    CustomValidateComponent,
    SignalConceptComponent,
    ChatBoxComponent,
    TableComponent,
    CustomTableComponent,
    DashboardComponent,
    AddComponent,
    CashfreeComponent,
    RxjsComponent,
    GenerativeAiComponent,
    LoginComponent,







  ],
  imports: [

    NgxPaginationModule,
    SharedModule,

    CdkMenuModule,
    ShareButtonsModule,
    ShareButtonModule,
    PaginationModule.forRoot(),

    ShareIconsModule,
    MatCheckboxModule,
    MatMenuModule,
    BrowserModule,
    MatCardModule,
    DragDropModule,
    MatTimepickerModule,
    ModalModule.forRoot(),
    NgxMaterialTimepickerModule.setOpts('en', 'english'),
    FormlyModule.forRoot({
      validators: [
        {
          name: "dateRangeValidator",
          validation: dateRangeValidator
        }
      ],
      validationMessages: [
        { name: "required", message: "This field is required" },
        {
          name: "dateRangeValidator",
          message: "End date must be after start date"
        }
      ]
    }),
    HttpClientModule,

    SocialLoginModule,
    GoogleSigninButtonModule,
    AppRoutingModuleModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,

    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatSelectModule,

    OAuthModule.forRoot(),
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({

      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(3,2,0,0.1)",
      backdropBorderRadius: "6px",
      primaryColour: "red",
      secondaryColour: "blue",
      tertiaryColour: "blue",
    }),
    SocketIoModule.forRoot(config),

  ],
  providers: [
    Meta,
    AuthGuard,
    OAuthService,

    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '463027236688-og6vrrf257quv7hg4itu5stc116k1uai.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('bf6d89a75235c25d8d5a28cb1aa8acc7')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('bf6d89a75235c25d8d5a28cb1aa8acc7')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
