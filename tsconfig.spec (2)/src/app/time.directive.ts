
import {
    Directive,
    ElementRef,
    forwardRef,
    Host,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    Self,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    Validator,
} from '@angular/forms';

@Directive({
    selector: '[appTimeMask]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeDirective),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TimeDirective),
            multi: true,
        },
    ],
})
export class TimeDirective {

    /** implements ControlValueAccessorInterface */
    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInput(event: InputEvent) {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');

        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        if (value.length > 2) {
            value = `${value.slice(0, 2)}:${value.slice(2)}`;
        }

        input.value = value;
    }
}