import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../../Service/auth-service';
import { ForgotPasswordRequest } from '../../../Interface/forgot-password-interface';
import { ResetPasswordRequest } from '../../../Interface/reset-password-interface';

@Component({
  selector: 'app-quen-mat-khau-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './quen-mat-khau-component.html',
  styleUrl: './quen-mat-khau-component.scss',
})
export class QuenMatKhauComponent {
  readonly requestForm: FormGroup;
  readonly resetForm: FormGroup;

  loadingRequest = false;
  loadingReset = false;
  otpRequested = false;
  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: [passwordMatchValidator] }
    );
  }

  submitRequest(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const payload: ForgotPasswordRequest = {
      email: this.requestForm.value.email.trim()
    };

    this.loadingRequest = true;
    this.authService.forgotPassword(payload).subscribe({
      next: async (message) => {
        this.loadingRequest = false;
        this.otpRequested = true;
        this.resetForm.patchValue({ email: payload.email });
        this.setStatus(message, 'success');
        await this.showAlert({
          icon: 'success',
          title: 'Đã gửi mã OTP',
          text: 'Vui lòng kiểm tra hộp thư để nhận mã xác minh.'
        });
      },
      error: async (error) => {
        this.loadingRequest = false;
        const message = this.extractMessage(error) || 'Không thể gửi OTP. Vui lòng thử lại.';
        this.setStatus(message, 'error');
        await this.showAlert({
          icon: 'error',
          title: 'Gửi OTP thất bại',
          text: message
        });
      }
    });
  }

  submitReset(): void {
    if (!this.otpRequested) {
      this.setStatus('Vui lòng nhận OTP trước khi đặt lại mật khẩu.', 'error');
      return;
    }

    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const payload: ResetPasswordRequest = {
      email: this.resetForm.value.email.trim(),
      otp: this.resetForm.value.otp.trim(),
      newPassword: this.resetForm.value.newPassword
    };

    this.loadingReset = true;
    this.authService.resetPassword(payload).subscribe({
      next: async (message) => {
        this.loadingReset = false;
        this.setStatus(message || 'Đổi mật khẩu thành công.', 'success');
        await this.showAlert({
          icon: 'success',
          title: 'Đổi mật khẩu thành công',
          text: 'Bạn có thể đăng nhập với mật khẩu mới.',
          confirmButtonText: 'Đăng nhập ngay'
        });
        this.router.navigate(['/dang-nhap']);
      },
      error: async (error) => {
        this.loadingReset = false;
        const message = this.extractMessage(error) || 'Không thể đặt lại mật khẩu.';
        this.setStatus(message, 'error');
        await this.showAlert({
          icon: 'error',
          title: 'Đặt lại mật khẩu thất bại',
          text: message
        });
      }
    });
  }

  showRequestError(control: string): boolean {
    const field = this.requestForm.get(control);
    return !!field && field.invalid && (field.touched || field.dirty);
  }

  showResetError(control: string): boolean {
    const field = this.resetForm.get(control);
    return !!field && field.invalid && (field.touched || field.dirty);
  }

  private setStatus(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusType = type;
  }

  private extractMessage(error: any): string {
    if (!error) {
      return '';
    }
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error.error === 'string') {
      return error.error;
    }
    if (typeof error.message === 'string') {
      return error.message;
    }
    if (error.error?.message) {
      return error.error.message;
    }
    return '';
  }

  private async showAlert(options: SweetAlertOptions) {
    const { default: Swal } = await import('sweetalert2');
    return Swal.fire(options);
  }
}

function passwordMatchValidator(group: FormGroup) {
  const password = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}
