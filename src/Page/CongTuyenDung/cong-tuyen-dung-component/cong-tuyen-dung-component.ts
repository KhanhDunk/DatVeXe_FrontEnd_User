import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: 'Toàn thời gian' | 'Bán thời gian' | 'Theo ca';
  level: 'Mới' | 'Có kinh nghiệm';
  salary: string;
  deadline: string;
  summary: string;
  requirements: string[];
  benefits: string[];
}

@Component({
  selector: 'app-cong-tuyen-dung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cong-tuyen-dung-component.html',
  styleUrls: ['./cong-tuyen-dung-component.scss'],
})
export class CongTuyenDungComponent {
  openings: JobOpening[] = [
    {
      id: 'driver',
      title: 'Tài xế xe khách (tuyến cố định)',
      location: 'TP. Hồ Chí Minh',
      type: 'Theo ca',
      level: 'Có kinh nghiệm',
      salary: 'Thoả thuận (theo ca/chuyến)',
      deadline: '31/01/2026',
      summary: 'Lái xe đúng tuyến, đúng giờ; đảm bảo an toàn và trải nghiệm hành khách trong suốt hành trình.',
      requirements: [
        'Bằng lái phù hợp, hồ sơ đầy đủ, sức khoẻ tốt',
        'Thành thạo đường tuyến, tác phong lịch sự',
        'Ưu tiên có kinh nghiệm chạy tuyến đường dài',
      ],
      benefits: [
        'Thu nhập ổn định theo ca/chuyến',
        'Hỗ trợ ăn/ở theo chính sách tuyến',
        'Môi trường làm việc rõ ràng, minh bạch',
      ],
    },
    {
      id: 'assistant',
      title: 'Phụ xe / Điều phối lên xuống khách',
      location: 'Bến xe / Văn phòng',
      type: 'Theo ca',
      level: 'Mới',
      salary: '6 – 9 triệu',
      deadline: '15/02/2026',
      summary: 'Hỗ trợ khách hàng, sắp xếp hành lý, phối hợp tài xế và điều phối để chuyến đi diễn ra trơn tru.',
      requirements: [
        'Nhanh nhẹn, chịu khó, giao tiếp tốt',
        'Có thể làm theo ca, linh hoạt thời gian',
        'Tinh thần hỗ trợ, thái độ phục vụ tốt',
      ],
      benefits: [
        'Phụ cấp theo ca, thưởng theo hiệu suất',
        'Được đào tạo quy trình vận hành',
        'Cơ hội lên điều phối/giám sát',
      ],
    },
    {
      id: 'cskh',
      title: 'Nhân viên CSKH / Tổng đài đặt vé',
      location: 'TP. Hồ Chí Minh',
      type: 'Toàn thời gian',
      level: 'Có kinh nghiệm',
      salary: '8 – 12 triệu',
      deadline: '28/02/2026',
      summary: 'Tiếp nhận yêu cầu đặt vé/đổi vé, hỗ trợ tra cứu và giải đáp thắc mắc của khách hàng.',
      requirements: [
        'Kỹ năng giao tiếp, xử lý tình huống tốt',
        'Thành thạo thao tác máy tính cơ bản',
        'Ưu tiên có kinh nghiệm CSKH/tổng đài',
      ],
      benefits: [
        'Lương + thưởng KPI',
        'Lộ trình phát triển rõ ràng',
        'Chế độ nghỉ phép theo quy định',
      ],
    },
  ];
}
