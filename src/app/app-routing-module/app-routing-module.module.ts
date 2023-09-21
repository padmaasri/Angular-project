import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalConceptComponent } from '../signal-concept/signal-concept.component';
import { AppComponent } from '../app.component';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { TableComponent } from '../table/table.component';



const routes: Routes = [
  // Other routes...
  { path: '', component: AppComponent },
  { path: 'signal', component: SignalConceptComponent },
  { path: 'chat', component: ChatBoxComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModuleModule { }