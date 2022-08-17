import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPodcastCategoriesComponent } from './list-podcast-categories.component';

describe('ListPodcastCategoriesComponent', () => {
  let component: ListPodcastCategoriesComponent;
  let fixture: ComponentFixture<ListPodcastCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPodcastCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPodcastCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
