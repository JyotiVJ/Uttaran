import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPodcastCategoriesComponent } from './edit-podcast-categories.component';

describe('EditPodcastCategoriesComponent', () => {
  let component: EditPodcastCategoriesComponent;
  let fixture: ComponentFixture<EditPodcastCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPodcastCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPodcastCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
