import { RenderMode, ServerRoute } from '@angular/ssr';
import { NEWS_ITEMS } from '../Page/TinTuc/news-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tin-tuc/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      NEWS_ITEMS.map((item) => ({ id: String(item.id) }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
