import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpTopBarComponent } from './cp-top-bar.component';

describe('CpTopBarComponent', () => {
  let component: CpTopBarComponent;
  let fixture: ComponentFixture<CpTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
