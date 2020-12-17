import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-simple-carousel';

  public readonly timingFunctions = [
    'ease',
    'ease-out',
    'ease-in',
    'ease-in-out',
    'linear',
    'step-start',
    'step-end',
  ];

  public interval = 2500;
  public transition = 1000;
  public controlls = true;
  public rightDirection = true;
  public elementsAmount = 8;
  public timingFunction = this.timingFunctions[3];
  public slide: number;

  public move(i: number): void {
    this.slide = i;
  }

  public get elements(): number[] {
    return new Array(this.elementsAmount).fill(0).map((v, i) => i + 1);
  }
}
