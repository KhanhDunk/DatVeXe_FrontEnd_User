import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Service/auth-service';
import { LoginRequest } from '../../../Interface/login-interface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dang-nhap-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dang-nhap-component.html',

  styleUrl: './dang-nhap-component.scss',
})
export class DangNhapComponent {
  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.username || !this.password) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const payload: LoginRequest = {
      username: this.username,
      password: this.password
    };

    this.loading = true;

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success) {
          alert(res.message);

          // 👉 TẠM CHUYỂN VỀ TRANG USER
          this.router.navigate(['/']);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        this.loading = false;
        alert(err?.error?.message || 'Đăng nhập thất bại');
      }
    });
  }
}
