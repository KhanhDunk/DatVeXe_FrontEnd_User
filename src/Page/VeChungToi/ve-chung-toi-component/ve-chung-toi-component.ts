import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Stat {
  label: string;
  value: string;
  description: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

type ValueIcon = 'safety' | 'care' | 'green';

interface ValueCard {
  icon: ValueIcon;
  title: string;
  description: string;
}

interface GalleryImage {
  src: string;
  caption: string;
}

@Component({
  selector: 'app-ve-chung-toi',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ve-chung-toi-component.html',
  styleUrls: ['./ve-chung-toi-component.scss']
})
export class VeChungToiComponent {
  stats: Stat[] = [
    { label: 'Hành khách hài lòng', value: '2,5M+', description: 'mỗi năm tin tưởng Dũng Cúc' },
    { label: 'Tuyến đường hoạt động', value: '180+', description: 'kết nối toàn quốc' },
    { label: 'Giờ xuất bến đúng hẹn', value: '98%', description: 'kiểm soát và giám sát realtime' }
  ];

  milestones: Milestone[] = [
    {
      year: '2010',
      title: 'Khởi hành từ sứ mệnh đơn giản',
      description: 'Mang đến trải nghiệm di chuyển an toàn và tử tế cho từng hành khách tuyến Sài Gòn - Đà Lạt.'
    },
    {
      year: '2016',
      title: 'Mở rộng đội xe cao cấp',
      description: 'Đầu tư dòng xe limousine và ứng dụng đặt vé trực tuyến, giúp khách hàng chủ động lịch trình.'
    },
    {
      year: '2022',
      title: 'Chuyển đổi số toàn diện',
      description: 'Hợp tác với các đối tác công nghệ, triển khai trung tâm điều hành thông minh và ví điện tử.'
    }
  ];

  values: ValueCard[] = [
    {
      icon: 'safety',
      title: 'An toàn là ưu tiên',
      description: 'Kiểm tra xe đa lớp, đào tạo tài xế định kỳ và bảo hiểm chuyến đi rõ ràng.'
    },
    {
      icon: 'care',
      title: 'Trải nghiệm tận tâm',
      description: 'Chăm sóc khách hàng 24/7, hỗ trợ linh hoạt và đồng hành trong suốt hành trình.'
    },
    {
      icon: 'green',
      title: 'Bền vững & trách nhiệm',
      description: 'Áp dụng tiêu chuẩn khí thải Euro 5, tối ưu nhiên liệu và đóng góp cho cộng đồng địa phương.'
    }
  ];

  gallery: GalleryImage[] = [
    { src: 'Assets/images/anhxe1.jpg', caption: 'Khoang nội thất hạng thương gia' },
    { src: 'Assets/images/anhxe2.jpg', caption: 'Đội xe giám sát hành trình 24/7' },
    { src: 'Assets/images/anhxe3.jpg', caption: 'Trung chuyển tận nhà tại 25 tỉnh thành' }
  ];
}
