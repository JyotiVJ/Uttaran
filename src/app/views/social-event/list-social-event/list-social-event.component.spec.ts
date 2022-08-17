import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSocialEventComponent } from './list-social-event.component';

describe('ListSocialEventComponent', () => {
  let component: ListSocialEventComponent;
  let fixture: ComponentFixture<ListSocialEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSocialEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSocialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
