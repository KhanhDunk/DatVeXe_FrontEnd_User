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
      title: 'Hotline',
      value: '0931172385',
      note: 'Hỗ trợ đặt vé & lịch trình'
    },
    {
      icon: 'mail',
      title: 'Email CSKH',
      value: 'Đang cập nhật',
      note: 'Tiếp nhận phản hồi và hỗ trợ'
    },
    {
      icon: 'map',
      title: 'Văn phòng chính',
      value: 'Số 22/2A Ấp 18, Xã Hóc Môn, Thành phố Hồ Chí Minh, Việt Nam',
      note: 'Nhà xe DŨNG CÚC AUTO'
    }
  ];

  heroStats: HeroStat[] = [
    { label: 'Tuyến cố định', value: 'TP.HCM' },
    { label: 'Dòng xe', value: 'Cao cấp' },
    { label: 'Cam kết', value: 'Đúng giờ' }
  ];

  officeHours: OfficeHour[] = [
    { day: 'Khung giờ hỗ trợ', time: 'Đang cập nhật' },
    { day: 'Ngoài giờ', time: 'Vui lòng để lại tin nhắn' }
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
