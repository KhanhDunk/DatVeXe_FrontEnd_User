import { Component } from '@angular/core';

@Component({
  selector: 'app-trang-chu',
  standalone: true,
  templateUrl: './trang-chu-component.html',
  styleUrls: ['./trang-chu-component.scss']
})
export class TrangChuComponent {
  
  // Thuộc tính mẫu để hiển thị nội dung trang chủ
  title = 'Trang Chủ Đặt Vé Xe';

  // Ví dụ hàm xử lý khi người dùng bấm nút
  timChuyen() {
    console.log("Người dùng bấm nút tìm chuyến!");
  }

}
