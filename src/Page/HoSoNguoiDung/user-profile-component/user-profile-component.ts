import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { UserProfile, UserProfileUpdatePayload } from '../../../Interface/profile.interface';
import { AuthService } from '../../../Service/auth-service';
import { ProfileService } from '../../../Service/profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.scss'
})
export class UserProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly authService = inject(AuthService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly profile = signal<UserProfile | null>(null);
  protected readonly feedback = signal<{ type: 'success' | 'error'; message: string } | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]]
  });

  protected readonly hasChanges = computed(() => {
    const snapshot = this.profile();
    if (!snapshot) {
      return false;
    }

    const value = this.form.getRawValue();
    return (
      value.username.trim() !== (snapshot.username ?? '') ||
      value.email.trim() !== (snapshot.email ?? '') ||
      value.phone.trim() !== (snapshot.phone ?? '')
    );
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  protected refresh(): void {
    this.loadProfile();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    if (!payload) {
      this.feedback.set({ type: 'error', message: 'Bạn chưa thay đổi thông tin nào để cập nhật.' });
      return;
    }

    this.saving.set(true);
    this.feedback.set(null);

    this.profileService
      .updateProfile(payload)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success || !response.data) {
            this.feedback.set({ type: 'error', message: response.message || 'Không thể cập nhật hồ sơ.' });
            return;
          }

          this.profile.set(response.data);
          this.resetFormWith(response.data);
          if (response.data.username) {
            this.authService.updateCachedUsername(response.data.username);
          }
          this.feedback.set({ type: 'success', message: 'Đã lưu thông tin mới.' });
        },
        error: (error) => {
          const message = error?.error?.message || 'Không thể cập nhật hồ sơ. Vui lòng thử lại sau.';
          this.feedback.set({ type: 'error', message });
        }
      });
  }

  protected controlError(controlName: 'username' | 'email' | 'phone'): string | null {
    const control = this.form.controls[controlName];
    if (!control || !(control.touched || control.dirty) || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      if (controlName === 'username') {
        return 'Tên đăng nhập bắt buộc.';
      }
      if (controlName === 'email') {
        return 'Email bắt buộc.';
      }
      return 'Số điện thoại bắt buộc.';
    }

    if (controlName === 'username' && control.errors['minlength']) {
      return 'Tên đăng nhập cần ít nhất 4 ký tự.';
    }

    if (controlName === 'phone' && control.errors['minlength']) {
      return 'Số điện thoại chưa hợp lệ.';
    }

    if (controlName === 'email' && control.errors['email']) {
      return 'Định dạng email chưa chính xác.';
    }

    return null;
  }

  private loadProfile(): void {
    this.loading.set(true);
    this.feedback.set(null);

    this.profileService
      .getProfile()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success || !response.data) {
            this.feedback.set({ type: 'error', message: response.message || 'Không thể tải hồ sơ.' });
            return;
          }

          this.profile.set(response.data);
          this.resetFormWith(response.data);
        },
        error: (error) => {
          const message = error?.error?.message || 'Không thể tải hồ sơ. Vui lòng thử lại.';
          this.feedback.set({ type: 'error', message });
        }
      });
  }

  private resetFormWith(profile: UserProfile): void {
    this.form.reset({
      username: profile.username ?? '',
      email: profile.email ?? '',
      phone: profile.phone ?? ''
    });
  }

  private buildPayload(): UserProfileUpdatePayload | null {
    const snapshot = this.profile();
    if (!snapshot) {
      return null;
    }

    const payload: UserProfileUpdatePayload = {};
    const value = this.form.getRawValue();

    if (value.username.trim() !== (snapshot.username ?? '')) {
      payload.username = value.username.trim();
    }

    if (value.email.trim() !== (snapshot.email ?? '')) {
      payload.email = value.email.trim();
    }

    if (value.phone.trim() !== (snapshot.phone ?? '')) {
      payload.phone = value.phone.trim();
    }

    return Object.keys(payload).length ? payload : null;
  }
}
