import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/auth-service';
import { LoginRequest } from '../../../Interface/login-interface';
import { HttpClientModule } from '@angular/common/http';
import type { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-dang-nhap-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './dang-nhap-component.html',

  styleUrl: './dang-nhap-component.scss',
})
export class DangNhapComponent {
  username = '';
  password = '';
  loading = false;
  statusMessage = '';
  hasError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    this.statusMessage = '';
    this.hasError = false;

    if (!this.username || !this.password) {
      this.statusMessage = 'Vui lòng nhập đầy đủ thông tin.';
      this.hasError = true;
      return;
    }

    const payload: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.loading = true;

    this.authService.login(payload).subscribe({
      next: async (res) => {
        this.loading = false;

        if (res.success) {
          this.statusMessage = 'Đăng nhập thành công! Đang chuyển hướng...';
          this.hasError = false;
          await this.showAlert({
            icon: 'success',
            title: 'Đăng nhập thành công',
            text: `Chào mừng trở lại, ${this.username}!`,
            confirmButtonText: 'Đi tới trang chủ'
          });
          this.router.navigate(['/']);
        } else {
          this.statusMessage = res.message || 'Đăng nhập thất bại.';
          this.hasError = true;
          await this.showAlert({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: this.statusMessage
          });
        }
      },
      error: async (err) => {
        this.loading = false;
        this.statusMessage = err?.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        this.hasError = true;
        await this.showAlert({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: this.statusMessage
        });
      }
    });
  }

  private async showAlert(options: SweetAlertOptions) {
    const { default: Swal } = await import('sweetalert2');
    return Swal.fire(options);
  }
}
