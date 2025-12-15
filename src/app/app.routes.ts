import { Routes } from '@angular/router';
import { MainLayout } from '../Page/main/main-layout/main-layout';
import { TrangChuComponent } from '../Page/TrangChu/trang-chu-component/trang-chu-component';
import { TraCuuComponent } from '../Page/TraCuu/tra-cuu-component/tra-cuu-component';
import { LichTrinhComponent } from '../Page/LichTrinh/lich-trinh-component/lich-trinh-component';
import { TinTucComponent } from '../Page/TinTuc/tin-tuc-component/tin-tuc-component';
import { LienHeComponent } from '../Page/LienHe/lien-he-component';
import { DangNhapComponent } from '../Auth/DangNhap/dang-nhap-component/dang-nhap-component';
import { LichTrinhChiTietComponent } from '../Page/LichTrinhChiTiet/lich-trinh-chi-tiet-component/lich-trinh-chi-tiet-component';
import { DatVeComponent } from '../Page/DatVe/dat-ve-component/dat-ve-component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'trang-chu', component: TrangChuComponent },
      { path: 'tra-cuu', component: TraCuuComponent },
      { path: 'lich-trinh', component: LichTrinhComponent },
      { path: 'tin-tuc', component: TinTucComponent },
      { path: 'lien-he', component: LienHeComponent },
      { path: 'dang-nhap', component: DangNhapComponent },
      { path: 'lich-trinh-chi-tiet', component: LichTrinhChiTietComponent },
      { path: 'dat-ve', component: DatVeComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

