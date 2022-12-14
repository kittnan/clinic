import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQueueComponent } from './table-queue.component';

describe('TableQueueComponent', () => {
  let component: TableQueueComponent;
  let fixture: ComponentFixture<TableQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
