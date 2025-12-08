import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tra-cuu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tra-cuu-component.html',
  styleUrls: ['./tra-cuu-component.scss']
})
export class TraCuuComponent {
  ticketCode = '';
  ticketInfo: {
    customerName: string;
    route: string;
    departDate: string;
    seat: string;
    status: 'Đã xác nhận' | 'Chờ' | 'Đã hủy';
  } | null = null;

  lookedUp = false;

  onLookup() {
    this.lookedUp = true;

    const mockDatabase: Record<string, any> = {
      'CD2025-0001': {
        customerName: 'Nguyễn Văn A',
        route: 'Hồ Chí Minh → Đà Lạt',
        departDate: '2025-12-10',
        seat: '12B',
        status: 'Đã xác nhận'
      },
      'CD2025-0002': {
        customerName: 'Trần Thị B',
        route: 'Hà Nội → Sapa',
        departDate: '2025-12-12',
        seat: '05A',
        status: 'Chờ'
      }
    };

    const info = mockDatabase[this.ticketCode.trim()];
    this.ticketInfo = info ? info : null;
  }

  statusClass(status: string) {
    switch (status) {
      case 'Đã xác nhận': return 'status-active';
      case 'Chờ': return 'status-pending';
      case 'Đã hủy': return 'status-cancelled';
      default: return '';
    }
  }
}
