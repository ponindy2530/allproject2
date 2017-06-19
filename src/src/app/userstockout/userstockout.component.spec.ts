import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstockoutComponent } from './userstockout.component';

describe('UserstockoutComponent', () => {
  let component: UserstockoutComponent;
  let fixture: ComponentFixture<UserstockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstockoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
