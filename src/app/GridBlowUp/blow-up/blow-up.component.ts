import { Component, OnInit, HostListener,
  ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GridBlowUpService } from '../grid-blow-up.service';


@Component({
  selector: 'app-blow-up',
  templateUrl: './blow-up.component.html',
  styleUrls: ['./blow-up.component.css']
})

export class BlowUpComponent implements OnInit {
  index: number;
  array: any[];

  @ViewChild('left') left: ElementRef;
  @ViewChild('right') right: ElementRef;
  @ViewChild('bigger') bigger: ElementRef;
  textHeight: number;

  constructor(private router: Router,
              private location: Location,
              private GridBlowUpService: GridBlowUpService) { }

  ngOnInit() {
    this.GridBlowUpService.index.subscribe(temp => this.index = temp);
    this.GridBlowUpService.figureArray.subscribe(temp => this.array = temp);
    setTimeout(() => { this.onResize(); } , 10);
  }

  onResize() {
    this.textHeight = this.bigger.nativeElement.offsetHeight - 60;
    if(this.textHeight < 400) {
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
    this.GridBlowUpService.visible.next(false);
  }
}
