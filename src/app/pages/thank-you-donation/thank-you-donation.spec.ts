import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouDonation } from './thank-you-donation';

describe('ThankYouDonation', () => {
  let component: ThankYouDonation;
  let fixture: ComponentFixture<ThankYouDonation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouDonation],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouDonation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
