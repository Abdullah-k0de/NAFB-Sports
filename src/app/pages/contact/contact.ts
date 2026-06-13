import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { NgHcaptchaModule } from 'ng-hcaptcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NgHcaptchaModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  web3FormsKey = environment.web3FormsKey;
  redirectUrl = window.location.origin + '/thank-you-contact';

  faqs = [
    {
      question: 'How can I volunteer for an event?',
      answer: 'We are always looking for passionate volunteers! You can fill out the contact form indicating your interest, and our volunteer coordinator will reach out with upcoming opportunities.',
      isOpen: false
    },
    {
      question: 'Where are your events located?',
      answer: 'Our main events take place in Denton, Texas. However, we occasionally host regional events across the state. Check our Events page for the latest schedule and locations.',
      isOpen: false
    },
    {
      question: 'Who can participate in NAFB Sports?',
      answer: 'Our programs are completely inclusive! We welcome individuals of all ages and fitness levels. There is no competition or pressure—just a focus on personal health and joy.',
      isOpen: false
    },
    {
      question: 'How do I become a sponsor?',
      answer: 'Sponsorships are vital to our mission. Please use the contact form to request our sponsorship package, and we will get back to you with details on how we can partner.',
      isOpen: false
    }
  ];

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
