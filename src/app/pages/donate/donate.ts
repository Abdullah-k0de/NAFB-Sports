import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donate.html',
  styleUrl: './donate.css',
})
export class DonateComponent {
  donationType: 'one-time' | 'monthly' = 'one-time';
  presetAmounts = [250, 100, 50, 25, 10];
  selectedAmount: number | null = 25;

  stripeLinks = {
    oneTime: {
      10: 'https://donate.stripe.com/test_5kQ28sd6vb9GeFecC704806',
      25: 'https://donate.stripe.com/test_dRm28s4zZ7Xu8gQ7hN04807',
      50: 'https://donate.stripe.com/test_4gM4gA1nN0v28gQgSn04808',
      100: 'https://donate.stripe.com/test_5kQ5kEeaz91yeFe8lR04809',
      250: 'https://donate.stripe.com/test_7sYaEY1nN91y8gQ8lR0480a',
      custom: 'https://donate.stripe.com/test_dRmeVe8QfcdKdBafOj04800'
    },
    monthly: {
      10: 'https://buy.stripe.com/test_aFa00k5E3fpW54EcC704801',
      25: 'https://donate.stripe.com/test_eVq4gA3vVgu068I6dJ04802',
      50: 'https://donate.stripe.com/test_eVq8wQ3vVdhOeFe8lR04803',
      100: 'https://donate.stripe.com/test_bJebJ24zZ6TqdBaatZ04804',
      250: 'https://donate.stripe.com/test_3cIcN6giHelSaoY9pV04805'
    }
  };

  faqs = [
    {
      question: 'Is my donation secure?',
      answer: 'Yes! All donations are securely processed through Stripe. We do not store or ever see your credit card information.',
      isOpen: false
    },
    {
      question: 'Where do my funds go?',
      answer: 'Your contributions directly support securing facilities, purchasing inclusive equipment, and providing free access to health and fitness programs for individuals of all ages and abilities.',
      isOpen: false
    },
    {
      question: 'Are my donations tax-deductible?',
      answer: 'NAFB Sports is a registered non-profit organization.',
      isOpen: false
    }
  ];

  selectPreset(amount: number | 'custom') {
    if (amount === 'custom') {
      window.location.href = this.stripeLinks.oneTime.custom;
    } else {
      this.selectedAmount = amount as number;
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  handleDonate() {
    const amount = this.selectedAmount || 25;

    if (this.donationType === 'one-time') {
      // @ts-ignore
      const oneTimeLink = this.stripeLinks.oneTime[amount];
      if (oneTimeLink && oneTimeLink.includes('stripe.com')) {
        window.location.href = oneTimeLink;
      } else {
        // Fallback to custom/generic if specific one-time isn't configured
        // @ts-ignore
        if (this.stripeLinks.oneTime.custom) {
          // @ts-ignore
          window.location.href = this.stripeLinks.oneTime.custom;
        } else {
          alert('Stripe One-Time Link for $' + amount + ' is not yet configured.');
        }
      }
    } else {
      // @ts-ignore
      const monthlyLink = this.stripeLinks.monthly[amount];
      if (monthlyLink && monthlyLink.includes('stripe.com')) {
        window.location.href = monthlyLink;
      } else {
        alert('Stripe Monthly Link for $' + amount + ' is not yet configured.');
      }
    }
  }

}
