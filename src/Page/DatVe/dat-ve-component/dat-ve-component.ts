import { Component, ElementRef, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import type * as Leaflet from 'leaflet';

type SeatStatus = 'sold' | 'available' | 'selected';

interface Seat {
  code: string;
  status: SeatStatus;
}

type SeatCell = Seat | null;

interface SeatDeck {
  name: string;
  seats: Seat[];
  rows: SeatCell[][];
}

@Component({
  selector: 'app-dat-ve-component',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass],
  templateUrl: './dat-ve-component.html',
  styleUrls: ['./dat-ve-component.scss'],
})
export class DatVeComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly seatRowTemplate: (number | null)[][] = [
    [1, null, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17]
  ];

  readonly seatDecks: SeatDeck[] = [
    this.createDeck('Tầng dưới', 'A', ['A01', 'A02', 'A04', 'A07', 'A10', 'A15']),
    this.createDeck('Tầng trên', 'B', ['B03', 'B04', 'B06', 'B14'], ['B12', 'B15'])
  ];

  booking = {
    fullName: '',
    phone: '',
    email: '',
    accept: false,
    pickupMode: 'station',
    dropoffMode: 'station',
    pickupLocation: 'TP.HCM',
    dropoffLocation: 'Bến Xe Hà Nội'
  };

  pickupCustomLocation = '';
  dropoffCustomLocation = '';
  mapModal = {
    visible: false,
    type: null as 'pickup' | 'dropoff' | null,
    query: '',
    loading: false,
    error: ''
  };
  readonly defaultMapCenter = { lat: 10.8231, lng: 106.6297 };

  @ViewChild('mapCanvas') mapCanvas?: ElementRef<HTMLDivElement>;

  private mapInstance?: Leaflet.Map;
  private mapMarker?: Leaflet.Marker;
  private mapSearchTimer: ReturnType<typeof setTimeout> | null = null;
  private mapSearchAbort?: AbortController;
  private readonly searchCache = new Map<string, { lat: number; lng: number; label: string }>();
  pendingLocation: { label: string; lat: number; lng: number } | null = null;
  private leafletModule: typeof Leaflet | null = null;

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  readonly pickupLocations = ['TP.HCM'];
  readonly dropoffLocations = ['Bến Xe Hà Nội', 'Bến Xe Cà Mau', 'Bến Xe Trà Vinh', 'Bến Xe Vũng Tàu'];

  readonly tripInfo = {
    route: 'TP.HCM → Bến Xe Hà Nội',
    departTime: 'Đang cập nhật',
    pickupDeadline: 'Đang cập nhật',
    baseFare: 350000,
    hotline: '0931172385'
  };

  thongBao = '';
  isSuccess = false;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const diemDi = (params.get('diemDi') ?? '').trim();
      const diemDen = (params.get('diemDen') ?? '').trim();
      const thoiGian = (params.get('thoiGian') ?? '').trim();

      const fareRaw = (params.get('gia') ?? params.get('baseFare') ?? '').toString();
      const fareNumber = Number(fareRaw.replace(/[^0-9]/g, ''));

      if (diemDi && diemDen) {
        this.tripInfo.route = `${diemDi} → ${diemDen}`;
        this.booking.pickupLocation = diemDi;
        this.booking.dropoffLocation = diemDen;
      }

      if (thoiGian) {
        this.tripInfo.departTime = thoiGian;
      }

      if (Number.isFinite(fareNumber) && fareNumber > 0) {
        this.tripInfo.baseFare = fareNumber;
      }
    });
  }

  toggleSeat(seat: Seat): void {
    if (seat.status === 'sold') {
      return;
    }
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  }

  get selectedSeats(): string[] {
    return this.seatDecks.flatMap((deck) =>
      deck.seats.filter((seat) => seat.status === 'selected').map((seat) => seat.code)
    );
  }

  get seatCount(): number {
    return this.selectedSeats.length;
  }

  get seatLabel(): string {
    return this.seatCount ? this.selectedSeats.join(', ') : 'Chưa chọn';
  }

  get totalAmount(): number {
    return this.seatCount * this.tripInfo.baseFare;
  }

  datVe(): void {
    if (!this.seatCount) {
      this.setMessage('⚠️ Vui lòng chọn ít nhất 1 ghế.');
      return;
    }
    if (!this.booking.fullName || !this.booking.phone || !this.booking.email) {
      this.setMessage('⚠️ Vui lòng nhập đủ họ tên, số điện thoại và email.');
      return;
    }
    if (!this.isValidPhone(this.booking.phone)) {
      this.setMessage('⚠️ Số điện thoại chưa đúng định dạng.');
      return;
    }
    if (!this.booking.accept) {
      this.setMessage('⚠️ Bạn cần chấp nhận điều khoản trước khi thanh toán.');
      return;
    }
    this.thongBao = '';
    const paymentPayload = {
      booking: { ...this.booking },
      selectedSeats: [...this.selectedSeats],
      totalAmount: this.totalAmount,
      tripInfo: {
        ...this.tripInfo,
        pickup: this.booking.pickupLocation,
        dropoff: this.booking.dropoffLocation
      }
    };
    this.router.navigate(['/thanh-toan'], { state: paymentPayload });
  }

  clearPickupLocation(): void {
    this.booking.pickupLocation = '';
  }

  clearDropoffLocation(): void {
    this.booking.dropoffLocation = '';
  }

  openMap(type: 'pickup' | 'dropoff'): void {
    const seed = type === 'pickup'
      ? this.pickupCustomLocation || this.booking.pickupLocation
      : this.dropoffCustomLocation || this.booking.dropoffLocation;
    this.mapModal.visible = true;
    this.mapModal.type = type;
    this.mapModal.query = seed || '';
    this.mapModal.error = '';
    this.mapModal.loading = false;
    this.pendingLocation = null;
    this.destroyMap();
    setTimeout(() => {
      void this.prepareMap();
    });
  }

  private async prepareMap(): Promise<void> {
    if (!this.mapModal.visible) {
      return;
    }
    if (!this.mapCanvas?.nativeElement) {
      requestAnimationFrame(() => {
        void this.prepareMap();
      });
      return;
    }
    await this.initializeMap();
    if (!this.mapModal.visible) {
      return;
    }
    if (this.mapModal.query.trim()) {
      void this.performSearch(this.mapModal.query.trim());
    } else {
      void this.centerDefault();
    }
  }

  scheduleSearch(immediate = false): void {
    if (this.mapSearchTimer) {
      clearTimeout(this.mapSearchTimer);
      this.mapSearchTimer = null;
    }
    const trimmed = this.mapModal.query.trim();
    if (!trimmed) {
      this.mapModal.error = '';
      this.pendingLocation = null;
      this.mapSearchAbort?.abort();
      this.mapSearchAbort = undefined;
      this.mapModal.loading = false;
      return;
    }
    if (trimmed.length < 3) {
      this.mapModal.error = 'Nhập tối thiểu 3 ký tự để tìm kiếm.';
      this.pendingLocation = null;
      return;
    }
    if (immediate) {
      void this.performSearch(trimmed);
      return;
    }
    this.mapSearchTimer = setTimeout(() => {
      void this.performSearch(trimmed);
      this.mapSearchTimer = null;
    }, 450);
  }

  saveMapSelection(): void {
    if (!this.pendingLocation || !this.mapModal.type) {
      this.mapModal.error = 'Vui lòng chọn vị trí trực tiếp trên bản đồ.';
      return;
    }
    const label = this.pendingLocation.label.trim();
    if (this.mapModal.type === 'pickup') {
      this.pickupCustomLocation = label;
    } else {
      this.dropoffCustomLocation = label;
    }
    this.closeMapModal();
  }

  closeMapModal(): void {
    if (this.mapSearchTimer) {
      clearTimeout(this.mapSearchTimer);
      this.mapSearchTimer = null;
    }
    if (this.mapSearchAbort) {
      this.mapSearchAbort.abort();
      this.mapSearchAbort = undefined;
    }
    this.mapModal.visible = false;
    this.mapModal.type = null;
    this.mapModal.query = '';
    this.mapModal.error = '';
    this.mapModal.loading = false;
    this.pendingLocation = null;
    this.destroyMap();
  }

  formatCurrency(value: number): string {
    return value ? value.toLocaleString('vi-VN') + 'đ' : '0đ';
  }

  private setMessage(message: string): void {
    this.isSuccess = false;
    this.thongBao = message;
  }

  private isValidPhone(phone: string): boolean {
    return /^(0|\+84)\d{9}$/.test(phone);
  }

  private async performSearch(query: string): Promise<void> {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 3 || !(await this.ensureMapReady())) {
      return;
    }
    const normalized = trimmed.toLowerCase();
    const cached = this.searchCache.get(normalized);
    if (cached) {
      await this.updateMarker(cached.lat, cached.lng, cached.label);
      this.mapModal.error = '';
      return;
    }
    this.mapSearchAbort?.abort();
    const controller = new AbortController();
    this.mapSearchAbort = controller;
    this.mapModal.loading = true;
    this.mapModal.error = '';
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmed)}&limit=1`, {
        signal: controller.signal,
        headers: { 'Accept-Language': 'vi,en' }
      });
      if (!response.ok) {
        throw new Error('search_failed');
      }
      const results = await response.json() as Array<{ display_name: string; lat: string; lon: string }>;
      if (results.length) {
        const { lat, lon, display_name } = results[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);
        await this.updateMarker(latNum, lonNum, display_name);
        this.searchCache.set(normalized, { lat: latNum, lng: lonNum, label: display_name });
        if (this.searchCache.size > 25) {

          const iterator = this.searchCache.keys().next();
          if (!iterator.done) {
            this.searchCache.delete(iterator.value);
          }

        }
      } else {
        this.mapModal.error = 'Không tìm thấy vị trí phù hợp.';
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      console.error('search_location_error', error);
      this.mapModal.error = 'Không thể tải bản đồ. Vui lòng thử lại.';
    } finally {
      if (this.mapSearchAbort === controller) {
        this.mapModal.loading = false;
        this.mapSearchAbort = undefined;
      }
    }
  }

  private async initializeMap(): Promise<void> {
    if (!this.isBrowser || !this.mapCanvas?.nativeElement) {
      return;
    }
    if (this.mapInstance) {
      setTimeout(() => this.mapInstance?.invalidateSize(), 0);
      return;
    }
    const Leaflet = await this.loadLeaflet();
    if (!Leaflet) {
      return;
    }
    this.mapInstance = Leaflet.map(this.mapCanvas.nativeElement, {
      center: [this.defaultMapCenter.lat, this.defaultMapCenter.lng],
      zoom: 12,
      zoomControl: true
    });
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.mapInstance);
    this.mapInstance.on('click', (event: Leaflet.LeafletMouseEvent) => {
      void this.handleMapClick(event);
    });
  }

  private async handleMapClick(event: Leaflet.LeafletMouseEvent): Promise<void> {
    const { lat, lng } = event.latlng;
    await this.updateMarker(lat, lng);
    await this.reverseGeocode(lat, lng);
  }

  private async updateMarker(lat: number, lng: number, label?: string, persist = true): Promise<void> {
    if (!(await this.ensureMapReady())) {
      return;
    }
    const Leaflet = await this.loadLeaflet();
    if (!Leaflet || !this.mapInstance) {
      return;
    }
    if (!this.mapMarker) {
      this.mapMarker = Leaflet.marker([lat, lng]).addTo(this.mapInstance);
    } else {
      this.mapMarker.setLatLng([lat, lng]);
    }
    this.mapInstance.setView([lat, lng], 15);
    if (persist) {
      const finalLabel = label || this.mapModal.query || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      this.pendingLocation = { label: finalLabel, lat, lng };
      if (label) {
        this.mapModal.query = label;
      }
    }
  }

  private async reverseGeocode(lat: number, lng: number): Promise<void> {
    this.mapModal.loading = true;
    this.mapModal.error = '';
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      if (!response.ok) {
        throw new Error('reverse_failed');
      }
      const data = await response.json() as { display_name?: string };
      const label = data?.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      this.mapModal.query = label;
      this.pendingLocation = { label, lat, lng };
    } catch (error) {
      console.error('reverse_geocode_error', error);
      const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      this.pendingLocation = { label: fallback, lat, lng };
    } finally {
      this.mapModal.loading = false;
    }
  }

  private async centerDefault(): Promise<void> {
    await this.updateMarker(this.defaultMapCenter.lat, this.defaultMapCenter.lng, undefined, false);
    this.pendingLocation = null;
    this.mapModal.query = '';
  }

  private destroyMap(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = undefined;
      this.mapMarker = undefined;
    }
  }

  private async loadLeaflet(): Promise<typeof Leaflet | null> {
    if (!this.isBrowser) {
      return null;
    }
    if (this.leafletModule) {
      return this.leafletModule;
    }
    const module = await import('leaflet');
    const resolved = (module.default ?? module) as typeof Leaflet;
    this.leafletModule = resolved;
    return resolved;
  }

  private async ensureMapReady(): Promise<boolean> {
    if (!this.isBrowser) {
      return false;
    }
    await this.initializeMap();
    return !!this.mapInstance;
  }

  ngOnDestroy(): void {
    if (this.mapSearchTimer) {
      clearTimeout(this.mapSearchTimer);
      this.mapSearchTimer = null;
    }
    if (this.mapSearchAbort) {
      this.mapSearchAbort.abort();
      this.mapSearchAbort = undefined;
    }
    this.destroyMap();
  }

  private createDeck(name: string, prefix: string, sold: string[] = [], selected: string[] = []): SeatDeck {
    const seats: Seat[] = [];
    const rows = this.seatRowTemplate.map((row) =>
      row.map((cell) => {
        if (cell === null) {
          return null;
        }
        const code = `${prefix}${cell.toString().padStart(2, '0')}`;
        const seat: Seat = {
          code,
          status: sold.includes(code)
            ? 'sold'
            : selected.includes(code)
              ? 'selected'
              : 'available'
        };
        seats.push(seat);
        return seat;
      })
    );
    return { name, seats, rows };
  }
}
