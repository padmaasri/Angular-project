import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalConceptComponent } from '../signal-concept/signal-concept.component';
import { AppComponent } from '../app.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { TableComponent } from '../table/table.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { AddComponent } from '../add/add.component';



const routes: Routes = [
  // Other routes...
  { path: '', component: DashboardComponent },

  { path: 'signal', component: SignalConceptComponent },
  { path: 'chat', component: ChatBoxComponent },
  { path: 'table', component: TableComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'custominput', component: CustomInputComponent },
  { path: 'add', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModuleModule { }