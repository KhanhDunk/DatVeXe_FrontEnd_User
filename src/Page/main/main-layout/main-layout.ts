import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import type { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../../Service/auth-service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  readonly authState$: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authState$ = this.authService.authState$;
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.presentAlert({
      icon: 'success',
      title: 'Đã đăng xuất',
      text: 'Hẹn gặp lại trên chuyến xe tiếp theo!',
      confirmButtonText: 'Về trang chủ'
    });
    this.router.navigate(['/']);
  }

  getInitial(username: string | null): string {
    return username ? username.charAt(0).toUpperCase() : '?';
  }

  private async presentAlert(options: SweetAlertOptions) {
    const { default: Swal } = await import('sweetalert2');
    return Swal.fire(options);
  }
}