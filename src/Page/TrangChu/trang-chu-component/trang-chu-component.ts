import { Component, type OnInit, type OnDestroy, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"


interface Slide {
  title: string
  description: string
  bg: string
  image: string
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./trang-chu-component.html",
  styleUrls: ["./trang-chu-component.scss"],
})
export class TrangChuComponent implements OnInit, OnDestroy {

  isOpen = signal(false)
  private intervalId: any

  formData = signal({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  })

  slides: Slide[] = [
    {
      title: "Đặt vé xe an toàn, nhanh chóng, tiện lợi",
      description: "Hơn 1 triệu khách hàng tin tưởng chúng tôi mỗi năm",
      bg: "bg-gradient-to-br from-primary via-secondary to-accent",
      image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=600&fit=crop",
    },
    {
      title: "Khám phá các tuyến đường phổ biến",
      description: "Tìm kiếm và đặt vé cho các tuyến đường được yêu thích nhất",
      bg: "bg-gradient-to-br from-accent via-secondary to-primary",
      image: "https://png.pngtree.com/png-clipart/20210323/ourlarge/pngtree-global-holiday-picture-rich-travel-combination-png-image_3131622.jpg",

    }

  ]

  passengers = [1, 2, 3, 4, 5, 6]

  promoIndex = 0;
  promoInterval: any;
  promotions = [
    {
      title: "Giảm 20% tất cả tuyến đường",
      description: "Áp dụng trong tháng này",
      image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=1200"
    },
    {
      title: "Tặng nước suối miễn phí",
      description: "Cho tất cả hành khách đặt online",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=1200"
    },
    {
      title: "Giảm thêm 10% khi thanh toán online",
      description: "Duy nhất cuối tuần",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
    },
    // ⭐ ITEM 4
    {
      title: "Mua 1 tặng 1 vé lượt về",
      description: "Áp dụng cho tuyến dài trên 300km",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200"
    },

    // ⭐ ITEM 5
    {
      title: "Hoàn 50% khi hủy vé",
      description: "Chỉ áp dụng khi đặt online",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200"
    },

    // ⭐ ITEM 6
    {
      title: "Ưu đãi nhóm 4 người",
      description: "Giảm 15% tổng hóa đơn",
      image: "https://images.unsplash.com/photo-1456072212654-a0990c8313be?w=1200"
    }
  ];

  promoGroupIndex = 0;
  groupedPromotions: any[][] = [];

  slide = signal(0);

  ngOnInit() {
    setInterval(() => {
      this.slide.update(v => (v + 1) % this.slides.length);
    }, 4000);


    this.promoInterval = setInterval(() => {
      this.promoIndex = (this.promoIndex + 1) % this.promotions.length;
    }, 5000);


    this.groupPromotions();

    this.promoInterval = setInterval(() => {
      this.promoGroupIndex =
        (this.promoGroupIndex + 1) % this.groupedPromotions.length;
    }, 5000);
  }
  groupPromotions() {
    const size = 3;
    for (let i = 0; i < this.promotions.length; i += size) {
      this.groupedPromotions.push(this.promotions.slice(i, i + size));
    }
  }


// Slide index
routeIndex = 0;

popularRoutes = [
  {
    name: "Sài Gòn → Đà Lạt",
    description: "Tuyến du lịch được yêu thích",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
  },
  {
    name: "Sài Gòn → Nha Trang",
    description: "Tuyến biển đẹp nổi tiếng",
    image: "https://images.unsplash.com/photo-1504608245011-62c9f3801f23?w=1200"
  },
  {
    name: "Sài Gòn → Cần Thơ",
    description: "Kết nối miền Tây",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200"
  },
  {
    name: "Đà Lạt → Nha Trang",
    description: "Cung đường biển – rừng tuyệt đẹp",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200"
  },
  {
    name: "Huế → Đà Nẵng",
    description: "Cung đường Hải Vân",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200"
  },
  {
    name: "Hà Nội → Sapa",
    description: "Tuyến du lịch miền Bắc",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200"
  }
];

goToRoute(i: number) {
  this.routeIndex = i;
}


newsIndex = 0;

newsList = [
  {
    image: "assets/images/news1.jpg",
    title: "Futa Bus khai trương tuyến mới",
    short: "Tuyến mới giúp khách hàng di chuyển nhanh hơn và thuận tiện hơn."
  },
  {
    image: "assets/images/news2.jpg",
    title: "Giảm giá đặc biệt dịp Lễ",
    short: "Ưu đãi lên đến 40% cho khách hàng đặt vé online."
  },
  {
    image: "assets/images/news3.jpg",
    title: "Nâng cấp hệ thống đặt vé",
    short: "Giao diện hiện đại, tốc độ nhanh gấp 2 lần."
  },
  {
    image: "assets/images/news4.jpg",
    title: "Thêm nhiều trạm trung chuyển",
    short: "Hỗ trợ khách hàng tại nhiều tỉnh thành hơn."
  },
  {
    image: "assets/images/news5.jpg",
    title: "Tăng cường xe phục vụ Tết",
    short: "Hơn 150 xe chất lượng cao được bổ sung."
  },
  {
    image: "assets/images/news6.jpg",
    title: "Đội ngũ tài xế đạt chứng nhận an toàn",
    short: "Cam kết an toàn là ưu tiên hàng đầu."
  },
];

goToNews(i: number) {
  this.newsIndex = i;
}






  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    if (this.promoInterval) clearInterval(this.promoInterval);
  }

  goToPromo(index: number) {
    this.promoIndex = index;
  }
goToSlide(i: number) {
  this.promoIndex = i;
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
