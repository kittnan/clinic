import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckupComponent } from './dialog-checkup.component';

describe('DialogCheckupComponent', () => {
  let component: DialogCheckupComponent;
  let fixture: ComponentFixture<DialogCheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCheckupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
