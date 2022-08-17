import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationShowComponent } from './motivation-show.component';

describe('MotivationShowComponent', () => {
  let component: MotivationShowComponent;
  let fixture: ComponentFixture<MotivationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivationShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
