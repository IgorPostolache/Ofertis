import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisToDate'
})
export class MillisToDatePipe implements PipeTransform {

  transform(date: string, ...args: unknown[]): unknown {
    return new Date(parseInt(date, 10)).toLocaleDateString() + " " + new Date(parseInt(date, 10)).toLocaleTimeString();
  }

}
