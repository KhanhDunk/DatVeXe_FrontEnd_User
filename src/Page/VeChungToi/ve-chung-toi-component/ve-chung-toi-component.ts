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
    { label: 'Tuyến cố định', value: 'TP.HCM', description: 'kết nối các bến xe theo tuyến' },
    { label: 'Dòng xe', value: 'Cao cấp', description: 'xe chất lượng cao – limousine' },
    { label: 'Cam kết', value: 'Đúng giờ', description: 'đúng tuyến – đúng điểm' }
  ];

  milestones: Milestone[] = [
    {
      year: '🚍',
      title: 'Vận chuyển hành khách tuyến cố định',
      description: 'TP.HCM → Bến Xe Hà Nội · TP.HCM → Bến Xe Cà Mau · TP.HCM → Bến Xe Trà Vinh · TP.HCM → Bến Xe Vũng Tàu'
    },
    {
      year: '🚐',
      title: 'Xe chất lượng cao – xe limousine',
      description: 'Xe đời mới, sạch sẽ, bảo dưỡng định kỳ để hành trình êm ái và an tâm.'
    },
    {
      year: '🧳',
      title: 'Nhận hợp đồng xe gia đình, du lịch, tham quan',
      description: 'Linh hoạt theo nhu cầu, ưu tiên an toàn và trải nghiệm khách hàng.'
    },
    {
      year: '📍',
      title: 'Lịch trình rõ ràng – đúng tuyến – đúng giờ',
      description: 'Minh bạch thông tin, đón trả đúng điểm và luôn lắng nghe để cải thiện mỗi ngày.'
    }
  ];

  values: ValueCard[] = [
    {
      icon: 'safety',
      title: 'Xe xịn – sạch sẽ – bảo dưỡng định kỳ',
      description: 'Chú trọng chất lượng xe và an toàn vận hành trên mọi cung đường.'
    },
    {
      icon: 'care',
      title: 'Tài xế kinh nghiệm, phục vụ tận tâm',
      description: 'Phục vụ lịch sự, hỗ trợ hành khách chu đáo trong suốt hành trình.'
    },
    {
      icon: 'green',
      title: 'Giá vé minh bạch – không phát sinh',
      description: 'Thông tin rõ ràng, đúng điểm – đúng giờ và luôn cải thiện chất lượng dịch vụ.'
    }
  ];

  gallery: GalleryImage[] = [
    { src: 'Assets/images/anhxe1.jpg', caption: 'Khoang xe sạch sẽ, thoải mái' },
    { src: 'Assets/images/anhxe2.jpg', caption: 'Xe đời mới – vận hành ổn định' },
    { src: 'Assets/images/anhxe3.jpg', caption: 'Phục vụ đúng tuyến – đúng giờ' }
  ];
}
