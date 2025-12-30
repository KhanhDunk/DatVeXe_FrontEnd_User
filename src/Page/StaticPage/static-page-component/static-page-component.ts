import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription, distinctUntilChanged, filter, map } from 'rxjs';
import { StaticPageService } from '../../../Service/static-page.service';
import { StaticPageModel } from '../../../Interface/static-page.interface';

@Component({
  selector: 'app-static-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './static-page-component.html',
  styleUrl: './static-page-component.scss'
})
export class StaticPageComponent implements OnInit, OnDestroy {
  page?: StaticPageModel;
  safeContent?: SafeHtml;
  isLoading = true;
  errorMessage?: string;

  private readonly subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private staticPageService: StaticPageService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const routeSub = this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('slug')),
        filter((slug): slug is string => !!slug),
        distinctUntilChanged()
      )
      .subscribe((slug) => this.loadStaticPage(slug));

    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadStaticPage(slug: string): void {
    this.isLoading = true;
    this.errorMessage = undefined;
    const fetchSub = this.staticPageService.getPageBySlug(slug).subscribe({
      next: (page) => {
        this.page = page;
        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(page.content);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.page = undefined;
        this.safeContent = undefined;
        this.errorMessage = error?.message ?? 'Khong tim thay noi dung phu hop';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });

    this.subscriptions.add(fetchSub);
  }
}
