import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-dat-ve-component',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass],
  templateUrl: './dat-ve-component.html',
  styleUrls: ['./dat-ve-component.scss'],
})
export class DatVeComponent {
  tuyenXe = '';
  ngayDi = '';
  soLuong = 1;
  hoTen = '';
  soDienThoai = '';

  thongBao = '';
  isSuccess = false;

  private isValidPhone(phone: string) {
    return /^(0|\+84)\d{9}$/.test(phone);
  }

  datVe() {
    if (!this.tuyenXe || !this.ngayDi || !this.hoTen || !this.soDienThoai) {
      this.thongBao = '⚠️ Vui lòng nhập đầy đủ thông tin!';
      this.isSuccess = false;
      return;
    }
    if (this.soLuong < 1) {
      this.thongBao = '⚠️ Số lượng vé phải lớn hơn 0!';
      this.isSuccess = false;
      return;
    }
    if (!this.isValidPhone(this.soDienThoai)) {
      this.thongBao = '⚠️ Số điện thoại không hợp lệ! (VD: 0912345678)';
      this.isSuccess = false;
      return;
    }
    this.isSuccess = true;
    this.thongBao = `🎉 Đặt vé thành công! Chuyến: ${this.tuyenXe}, Ngày đi: ${this.ngayDi}, Số vé: ${this.soLuong}`;
  }
}
