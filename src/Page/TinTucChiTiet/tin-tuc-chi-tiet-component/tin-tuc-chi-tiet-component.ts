import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { NEWS_ITEMS, type NewsItem } from '../../TinTuc/news-data';

@Component({
  selector: 'app-tin-tuc-chi-tiet-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tin-tuc-chi-tiet-component.html',
  styleUrl: './tin-tuc-chi-tiet-component.scss',
})
export class TinTucChiTietComponent {
  private readonly route = inject(ActivatedRoute);

  readonly news$ = this.route.paramMap.pipe(
    map((params) => {
      const id = Number(params.get('id'));
      if (!Number.isFinite(id)) return null;
      return (NEWS_ITEMS as NewsItem[]).find((n) => n.id === id) ?? null;
    })
  );

  readonly relatedNews$ = this.news$.pipe(
    map((news) => {
      if (!news) return [] as NewsItem[];
      const items = NEWS_ITEMS as NewsItem[];
      const index = items.findIndex((n) => n.id === news.id);
      if (index < 0) return items.filter((n) => n.id !== news.id).slice(0, 3);

      const related: NewsItem[] = [];
      for (let offset = 1; offset < items.length && related.length < 3; offset++) {
        const candidate = items[(index + offset) % items.length];
        if (candidate.id !== news.id) related.push(candidate);
      }
      return related;
    })
  );
}
