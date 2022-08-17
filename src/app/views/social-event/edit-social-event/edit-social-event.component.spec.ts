import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSocialEventComponent } from './edit-social-event.component';

describe('EditSocialEventComponent', () => {
  let component: EditSocialEventComponent;
  let fixture: ComponentFixture<EditSocialEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSocialEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSocialEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
