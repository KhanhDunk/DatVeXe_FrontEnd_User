import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';

interface PaymentMethod {
  id: string;
  name: string;
  subtitle?: string;
  extra?: string;
  accent?: string;
  code?: string;
  logo?: string;
}

interface PaymentPayload {
  booking?: {
    fullName: string;
    phone: string;
    email: string;
  };
  selectedSeats?: string[];
  totalAmount?: number;
  tripInfo?: {
    route?: string;
    departTime?: string;
    pickup?: string;
    dropoff?: string;
  };
}

@Component({
  selector: 'app-thanh-toan-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thanh-toan-component.html',
  styleUrls: ['./thanh-toan-component.scss'],
})
export class ThanhToanComponent {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly state = this.resolveState();

  readonly paymentMethods: PaymentMethod[] = [
    { id: 'zalopay', name: 'ZaloPay', logo: 'Assets/images/zalopay.png', code: 'ZP' },
    { id: 'momo', name: 'MoMo', logo: 'Assets/images/momopay.png', code: 'MM' },
    { id: 'vnpay', name: 'VNPAY', logo: 'Assets/images/vnpay.png', code: 'VN' }
  ];

  selectedMethodId = 'zalopay';
  readonly holdTime = '09:40';

  readonly bookingInfo = this.state?.booking ?? {
    fullName: '',
    phone: '',
    email: ''
  };

  readonly tripInfo = {
    route: this.state?.tripInfo?.route ?? 'TP.HCM → Bến Xe Hà Nội',
    departTime: this.state?.tripInfo?.departTime ?? 'Đang cập nhật',
    pickup: this.state?.tripInfo?.pickup ?? 'TP.HCM',
    dropoff: this.state?.tripInfo?.dropoff ?? 'Bến Xe Hà Nội',
    seatLabel: this.state?.selectedSeats?.length
      ? this.state.selectedSeats.join(', ')
      : 'Chưa chọn',
    seatCount: this.state?.selectedSeats?.length ?? 0
  };

  readonly paymentSummary = {
    fare: this.state?.totalAmount ?? 0,
    fee: 0
  };

  readonly qrSrc = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="220" height="220" fill="#ffffff"/>
      <rect x="10" y="10" width="60" height="60" fill="#111111" rx="6"/>
      <rect x="20" y="20" width="40" height="40" fill="#ffffff"/>
      <rect x="30" y="30" width="20" height="20" fill="#111111"/>
      <rect x="150" y="10" width="60" height="60" fill="#111111" rx="6"/>
      <rect x="160" y="20" width="40" height="40" fill="#ffffff"/>
      <rect x="170" y="30" width="20" height="20" fill="#111111"/>
      <rect x="10" y="150" width="60" height="60" fill="#111111" rx="6"/>
      <rect x="20" y="160" width="40" height="40" fill="#ffffff"/>
      <rect x="30" y="170" width="20" height="20" fill="#111111"/>
      <rect x="150" y="150" width="60" height="60" fill="#111111" rx="6"/>
      <rect x="160" y="160" width="40" height="40" fill="#ffffff"/>
      <rect x="170" y="170" width="20" height="20" fill="#111111"/>
      <rect x="90" y="10" width="20" height="20" fill="#111111"/>
      <rect x="120" y="10" width="20" height="20" fill="#111111"/>
      <rect x="90" y="40" width="20" height="20" fill="#111111"/>
      <rect x="120" y="40" width="20" height="20" fill="#111111"/>
      <rect x="90" y="90" width="20" height="20" fill="#111111"/>
      <rect x="120" y="90" width="20" height="20" fill="#111111"/>
      <rect x="90" y="120" width="20" height="20" fill="#111111"/>
      <rect x="120" y="120" width="20" height="20" fill="#111111"/>
      <rect x="90" y="150" width="20" height="20" fill="#111111"/>
      <rect x="120" y="150" width="20" height="20" fill="#111111"/>
      <rect x="105" y="180" width="10" height="10" fill="#111111"/>
    </svg>
  `)}`;

  get totalAmount(): number {
    return this.paymentSummary.fare + this.paymentSummary.fee;
  }

  get selectedMethod(): PaymentMethod {
    return this.paymentMethods.find((method) => method.id === this.selectedMethodId) ?? this.paymentMethods[0];
  }

  selectMethod(methodId: string): void {
    this.selectedMethodId = methodId;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN') + 'đ';
  }

  private resolveState(): PaymentPayload | null {
    const navState = this.router.getCurrentNavigation()?.extras.state as PaymentPayload | undefined;
    if (navState?.booking) {
      return navState;
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const browserState = window.history.state as PaymentPayload | undefined;
      return browserState?.booking ? browserState : null;
    }
    return null;
  }
}
