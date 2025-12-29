import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import type { SweetAlertOptions } from 'sweetalert2';
import { AuthService } from '../../../Service/auth-service';
import { StaticPageService } from '../../../Service/static-page.service';
import { StaticPageModel } from '../../../Interface/static-page.interface';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnDestroy, OnInit {
  readonly authState$: Observable<string | null>;
  isMobileMenuOpen = false;
  showScrollTop = false;
  policiesLoading = false;
  policiesError?: string;
  staticPages: StaticPageModel[] = [];

  private readonly subscriptions = new Subscription();
  private readonly isBrowser: boolean;
  private unlistenScroll?: () => void;
  private unlistenResize?: () => void;

  constructor(
    private authService: AuthService,
    private router: Router,
    private staticPageService: StaticPageService,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.authState$ = this.authService.authState$;
    this.isBrowser = isPlatformBrowser(platformId);

    this.subscriptions.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.closeMobileMenu())
    );

    if (this.isBrowser) {
      const onScroll = () => this.updateScrollTopVisibility();
      const onResize = () => this.updateScrollTopVisibility();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      this.unlistenScroll = () => window.removeEventListener('scroll', onScroll);
      this.unlistenResize = () => window.removeEventListener('resize', onResize);
      this.updateScrollTopVisibility();
    }
  }

  ngOnInit(): void {
    this.loadPublishedPages();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.isBrowser) {
      this.document.body.classList.remove('mobile-menu-open');
    }

    if (this.unlistenScroll) {
      this.unlistenScroll();
      this.unlistenScroll = undefined;
    }
    if (this.unlistenResize) {
      this.unlistenResize();
      this.unlistenResize = undefined;
    }
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
      return;
    }
    this.openMobileMenu();
  }

  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
    this.syncBodyScrollLock();
  }

  closeMobileMenu(): void {
    if (!this.isMobileMenuOpen) return;
    this.isMobileMenuOpen = false;
    this.syncBodyScrollLock();
  }

  async logout(): Promise<void> {
    this.authService.logout();
    this.closeMobileMenu();
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

  trackPolicyBySlug(_index: number, page: StaticPageModel): string {
    return page.slug;
  }

  private async presentAlert(options: SweetAlertOptions) {
    const { default: Swal } = await import('sweetalert2');
    return Swal.fire(options);
  }

  private syncBodyScrollLock(): void {
    if (!this.isBrowser) return;
    this.document.body.classList.toggle('mobile-menu-open', this.isMobileMenuOpen);
  }

  private updateScrollTopVisibility(): void {
    if (!this.isBrowser) {
      this.showScrollTop = false;
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const y = window.scrollY || this.document.documentElement.scrollTop || 0;
    this.showScrollTop = isMobile && y >= 650;
  }

  private loadPublishedPages(): void {
    this.policiesLoading = true;
    this.policiesError = undefined;
    const sub = this.staticPageService.getPublishedPages().subscribe({
      next: (pages) => {
        this.staticPages = pages;
        this.policiesLoading = false;
      },
      error: () => {
        this.staticPages = [];
          this.policiesError = 'Khong the tai danh sach chinh sach';
        this.policiesLoading = false;
      }
    });
    this.subscriptions.add(sub);
  }
}