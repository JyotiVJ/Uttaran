import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSocialEventComponent } from './details-social-event.component';

describe('DetailsSocialEventComponent', () => {
  let component: DetailsSocialEventComponent;
  let fixture: ComponentFixture<DetailsSocialEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSocialEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSocialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
