import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePodcastCategoriesComponent } from './create-podcast-categories.component';

describe('CreatePodcastCategoriesComponent', () => {
  let component: CreatePodcastCategoriesComponent;
  let fixture: ComponentFixture<CreatePodcastCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePodcastCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePodcastCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
