import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-huong-dan-mua-ve',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './huong-dan-mua-ve-component.html',
  styleUrls: ['./huong-dan-mua-ve-component.scss'],
})
export class HuongDanMuaVeComponent {
  steps = [
    'Chọn tuyến (điểm đi – điểm đến) và ngày đi',
    'Chọn chuyến phù hợp',
    'Điền thông tin hành khách',
    'Kiểm tra lại thông tin và thanh toán',
    'Nhận xác nhận/mã vé và tra cứu khi cần',
  ];

  notes = [
    'Nên đến điểm đón sớm trước giờ khởi hành.',
    'Kiểm tra chính sách đổi/huỷ trước khi đặt.',
    'Giữ lại thông tin đặt vé để tra cứu nhanh.',
  ];
}
