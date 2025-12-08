import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tin-tuc-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tin-tuc-component.html',
  styleUrls: ['./tin-tuc-component.scss'],
})
export class TinTucComponent {
  featured = {
    title: 'Triển khai hệ thống xe giường nằm Luxury 2025',
    summary:
      'Dòng xe giường nằm cao cấp thế hệ mới, trang bị massage, wifi tốc độ cao, ổ điện từng ghế.',
    image: 'https://picsum.photos/900/500?random=10'
  };

  newsList = [
    {
      title: 'Khai trương tuyến mới Sài Gòn - Đà Lạt',
      summary: 'Giảm 20% cho khách hàng đặt vé online trong tuần đầu tiên.',
      date: '06/12/2025',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      title: 'Nâng cấp 120 xe giường nằm lên bản 2025',
      summary: 'Thêm hệ thống giảm xóc và chống rung cao cấp.',
      date: '30/11/2025',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      title: 'Ứng dụng đặt vé đạt 2 triệu người dùng',
      summary: 'Cảm ơn sự đồng hành của khách hàng suốt thời gian qua.',
      date: '22/11/2025',
      image: 'httpsum.photos/400/300?random=3'
    }
  ];
}
