import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueDetailComponent } from './queue-detail.component';

describe('QueueDetailComponent', () => {
  let component: QueueDetailComponent;
  let fixture: ComponentFixture<QueueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
