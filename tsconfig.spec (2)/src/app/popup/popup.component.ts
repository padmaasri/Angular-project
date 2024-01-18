import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  title: string = 'Confirm';
  message: string = 'Are you sure?';
  message1: string = 'You Want check';

  constructor(public bsModalRef: BsModalRef) { }

  confirm(result: boolean): void {
    this.bsModalRef.hide();
    this.bsModalRef.content.onClose.next(result);
  }
}
