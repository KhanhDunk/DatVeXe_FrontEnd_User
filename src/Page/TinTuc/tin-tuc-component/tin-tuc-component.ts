import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NEWS_ITEMS, type NewsItem } from '../news-data';


@Component({
  selector: 'app-tin-tuc-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tin-tuc-component.html',
  styleUrls: ['./tin-tuc-component.scss']
})
export class TinTucComponent {
   mainTitle = 'Tin tức nổi bật';

  newsItems: NewsItem[] = NEWS_ITEMS;

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    let id: string | null = null;
    try {
      id = sessionStorage.getItem('returnToNewsId');
    } catch {
      id = null;
    }
    if (!id) return;

    // Delay one tick to ensure the DOM is fully painted.
    setTimeout(() => {
      const el = document.getElementById(`news-${id}`);
      if (el) {
        el.scrollIntoView({ block: 'start' });
      }

      try {
        sessionStorage.removeItem('returnToNewsId');
      } catch {
        // ignore
      }
    }, 0);
  }
}
