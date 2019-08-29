import { Component, OnInit, HostListener,
  ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GridBlowUpService } from '../grid-blow-up.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-blow-up',
  templateUrl: './blow-up.component.html',
  styleUrls: ['./blow-up.component.css']
})

export class BlowUpComponent implements OnInit, OnDestroy {
  index: number;
  array: any[];

  @ViewChild('left') left: ElementRef;
  @ViewChild('right') right: ElementRef;
  @ViewChild('bigger') bigger: ElementRef;
  textHeight: number;
  subscribe1: Subscription;
  subscribe2: Subscription;

  constructor(private router: Router,
              private location: Location,
              private gridBlowUpService: GridBlowUpService) { }

  ngOnInit() {
    this.subscribe1 = this.gridBlowUpService.index.subscribe(temp => this.index = temp);
    this.subscribe2 = this.gridBlowUpService.figureArray.subscribe(temp => this.array = temp);
    setTimeout(() => { this.onResize(); } , 10);
  }

  ngOnDestroy(){
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
  }

  onResize() {
    this.textHeight = this.bigger.nativeElement.offsetHeight - 60;
    if (this.textHeight < 400) {
      this.textHeight = 400;
    }
  }

  onArrow(incre: number) {
    this.index += incre;
    if (this.index === -1) {
      this.index = this.array.length - 1;
    } else if (this.index === this.array.length) {
      this.index = 0;
   }
}

  // Arrow keys (trigger arrow options)
  @HostListener('window:keyup', ['$event']) KeyEvent(event: KeyboardEvent) {
    if (event.keyCode === 39) { // right, next
      this.right.nativeElement.focus();
      this.onArrow(1);
    }

    if (event.keyCode === 37) { // left, prev
      this.left.nativeElement.focus();
      this.onArrow(-1);
    }

    if (event.keyCode === 27) { // escape
      this.onClickOut();
    }
  }
  onClickOut() {
    this.gridBlowUpService.visible.next(false);
  }
}
