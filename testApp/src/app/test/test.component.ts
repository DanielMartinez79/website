import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  value: string;
  temp: string;
  arr: string[];

  constructor() {
  }

  ngOnInit() {
    this.arr = new Array();
  }

  add(value:string): void {
    this.arr.push(value);
    console.log(this.arr)
  }


}
