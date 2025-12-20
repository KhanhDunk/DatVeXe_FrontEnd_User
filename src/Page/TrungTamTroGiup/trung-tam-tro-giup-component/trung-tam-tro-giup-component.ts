import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trung-tam-tro-giup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trung-tam-tro-giup-component.html',
  styleUrls: ['./trung-tam-tro-giup-component.scss'],
})
export class TrungTamTroGiupComponent {
  faqs = [
    {
      q: 'Làm sao để đặt vé nhanh nhất?',
      a: 'Bạn có thể đặt vé trực tuyến trên website hoặc liên hệ bộ phận hỗ trợ để được hướng dẫn.',
    },
    {
      q: 'Tôi có thể đổi thông tin hành khách không?',
      a: 'Có. Tuỳ theo điều kiện vé và thời điểm trước giờ khởi hành, bộ phận hỗ trợ sẽ kiểm tra và hỗ trợ cập nhật.',
    },
    {
      q: 'Tôi cần chuẩn bị gì khi lên xe?',
      a: 'Bạn nên có mã vé/QR (nếu có), đến điểm đón sớm và mang theo giấy tờ tuỳ thân khi cần đối chiếu.',
    },
  ];
}
