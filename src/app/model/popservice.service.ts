// confirm-dialog.service.ts
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { PopupComponent } from '../popup/popup.component';


@Injectable({
    providedIn: 'root',
})
export class popservice {
    bsModalRef: BsModalRef;

    constructor(private modalService: BsModalService) { }

    showConfirm(title: string, message: string): Observable<boolean> {
        const initialState = {
            title,
            message,
            onClose: new Subject<boolean>(),
        };

        this.bsModalRef = this.modalService.show(PopupComponent, {
            initialState,
        });

        return this.bsModalRef.content.onClose.asObservable();
    }
    showConfirmmsg(title: string, message: string, message1: string): Observable<boolean> {
        const initialState = {
            title,
            message,
            message1,
            onClose: new Subject<boolean>(),
        };

        this.bsModalRef = this.modalService.show(PopupComponent, {
            initialState,
        });

        return this.bsModalRef.content.onClose.asObservable();
    }
}
