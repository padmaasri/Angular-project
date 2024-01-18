import { Component, ElementRef, HostListener, Input, Optional, Pipe, PipeTransform, Self, ViewChild, computed, forwardRef, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TimepickerComponent } from 'ngx-bootstrap/timepicker';
import Inputmask from 'inputmask';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatFormFieldAppearance } from '@angular/material/form-field';


@Component({
  selector: 'app-custom-validate',
  templateUrl: './custom-validate.component.html',
  styleUrls: ['./custom-validate.component.css'],

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomValidateComponent),
    multi: true,
  },]
})

export class CustomValidateComponent implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }
  errorMessages: any;
  //  CDK Drop & Drop
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  progressList = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



  startDate = new Date(1990, 0, 1);
  @ViewChild('picker') picker: MatDatepicker<Date>;
  @ViewChild('myInput') myInputElementRef: ElementRef;
  @ViewChild('mytime') mytimeElementRef: ElementRef
  @ViewChild('pickertime1') pickertime1: TimepickerComponent;
  @Input() public label: String;
  @Input() public type: string
  @Input() public required = false;
  @Input() public placeholder: string;
  @Input() appearance: MatFormFieldAppearance = 'outline' as MatFormFieldAppearance;
  @Input() control: AbstractControl | null = null;
  @Input() public minlength = 0;
  @Input() public maxlength = 0;
  @Input() public error_message: any
  @Input() public pattern: any
  @Input('textMask') textMask: any;
  @Input() Timecontrol: AbstractControl | null = null
  pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobilepattern = /^\d{10}$/;
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  get formControl(): FormControl {
    return this.control as FormControl;
  }




  ngAfterViewInit(): void {
    Inputmask('datetime', {
      inputFormat: 'dd/mm/yyyy',
      alias: 'datetime',
      clearMaskOnLostFocus: false,
      isComplete: function (buffer, opts) {
        console.log('Data', buffer, opts);
      }
    }).mask(this.myInputElementRef.nativeElement);
  }

}
