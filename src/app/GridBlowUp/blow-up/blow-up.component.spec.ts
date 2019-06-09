import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlowUpComponent } from './blow-up.component';
import { Router, UrlSerializer, ChildrenOutletContexts,
  UrlHandlingStrategy, ROUTER_CONFIGURATION, ROUTES } from '@angular/router';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule, setupTestingRouter } from '@angular/router/testing';
import { NgModuleFactoryLoader, Compiler, Injector, Optional } from '@angular/core';

describe('BlowUpComponent', () => {
  let component: BlowUpComponent;
  let fixture: ComponentFixture<BlowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlowUpComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: Router,
          useFactory: setupTestingRouter,
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
    fixture = TestBed.createComponent(BlowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
