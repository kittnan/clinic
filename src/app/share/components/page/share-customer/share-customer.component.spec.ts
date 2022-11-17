import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCustomerComponent } from './share-customer.component';

describe('ShareCustomerComponent', () => {
  let component: ShareCustomerComponent;
  let fixture: ComponentFixture<ShareCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
