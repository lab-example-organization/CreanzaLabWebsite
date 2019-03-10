import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { BlowUpComponent } from '../blow-up/blow-up.component';
import { Router, UrlSerializer, ChildrenOutletContexts, UrlHandlingStrategy,
         ROUTER_CONFIGURATION, ROUTES } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModuleFactoryLoader, Compiler, Injector, Optional } from '@angular/core';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GridComponent,
        BlowUpComponent,
      ],
      imports: [
        RouterTestingModule,
       ],
      providers: [
        {
          provide: Router,
          deps: [
            UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
            ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
          ]
        },
        { provide: Location, useClass: SpyLocation }
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
