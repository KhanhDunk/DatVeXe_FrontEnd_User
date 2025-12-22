import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PromotionItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  validRange: string;
  image: string;
}

@Component({
  selector: 'app-khuyen-mai',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './khuyen-mai-component.html',
  styleUrls: ['./khuyen-mai-component.scss'],
})
export class KhuyenMaiComponent {
  promotions: PromotionItem[] = [
    {
      id: 'km-01',
      title: 'Giảm 10% vé khứ hồi',
      description: 'Áp dụng cho các tuyến cố định, số lượng có hạn. Không áp dụng đồng thời với ưu đãi khác.',
      badge: 'Hot',
      validRange: '01/01/2026 – 31/01/2026',
      image: '/Assets/images/anhxe1.jpg',
    },
    {
      id: 'km-02',
      title: 'Ưu đãi nhóm 4 người',
      description: 'Đi cùng bạn bè/người thân: giảm trực tiếp trên tổng giá vé khi đặt cùng một mã đặt chỗ.',
      badge: 'Nhóm',
      validRange: '15/01/2026 – 15/02/2026',
      image: '/Assets/images/anhxe2.jpg',
    },
    {
      id: 'km-03',
      title: 'Tặng suất nước miễn phí',
      description: 'Mỗi hành khách được tặng 01 suất nước. Áp dụng cho chuyến sáng sớm và đêm.',
      badge: 'Quà tặng',
      validRange: 'Luôn áp dụng',
      image: '/Assets/images/anhxe3.jpg',
    },
    {
      id: 'km-04',
      title: 'Giảm 5% khi đặt sớm',
      description: 'Đặt trước 7 ngày so với ngày khởi hành để nhận ưu đãi. Điều kiện thay đổi theo từng tuyến.',
      badge: 'Đặt sớm',
      validRange: '01/02/2026 – 29/02/2026',
      image: '/Assets/images/anhxe1.jpg',
    },
    {
      id: 'km-05',
      title: 'Ưu đãi khách hàng thân thiết',
      description: 'Tích điểm sau mỗi chuyến đi. Đổi điểm để giảm giá cho lần đặt tiếp theo (dữ liệu giả).',
      badge: 'Member',
      validRange: 'Luôn áp dụng',
      image: '/Assets/images/anhxe2.jpg',
    },
    {
      id: 'km-06',
      title: 'Combo vé + hành lý',
      description: 'Hỗ trợ thêm hành lý ký gửi theo gói combo. Chi tiết sẽ được hiển thị khi đặt vé (demo).',
      badge: 'Combo',
      validRange: '10/02/2026 – 10/03/2026',
      image: '/Assets/images/anhxe3.jpg',
    },
  ];
}
