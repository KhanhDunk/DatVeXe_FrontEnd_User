import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lich-trinh-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lich-trinh-component.html',
  styleUrls: ['./lich-trinh-component.scss'],
})
export class LichTrinhComponent {
  diemDi: string = '';
  diemDen: string = '';
  ngayDi: string = '';
  ngayVe: string = '';
  isRoundTrip: boolean = false;

  ketQuaChuyenDi = [
    { id: 1, gioKhoiHanh: '06:30', gioDen: '12:00', thoiGian: '5h30m', loaiXe: 'Giường nằm', gia: 350000, hang: 'Cúc Dũng' },
    { id: 2, gioKhoiHanh: '10:00', gioDen: '15:30', thoiGian: '5h30m', loaiXe: 'Limousine 9 chỗ', gia: 450000, hang: 'Cúc Dũng' },
  ];

  ketQuaChuyenVe = [
    { id: 101, gioKhoiHanh: '07:00', gioDen: '12:30', thoiGian: '5h30m', loaiXe: 'Giường nằm', gia: 350000, hang: 'Cúc Dũng' },
    { id: 102, gioKhoiHanh: '11:00', gioDen: '16:30', thoiGian: '5h30m', loaiXe: 'Limousine 9 chỗ', gia: 450000, hang: 'Cúc Dũng' },
  ];

  constructor() {
    this.ngayDi = new Date().toISOString().split('T')[0];
    this.ngayVe = new Date().toISOString().split('T')[0];
  }

  timLichTrinh() {
    alert(`Đang tìm kiếm chuyến ${this.diemDi} → ${this.diemDen} vào ${this.ngayDi}` +
          (this.isRoundTrip ? ` và chuyến về vào ${this.ngayVe}` : ''));
  }

  datVe(chuyenDi: any) {
    alert(`Đặt vé chuyến ${chuyenDi.gioKhoiHanh} - Giá: ${chuyenDi.gia.toLocaleString('vi-VN')} VND`);
  }
}
