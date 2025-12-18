import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

type ChannelIcon = 'phone' | 'mail' | 'map';

interface SupportChannel {
  icon: ChannelIcon;
  title: string;
  value: string;
  note: string;
}

interface HeroStat {
  label: string;
  value: string;
}

interface OfficeHour {
  day: string;
  time: string;
}

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
  loading = false;
  feedbackMessage = '';

  supportChannels: SupportChannel[] = [
    {
      icon: 'phone',
      title: 'Hotline 24/7',
      value: '1900 6789',
      note: 'Hỗ trợ đặt vé & giải đáp mọi thắc mắc'
    },
    {
      icon: 'mail',
      title: 'Email CSKH',
      value: 'support@cucdung.com',
      note: 'Trả lời trong vòng 4 giờ làm việc'
    },
    {
      icon: 'map',
      title: 'Văn phòng chính',
      value: '123 Lê Lợi, Q.1, TP.HCM',
      note: 'Mở cửa mỗi ngày từ 06:00 - 22:00'
    }
  ];

  heroStats: HeroStat[] = [
    { label: 'Điểm đón trả', value: '120+' },
    { label: 'Tư vấn/giờ', value: '450+' },
    { label: 'Đội hỗ trợ', value: '60 người' }
  ];

  officeHours: OfficeHour[] = [
    { day: 'Thứ 2 - Thứ 6', time: '06:00 - 22:00' },
    { day: 'Thứ 7 - Chủ nhật', time: '07:00 - 21:00' }
  ];

  onSubmit(form: NgForm) {
    if (form.invalid || this.loading) {
      return;
    }

    this.loading = true;
    this.feedbackMessage = '';

    setTimeout(() => {
      this.loading = false;
      this.feedbackMessage = 'Cảm ơn bạn! Chúng tôi đã ghi nhận phản hồi và sẽ liên hệ trong thời gian sớm nhất.';
      form.resetForm();
    }, 800);
  }
}
