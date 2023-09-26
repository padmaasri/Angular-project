import { Component, Input } from '@angular/core';
import { Subject, Subscription, interval } from 'rxjs';
import { OtpTimer } from './otp.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  inputValues: string[] = [];
  Checked: boolean[] = [];
  values: any

  data = new Subject<any>()
  ngOnInit() {
    this.sendOTP()

  }



  constructor(public timer1: OtpTimer) {
    this.values = this.timer1.getvalue()
    console.log(this.values, "val....>>>>>>>>")

    const inputVal = localStorage.getItem('inputs');
    if (inputVal) {
      this.inputValues = JSON.parse(inputVal);
      this.Checked = Array(this.inputValues.length).fill(false);
    }
  }

  addValue() {
    this.timer1.addValue('new value');
  }

  addInput() {
    if (this.newInputValue.trim() !== '') {
      this.inputValues.push(this.newInputValue);
      setTimeout(() => {
        this.data.next('welcome' + this.inputValues)
        this.data.subscribe(val => {
          console.log("welcome subject :", val, "emit")
        })
      }, 1000);
      this.Checked.push(false);
      this.newInputValue = '';
      localStorage.setItem('inputs', JSON.stringify(this.inputValues));
    }
  }

  toggleCheckbox(index: number) {
    if (this.Checked) {
      this.Checked[index]
    }
    else {
      !this.Checked[index];
    }
    localStorage.setItem('inputs', JSON.stringify(this.inputValues));
  }

  remove(index: number) {
    this.inputValues.splice(index, 1);
    this.Checked.splice(index, 1);
    localStorage.setItem('inputs', JSON.stringify(this.inputValues));
  }

  newInputValue: string = '';




  counter: any = sessionStorage.getItem('counter')
  sendOTP() {
    this.counter = (checkNull(this.counter) && Number(this.counter) > 1) ? this.counter : 0.00;
    if (checkNull(this.counter) && Number(this.counter) > 1) {
      this.timer1.startTimer(this.counter)
    }
  }

  resendOTP() {
    this.counter = 60
    this.timer1.startTimer(this.counter)
  }
}

function checkNull(data) {
  return data != null && data != '' && data != undefined
}
