import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
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
}
