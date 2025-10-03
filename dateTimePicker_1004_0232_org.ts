// 代码生成时间: 2025-10-04 02:32:19
import { Component, OnInit } from '@angular/core';

// 引入日期时间选择器组件
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {
  // 日期时间选择器的FormControl
  dateControl = new FormControl<Date | null>(null);

  constructor() { }

  ngOnInit(): void {
    // 初始化FormControl
    this.dateControl.setValue(new Date());
  }

  // 处理日期时间选择事件
  handleDateChange(event: MatDatepickerInputEvent<Date>): void {
    console.log('Selected date:', event.value);
    // 可以在这里添加错误处理逻辑，例如日期格式不正确等
  }

  // 清除选择的日期
  clearDate(): void {
    this.dateControl.setValue(null);
  }
}


/* 以下是HTML模板示例，用于显示日期时间选择器和清除按钮 */

/* <mat-form-field appearance="fill">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" [formControl]="dateControl" (dateChange)="handleDateChange($event)" placeholder="Select date">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>

<button (click)="clearDate">Clear Date</button> */