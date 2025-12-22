import { Routes } from '@angular/router';
import { MainLayout } from '../Page/main/main-layout/main-layout';
import { TrangChuComponent } from '../Page/TrangChu/trang-chu-component/trang-chu-component';
import { TraCuuComponent } from '../Page/TraCuu/tra-cuu-component/tra-cuu-component';
import { LichTrinhComponent } from '../Page/LichTrinh/lich-trinh-component/lich-trinh-component';
import { TinTucComponent } from '../Page/TinTuc/tin-tuc-component/tin-tuc-component';
import { TinTucChiTietComponent } from '../Page/TinTucChiTiet/tin-tuc-chi-tiet-component/tin-tuc-chi-tiet-component';
import { LienHeComponent } from '../Page/LienHe/lien-he-component';
import { DangNhapComponent } from '../Auth/DangNhap/dang-nhap-component/dang-nhap-component';
import { DangKyComponent } from '../Auth/DangKy/dang-ky-component/dang-ky-component';
import { QuenMatKhauComponent } from '../Auth/QuenMatKhau/quen-mat-khau-component/quen-mat-khau-component';
import { LichTrinhChiTietComponent } from '../Page/LichTrinhChiTiet/lich-trinh-chi-tiet-component/lich-trinh-chi-tiet-component';
import { DatVeComponent } from '../Page/DatVe/dat-ve-component/dat-ve-component';
import { VeChungToiComponent } from '../Page/VeChungToi/ve-chung-toi-component/ve-chung-toi-component';
import { ThanhToanComponent } from '../Page/ThanhToan/thanh-toan-component/thanh-toan-component';
import { TrungTamTroGiupComponent } from '../Page/TrungTamTroGiup/trung-tam-tro-giup-component/trung-tam-tro-giup-component';
import { HuongDanMuaVeComponent } from '../Page/HuongDanMuaVe/huong-dan-mua-ve-component/huong-dan-mua-ve-component';
import { ChinhSachDoiTraComponent } from '../Page/ChinhSachDoiTra/chinh-sach-doi-tra-component/chinh-sach-doi-tra-component';
import { CongTuyenDungComponent } from '../Page/CongTuyenDung/cong-tuyen-dung-component/cong-tuyen-dung-component';
import { KhuyenMaiComponent } from '../Page/KhuyenMai/khuyen-mai-component/khuyen-mai-component';


export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: TrangChuComponent },
      { path: 'trang-chu', redirectTo: '', pathMatch: 'full' },
      { path: 'tra-cuu', component: TraCuuComponent },
      { path: 'lich-trinh', component: LichTrinhComponent },
      { path: 'tin-tuc', component: TinTucComponent },
      { path: 'tin-tuc/:id', component: TinTucChiTietComponent },
      { path: 'lien-he', component: LienHeComponent },
      { path: 'dang-nhap', component: DangNhapComponent },
      { path: 'dang-ky', component: DangKyComponent },
      { path: 'quen-mat-khau', component: QuenMatKhauComponent },
      { path: 'lich-trinh-chi-tiet', component: LichTrinhChiTietComponent },
      { path: 'dat-ve', component: DatVeComponent },
      { path: 'thanh-toan', component: ThanhToanComponent },
      { path: 've-chung-toi', component: VeChungToiComponent },
      { path: 'trung-tam-tro-giup', component: TrungTamTroGiupComponent },
      { path: 'huong-dan-mua-ve', component: HuongDanMuaVeComponent },
      { path: 'chinh-sach-doi-tra', component: ChinhSachDoiTraComponent },
      { path: 'cong-tuyen-dung', component: CongTuyenDungComponent },
      { path: 'khuyen-mai', component: KhuyenMaiComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

