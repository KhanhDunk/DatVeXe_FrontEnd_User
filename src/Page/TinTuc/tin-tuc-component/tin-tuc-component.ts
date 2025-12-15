import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface NewsItem {
  title: string;
  description: string;
  image: string;
  date: string;
}
@Component({
  selector: 'app-tin-tuc-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tin-tuc-component.html',
  styleUrls: ['./tin-tuc-component.scss']
})
export class TinTucComponent {
   mainTitle = 'Tin tức nổi bật';

  newsItems: NewsItem[] = [
    {
      title: 'Bài báo 1',
      description: 'Mô tả ngắn gọn về bài báo 1.',
      image: 'https://picsum.photos/600/400?random=1',
      date: '2025-12-09'
    },
    {
      title: 'Bài báo 2',
      description: 'Mô tả ngắn gọn về bài báo 2.',
      image: 'https://picsum.photos/600/400?random=2',
      date: '2025-12-08'
    },
    // Thêm 8 bài báo nữa
    {
      title: 'Bài báo 3',
      description: 'Mô tả ngắn gọn về bài báo 3.',
      image: 'https://picsum.photos/600/400?random=3',
      date: '2025-12-07'
    },
    {
      title: 'Bài báo 4',
      description: 'Mô tả ngắn gọn về bài báo 4.',
      image: 'https://picsum.photos/600/400?random=4',
      date: '2025-12-06'
    },
    {
      title: 'Bài báo 5',
      description: 'Mô tả ngắn gọn về bài báo 5.',
      image: 'https://picsum.photos/600/400?random=5',
      date: '2025-12-05'
    },
    {
      title: 'Bài báo 6',
      description: 'Mô tả ngắn gọn về bài báo 6.',
      image: 'https://picsum.photos/600/400?random=6',
      date: '2025-12-04'
    },
    {
      title: 'Bài báo 7',
      description: 'Mô tả ngắn gọn về bài báo 7.',
      image: 'https://picsum.photos/600/400?random=7',
      date: '2025-12-03'
    },
    {
      title: 'Bài báo 8',
      description: 'Mô tả ngắn gọn về bài báo 8.',
      image: 'https://picsum.photos/600/400?random=8',
      date: '2025-12-02'
    },
    {
      title: 'Bài báo 9',
      description: 'Mô tả ngắn gọn về bài báo 9.',
      image: 'https://picsum.photos/600/400?random=9',
      date: '2025-12-01'
    },
    {
      title: 'Bài báo 10',
      description: 'Mô tả ngắn gọn về bài báo 10.',
      image: 'https://picsum.photos/600/400?random=10',
      date: '2025-11-30'
    }
  ];
}
