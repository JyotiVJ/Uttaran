import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPodcastComponent } from './details-podcast.component';

describe('DetailsPodcastComponent', () => {
  let component: DetailsPodcastComponent;
  let fixture: ComponentFixture<DetailsPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPodcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
