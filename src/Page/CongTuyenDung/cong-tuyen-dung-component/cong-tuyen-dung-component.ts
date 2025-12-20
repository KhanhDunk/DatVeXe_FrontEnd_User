import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cong-tuyen-dung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cong-tuyen-dung-component.html',
  styleUrls: ['./cong-tuyen-dung-component.scss'],
})
export class CongTuyenDungComponent {
  openings = [
    { title: 'Tài xế', desc: 'Lái xe tuyến cố định/xe hợp đồng (tuỳ nhu cầu).' },
    { title: 'Phụ xe', desc: 'Hỗ trợ khách hàng, sắp xếp hành lý, hỗ trợ vận hành.' },
    { title: 'Nhân viên CSKH', desc: 'Hỗ trợ đặt vé, đổi/huỷ, giải đáp thắc mắc.' },
  ];
}
