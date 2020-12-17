import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'ng-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() interval = 10;
  @Input() transition = 1000;
  @Input() controlls = false;
  @Input() itemsPerStep = 1;
  @Input() timingFunction = 'ease-in-out';
  @Input() itemsAmount: number;

  @Output() move = new EventEmitter<number>();

  public offset = 0;

  private width: number;
  public styles: {
    transform: string;
    transition: string;
  };
  private intervalId: any;

  constructor() {}

  ngOnChanges({ interval, itemsPerStep, itemsAmount }: SimpleChanges): void {
    if (interval && interval.currentValue !== interval.previousValue) {
      this.initInterval();
    }
    if (
      (itemsPerStep &&
        itemsAmount &&
        itemsPerStep.currentValue !== itemsPerStep.previousValue) ||
      itemsAmount.currentValue !== itemsAmount.previousValue
    ) {
      this.setWidth();
    }
  }

  ngOnInit(): void {
    this.styles = {
      transform: null,
      transition: null,
    };
    this.setWidth();
    this.updateStyles();
  }

  private setWidth(): void {
    this.offset = 0;
    this.width = (100 / this.itemsAmount) * this.itemsPerStep;
    this.updateStyles();
    this.initInterval();
  }

  private initInterval(): void {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.offset = (this.offset + this.width) % 100;
      this.updateStyles();
    }, this.interval);
  }

  public next(): void {
    this.initInterval();
    this.offset = (this.offset + this.width) % 100;
    this.updateStyles();
  }

  public prev(): void {
    this.initInterval();
    this.offset = (this.offset >= this.width ? this.offset : 100) - this.width;
    this.updateStyles();
  }

  private updateStyles(): void {
    this.styles.transform = this.getTranslateX();
    this.styles.transition = `${this.transition}ms ${this.timingFunction}`;
  }

  private getTranslateX(): any {
    this.move.emit(this.offset / this.width);
    return `translateX(${-this.offset}%)`;
  }
}
