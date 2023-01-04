import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCustomerDetailComponent } from './share-customer-detail.component';

describe('ShareCustomerDetailComponent', () => {
  let component: ShareCustomerDetailComponent;
  let fixture: ComponentFixture<ShareCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCustomerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
