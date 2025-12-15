import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lien-he-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './lien-he-component.html',
  styleUrl: './lien-he-component.scss',
})
export class LienHeComponent {
 contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    alert('Cảm ơn bạn! Chúng tôi đã nhận được phản hồi.');
    // Reset form
    this.contactForm = { name: '', email: '', phone: '', message: '' };
  }
}
