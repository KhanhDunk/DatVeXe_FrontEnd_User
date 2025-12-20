import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chinh-sach-doi-tra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chinh-sach-doi-tra-component.html',
  styleUrls: ['./chinh-sach-doi-tra-component.scss'],
})
export class ChinhSachDoiTraComponent {
  points = [
    'Yêu cầu đổi/huỷ phụ thuộc loại vé và thời điểm trước giờ khởi hành.',
    'Một số vé có thể phát sinh phí theo quy định của nhà xe/đối tác thanh toán.',
    'Vui lòng cung cấp mã vé/Thông tin đặt vé để được kiểm tra nhanh.',
    'Thời gian hoàn tiền (nếu có) phụ thuộc phương thức thanh toán.',
  ];
}
