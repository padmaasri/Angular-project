import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalConceptComponent } from '../signal-concept/signal-concept.component';
import { AppComponent } from '../app.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { TableComponent } from '../table/table.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { AddComponent } from '../add/add.component';
import { CashfreeComponent } from '../cashfree/cashfree.component';
import { RxjsComponent } from '../rxjs/rxjs.component';
import { AppModule } from '../app.module';
import { GenerativeAiComponent } from '../generative-ai/generative-ai.component';
import { LoginComponent } from '../login session/login/login.component';
import { AuthGuard } from '../login session/auth.guard';






const routes: Routes = [
  // Other routes...
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  // { path: 'signal', loadChildren: () => import('../signal-concept/signal-concept.component').then(m => SignalModule) },

  { path: 'signal', component: SignalConceptComponent },
  { path: 'chat', component: ChatBoxComponent, },
  { path: 'table', component: TableComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'custominput', component: CustomInputComponent },
  { path: 'add', component: AddComponent },
  { path: 'cashfree', component: CashfreeComponent },
  { path: 'rxjs', component: RxjsComponent }, {
    path: 'generative', component: GenerativeAiComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModuleModule { }