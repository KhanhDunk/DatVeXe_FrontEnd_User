import { CommonModule, isPlatformBrowser } from "@angular/common"
import { Component, type OnInit, type OnDestroy, Inject, PLATFORM_ID, signal, computed } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"


interface Slide {
  title: string
  description: string
  bg: string
  image: string
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./trang-chu-component.html",
  styleUrls: ["./trang-chu-component.scss"],
})
export class TrangChuComponent implements OnInit, OnDestroy {

  isOpen = signal(false)
  private intervalId: any
  private routeInterval: any
  private newsInterval: any
  private readonly isBrowser: boolean
  private resizeUnlisten?: () => void
  private mediaUnlisten?: () => void
  private pageSize = signal(3)

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  formData = signal({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  })

  slides: Slide[] = [
    {
      title: "DŨNG CÚC AUTO",
      description: "An tâm di chuyển – Hưởng trọn hành trình",
      bg: "bg-gradient-to-br from-primary via-secondary to-accent",

      image: "/Assets/images/anhxe1.jpg",

    },
    {
      title: "Tuyến cố định rõ ràng",
      description: "TP.HCM → Bến Xe Hà Nội · Bến Xe Cà Mau · Bến Xe Trà Vinh · Bến Xe Vũng Tàu",
      bg: "bg-gradient-to-br from-accent via-secondary to-primary",

      image: "Assets/images/anhxe3.jpg",

    },
    {
      title: "Xe chất lượng cao – limousine",
      description: "Xe đời mới, sạch sẽ, bảo dưỡng định kỳ; tài xế kinh nghiệm, phục vụ tận tâm.",
      bg: "bg-gradient-to-br from-accent via-secondary to-primary",

      image: "Assets/images/anhxe2.jpg",

  
    }
  ]
  // 
  passengers = [1, 2, 3, 4, 5, 6]

  promoIndex = 0;
  promoInterval: any;
  private swipeActive: 'promo' | 'route' | 'news' | null = null;
  private swipeStartX = 0;
  private swipeStartY = 0;
  private swipeDeltaX = 0;
  private swipeMoved = false;
  promotions = [
    {
      title: "Vận chuyển hành khách tuyến cố định",
      description: "Lịch trình rõ ràng – đúng tuyến – đúng giờ",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Xe chất lượng cao – xe limousine",
      description: "Xe xịn – sạch sẽ – bảo dưỡng định kỳ",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Nhận hợp đồng xe gia đình, du lịch",
      description: "Theo nhu cầu – ưu tiên an toàn và trải nghiệm",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Đón/trả đúng điểm – đúng giờ",
      description: "Ưu tiên trải nghiệm khách hàng và an toàn hành trình",
      image: "Assets/images/anhxe2.jpg"
    },
    {
      title: "Khoang ghế êm – không gian sạch sẽ",
      description: "Vệ sinh xe định kỳ, hành trình thoải mái",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Hỗ trợ đổi/hoàn theo chính sách",
      description: "Rõ ràng – minh bạch – hỗ trợ nhanh",
      image: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Thanh toán linh hoạt",
      description: "Nhiều phương thức thanh toán, thao tác nhanh",
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Tư vấn lịch trình",
      description: "Chọn chuyến phù hợp, gợi ý tuyến nhanh",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=700&fit=crop&auto=format"
    },
    {
      title: "Cam kết phục vụ tận tâm",
      description: "Thái độ chuyên nghiệp – hỗ trợ chu đáo",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=700&fit=crop&auto=format"
    },
  ];

  readonly promotionPages = computed(() => this.chunkArray(this.promotions, this.pageSize()));

  slide = signal(0);

  ngOnInit() {
    if (this.isBrowser) {
      // After hydration/initial paint, ensure the page size matches the viewport.
      requestAnimationFrame(() => this.updatePageSize());
      requestAnimationFrame(() => this.updatePageSize());

      const resizeHandler = () => this.updatePageSize();
      window.addEventListener("resize", resizeHandler, { passive: true });
      this.resizeUnlisten = () => window.removeEventListener("resize", resizeHandler);

      // Some mobile browsers don't reliably fire resize; listen to media query changes too.
      const mqHandler = () => this.updatePageSize();
      const mqlPhone = window.matchMedia?.('(max-width: 600px)');
      const mqlTablet = window.matchMedia?.('(max-width: 1024px)');

      const unsubs: Array<() => void> = [];
      for (const mql of [mqlPhone, mqlTablet]) {
        if (!mql) continue;
        try {
          mql.addEventListener('change', mqHandler);
          unsubs.push(() => mql.removeEventListener('change', mqHandler));
        } catch {
          // Safari < 14
          (mql as any).addListener(mqHandler);
          unsubs.push(() => (mql as any).removeListener(mqHandler));
        }
      }
      if (unsubs.length) {
        this.mediaUnlisten = () => {
          for (const unsub of unsubs) unsub();
        };
      }
    }

    this.intervalId = setInterval(() => {
      this.slide.update(v => (v + 1) % this.slides.length);
    }, 4000);


    this.promoInterval = setInterval(() => {
      const pages = this.promotionPages().length;
      if (pages > 0) this.promoIndex = (this.promoIndex + 1) % pages;
    }, 8000);

    this.routeInterval = setInterval(() => {
      const pages = this.routePages().length;
      if (pages > 0) this.routeIndex = (this.routeIndex + 1) % pages;
    }, 8500);

    this.newsInterval = setInterval(() => {
      const pages = this.newsPages().length;
      if (pages > 0) this.newsIndex = (this.newsIndex + 1) % pages;
    }, 9000);
  }


  // Slide index
  routeIndex = 0;

  popularRoutes = [
    {
      name: "TP.HCM → Bến Xe Hà Nội",
      description: "Tuyến cố định",
      image: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=1200&h=700&fit=crop&auto=format"
    },
    {
      name: "TP.HCM → Bến Xe Cà Mau",
      description: "Tuyến cố định",
      image: "Assets/images/anhxe3.jpg"
    },
    {
      name: "TP.HCM → Bến Xe Trà Vinh",
      description: "Tuyến cố định",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=700&fit=crop&auto=format"
    },
    {
      name: "TP.HCM → Bến Xe Vũng Tàu",
      description: "Tuyến cố định",
      image: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=1200&h=700&fit=crop&auto=format"
    },
    {
      name: "Bến Xe Hà Nội → TP.HCM",
      description: "Chiều về",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=700&fit=crop&auto=format"
    },
    {
      name: "Bến Xe Cà Mau → TP.HCM",
      description: "Chiều về",
      image: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=1200&h=700&fit=crop&auto=format"
    },
    {
      name: "Bến Xe Trà Vinh → TP.HCM",
      description: "Chiều về",
      image: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=1200&h=700&fit=crop&auto=format"
    },
    {
      name: "Bến Xe Vũng Tàu → TP.HCM",
      description: "Chiều về",
      image: "Assets/images/anhxe1.jpg"
    },
    {
      name: "TP.HCM → Bến Xe Hà Nội (tăng cường)",
      description: "Chuyến tăng cường",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=700&fit=crop&auto=format"
    }
  ];

  readonly routePages = computed(() => this.chunkArray(this.popularRoutes, this.pageSize()));

  goToRoute(i: number) {
    this.routeIndex = i;
  }


  newsIndex = 0;

  newsList = [
  {
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=700&fit=crop&auto=format",
    title: "DŨNG CÚC AUTO – Tuyến cố định",
    short: "Lịch trình rõ ràng – đúng tuyến – đúng giờ."
  },
  {
    image: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=1200&h=700&fit=crop&auto=format",
    title: "Xe xịn – sạch sẽ – bảo dưỡng định kỳ",
    short: "Nâng cao chất lượng phục vụ để mỗi chuyến đi thoải mái và an tâm."
  },
  {
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&h=700&fit=crop&auto=format",
    title: "Giá vé minh bạch – không phát sinh",
    short: "Luôn lắng nghe và cải thiện dịch vụ mỗi ngày."
  },
  {
    image: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?w=1200&h=700&fit=crop&auto=format",
    title: "Gợi ý chọn chuyến theo nhu cầu",
    short: "Chọn tuyến – chọn giờ – đặt vé nhanh chóng."
  },
  {
    image: "Assets/images/anhxe2.jpg",
    title: "Quy trình lên xe gọn gàng",
    short: "Ưu tiên trật tự, hỗ trợ khách hàng trong suốt hành trình."
  },
  {
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1200&h=700&fit=crop&auto=format",
    title: "An toàn là ưu tiên số 1",
    short: "Tài xế kinh nghiệm – tuân thủ quy định – chạy đúng tốc độ."
  },
  {
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=700&fit=crop&auto=format",
    title: "Chăm sóc xe định kỳ",
    short: "Bảo dưỡng thường xuyên giúp hành trình êm ái và ổn định."
  },
  {
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=700&fit=crop&auto=format",
    title: "Phục vụ tận tâm",
    short: "Lắng nghe phản hồi và cải thiện chất lượng mỗi ngày."
  },
  {
    image: "Assets/images/anhxe3.jpg",
    title: "Dịch vụ phù hợp nhiều đối tượng",
    short: "Đi công tác – du lịch – thăm người thân đều thuận tiện."
  },
  ];

