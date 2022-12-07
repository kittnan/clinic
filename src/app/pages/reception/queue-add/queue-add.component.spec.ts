import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueAddComponent } from './queue-add.component';

describe('QueueAddComponent', () => {
  let component: QueueAddComponent;
  let fixture: ComponentFixture<QueueAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
