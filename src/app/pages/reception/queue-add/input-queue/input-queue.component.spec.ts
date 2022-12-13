import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputQueueComponent } from './input-queue.component';

describe('InputQueueComponent', () => {
  let component: InputQueueComponent;
  let fixture: ComponentFixture<InputQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