  readonly newsPages = computed(() => this.chunkArray(this.newsList, this.pageSize()));

  onCardImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null
    if (!img) return

    const fallback = "Assets/images/anhxe1.jpg"
    if (img.src.includes(fallback)) return

    img.src = fallback
  }

  goToNews(i: number) {
    this.newsIndex = i;
  }

  onSwipeStart(event: PointerEvent, slider: 'promo' | 'route' | 'news'): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const el = event.currentTarget as HTMLElement | null;
    if (el?.setPointerCapture) {
      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    }

    this.swipeActive = slider;
    this.swipeStartX = event.clientX;
    this.swipeStartY = event.clientY;
    this.swipeDeltaX = 0;
    this.swipeMoved = false;
  }

  onSwipeMove(event: PointerEvent): void {
    if (!this.swipeActive) return;

    const dx = event.clientX - this.swipeStartX;
    const dy = event.clientY - this.swipeStartY;
    this.swipeDeltaX = dx;

    if (!this.swipeMoved) {
      if (Math.abs(dx) < 10) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        // User is scrolling vertically; don't hijack.
        this.swipeActive = null;
        return;
      }
      this.swipeMoved = true;
    }

    // Prevent image dragging / accidental text selection while swiping.
    event.preventDefault();
  }

  onSwipeEnd(_event: PointerEvent): void {
    if (!this.swipeActive) return;

    const threshold = 55;
    const dx = this.swipeDeltaX;
    const slider = this.swipeActive;
    this.swipeActive = null;

    if (!this.swipeMoved || Math.abs(dx) < threshold) return;

    if (slider === 'promo') {
      const pages = this.promotionPages().length;
      if (pages <= 1) return;
      this.promoIndex = dx < 0 ? (this.promoIndex + 1) % pages : (this.promoIndex - 1 + pages) % pages;
      return;
    }

    if (slider === 'route') {
      const pages = this.routePages().length;
      if (pages <= 1) return;
      this.routeIndex = dx < 0 ? (this.routeIndex + 1) % pages : (this.routeIndex - 1 + pages) % pages;
      return;
    }

    const pages = this.newsPages().length;
    if (pages <= 1) return;
    this.newsIndex = dx < 0 ? (this.newsIndex + 1) % pages : (this.newsIndex - 1 + pages) % pages;
  }






  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    if (this.promoInterval) clearInterval(this.promoInterval);
    if (this.routeInterval) clearInterval(this.routeInterval);
    if (this.newsInterval) clearInterval(this.newsInterval);

    if (this.resizeUnlisten) {
      this.resizeUnlisten();
      this.resizeUnlisten = undefined;
    }

    if (this.mediaUnlisten) {
      this.mediaUnlisten();
      this.mediaUnlisten = undefined;
    }
  }

  goToPromo(index: number) {
    this.promoIndex = index;
  }
  goToSlide(i: number) {
    this.promoIndex = i;
  }

  private chunkArray<T>(items: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
      result.push(items.slice(i, i + size))
    }
    return result;
  }

  private updatePageSize(): void {
    if (!this.isBrowser) return;

    const width = window.innerWidth;
    const isPhone = window.matchMedia?.('(max-width: 600px)').matches ?? width <= 600;
    const isTablet = window.matchMedia?.('(max-width: 1024px)').matches ?? width <= 1024;

    const next = isPhone ? 1 : (isTablet ? 2 : 3);
    if (next === this.pageSize()) return;

    this.pageSize.set(next);

    const promoPages = this.promotionPages().length;
    if (promoPages > 0 && this.promoIndex >= promoPages) this.promoIndex = promoPages - 1;

    const routePages = this.routePages().length;
    if (routePages > 0 && this.routeIndex >= routePages) this.routeIndex = routePages - 1;

    const newsPages = this.newsPages().length;
    if (newsPages > 0 && this.newsIndex >= newsPages) this.newsIndex = newsPages - 1;
  }
  toggleMenu() {
    this.isOpen.update((val) => !val)
  }

  handleSubmit(e: Event) {
    e.preventDefault()
    console.log("Search:", this.formData())
  }

  updateForm(field: string, value: string) {
    this.formData.update((data) => ({
      ...data,
      [field]: value,
    }))
  }
}
