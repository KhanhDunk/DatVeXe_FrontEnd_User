import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-lich-trinh-chi-tiet-component',
  imports: [ CommonModule, 
    DecimalPipe],
  templateUrl: './lich-trinh-chi-tiet-component.html',
  styleUrl: './lich-trinh-chi-tiet-component.scss',
})
export class LichTrinhChiTietComponent {
   // ---------- Data mẫu ----------
  routeInfo = {
    start: 'TP.HCM',
    end: 'Cần Thơ',
    type: 'Giường nằm 40 chỗ',
    distance: '165 km',
    duration: '3 giờ 30 phút',
    price: 150000
  };

  schedules = [
    { time: '05:30', seats: 12 },
    { time: '07:00', seats: 5 },
    { time: '09:30', seats: 20 },
    { time: '11:45', seats: 7 },
    { time: '14:00', seats: 9 }
  ];

  // ---------- Xử lý đặt vé ----------
  selectTrip(s: any) {
    alert(`Bạn đã chọn chuyến ${s.time} — còn ${s.seats} chỗ`);
  }
}
