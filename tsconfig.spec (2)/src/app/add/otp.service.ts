
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class OtpTimer {
    private replaysub = new ReplaySubject<string>(2)
    addValue(value: string) {
        this.replaysub.next(value)
    }
    getvalue() {
        return this.replaysub.asObservable()
    }

    private timer!: BehaviorSubject<any>
    timer$: Observable<any>

    constructor() {
        const sec = sessionStorage.getItem('counter')
        console.log(sec, 'this is the sec');

        let value = String(sec).length == 1 ? `00.0${sec != null ? sec : '00'}` : `00.${sec != null ? sec : '00'}`
        this.timer = new BehaviorSubject(value)
        this.timer$ = this.timer.asObservable()
    }



    startTimer(counter: any) {
        let sec = counter > 0 ? counter : 60;
        setInterval(() => {
            if (sec != 0) {
                sec = sec - 1
                sessionStorage.setItem('counter', sec)
                let value = String(sec).length == 1 ? `00.0${sec}` : `00.${sec}`
                this.timer.next(value)
            }
        }, 1000)
    }


    endTimer() {
        this.timer.next('00.00')
    }

}

