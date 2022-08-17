import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPodcastCategoriesComponent } from './details-podcast-categories.component';

describe('DetailsPodcastCategoriesComponent', () => {
  let component: DetailsPodcastCategoriesComponent;
  let fixture: ComponentFixture<DetailsPodcastCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPodcastCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPodcastCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
