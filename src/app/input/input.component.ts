import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

type ValueType = string | Date

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent<T> implements OnChanges{
  @Input()
  type: 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' = 'text';
  @Input()
  label: string = '';
  @Input()
  value: T | undefined;
  @Output()
  valueChange = new EventEmitter<T>();

  emitValue(){
    console.log('emitting: ' + this.value);
    this.valueChange.emit(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('change: ' + this.value);
  }

  updateDate($event: MatDatepickerInputEvent<T, unknown | null>) {
    let newDate = $event.value;
    if (newDate){
      this.value = newDate;
      this.emitValue();
    }

  }
}
