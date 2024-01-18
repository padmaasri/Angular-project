import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({ name: 'toLowerCase' })
export class custompipe implements PipeTransform {
    transform(value: string): string {
        return value.toLowerCase();
    }

}