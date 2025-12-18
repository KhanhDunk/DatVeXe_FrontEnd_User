import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Service/auth-service';
import { RegisterRequest } from '../../../Interface/register-interface';
import type { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-dang-ky-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './dang-ky-component.html',
  styleUrls: ['./dang-ky-component.scss'],
})
export class DangKyComponent {
  loading = false;
  serverMessage = '';
  readonly form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        username: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^(0|\+?84)(\d){9}$/)]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        ]],
        confirmPassword: ['', [Validators.required]],
        agree: [false, Validators.requiredTrue]
      },
      { validators: [passwordMatchValidator] }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {
    this.serverMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: RegisterRequest = {
      username: this.f['username'].value.trim(),
      email: this.f['email'].value.trim(),
      phone: this.normalizePhone(this.f['phone'].value.trim()),
      password: this.f['password'].value
    };

    this.loading = true;
    this.authService.register(payload).subscribe({
      next: async (res) => {
        this.loading = false;
        this.serverMessage = res.message || 'Đăng ký thành công';

        if (res.success) {
          await this.showAlert({
            icon: 'success',
            title: 'Đăng ký thành công',
            text: 'Bạn có thể đăng nhập để trải nghiệm đầy đủ tính năng.',
            confirmButtonText: 'Đăng nhập ngay'
          });
          this.router.navigate(['/dang-nhap']);
        }
      },
      error: async (err) => {
        this.loading = false;
        this.serverMessage = err?.error?.message || 'Không thể đăng ký. Vui lòng thử lại.';
        await this.showAlert({
          icon: 'error',
          title: 'Đăng ký thất bại',
          text: this.serverMessage
        });
      }
    });
  }

  private async showAlert(options: SweetAlertOptions) {
    const { default: Swal } = await import('sweetalert2');
    return Swal.fire(options);
  }

  showError(controlName: string): boolean {
    const control = this.f[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  private normalizePhone(phone: string): string {
    if (phone.startsWith('+84')) {
      return '0' + phone.slice(3);
    }
    return phone;
  }
}

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}
