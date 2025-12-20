import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  protected readonly title = signal('frontend');

  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly navigationSub: Subscription;

  constructor() {
    this.navigationSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Ensure the user sees the start of the new page.
        setTimeout(() => this.scrollToTop(), 0);
      });
  }

  ngOnDestroy(): void {
    this.navigationSub.unsubscribe();
  }

  private scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);

    if (typeof window === 'undefined') return;

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const main = document.querySelector('main');
    if (main) {
      (main as HTMLElement).scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }
}
