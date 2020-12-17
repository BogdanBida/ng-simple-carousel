import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ng-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() interval = 10;
  @Input() transition = 1000;
  @Input() controlls = false;
  @Input() itemsPerStep = 1;
  @Input() timingFunction = 'ease-in-out';
  @Input() itemsAmount: number;
  @Input() prevBtn: TemplateRef<any>;
  @Input() nextBtn: TemplateRef<any>;

  @Output() move = new EventEmitter<number>();

  public offset: number;

  private width: number;
  public styles: {
    transform: string;
    transition: string;
  };
  private intervalId: any;

  constructor() {
    this.offset = 0;
    this.itemsPerStep = 1;
  }

  ngOnInit(): void {
    this.styles = {
      transform: null,
      transition: `${this.transition}ms ${this.timingFunction}`,
    };
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
  }

  private getTranslateX(): any {
    this.move.emit(this.offset / this.width);
    return `translateX(${-this.offset}%)`;
  }
}
