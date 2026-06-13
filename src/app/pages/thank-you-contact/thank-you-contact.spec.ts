import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouContact } from './thank-you-contact';

describe('ThankYouContact', () => {
  let component: ThankYouContact;
  let fixture: ComponentFixture<ThankYouContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThankYouContact],
    }).compileComponents();

    fixture = TestBed.createComponent(ThankYouContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
