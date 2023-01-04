import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHistoryDetailComponent } from './share-history-detail.component';

describe('ShareHistoryDetailComponent', () => {
  let component: ShareHistoryDetailComponent;
  let fixture: ComponentFixture<ShareHistoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareHistoryDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
