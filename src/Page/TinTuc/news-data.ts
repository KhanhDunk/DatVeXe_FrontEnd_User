export interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  content: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: 'DŨNG CÚC AUTO – Cập nhật lịch trình tuyến cố định',
    description: 'Thông tin lịch trình và khung giờ hoạt động được cập nhật để phục vụ khách hàng tốt hơn.',
    image: 'Assets/images/anhxe1.jpg',
    date: '2025-12-09',
    content:
      'DŨNG CÚC AUTO cập nhật lịch trình các tuyến cố định nhằm tối ưu trải nghiệm hành khách. ' +
      'Quý khách vui lòng tra cứu lịch trình theo ngày đi và tuyến để chọn chuyến phù hợp.\n\n' +
      'Khuyến nghị: đến điểm đón sớm trước giờ khởi hành và chuẩn bị mã vé/QR (nếu có) để lên xe nhanh chóng.'
  },
  {
    id: 2,
    title: 'Hướng dẫn tra cứu vé nhanh',
    description: 'Tra cứu vé theo thông tin đặt chỗ, giúp bạn kiểm tra trạng thái và hành trình dễ dàng.',
    image: 'Assets/images/anhxe2.jpg',
    date: '2025-12-08',
    content:
      'Bạn có thể tra cứu vé ngay trên website bằng các thông tin đã dùng khi đặt vé. ' +
      'Nếu gặp khó khăn, vui lòng liên hệ trang Liên hệ để được hỗ trợ.\n\n' +
      'Lưu ý: giữ lại thông tin đặt vé để tra cứu nhanh và chính xác.'
  },
  {
    id: 3,
    title: 'Nhắc nhở hành khách về giờ có mặt tại điểm đón',
    description: 'Vui lòng có mặt sớm để hoàn tất thủ tục và tránh lỡ chuyến.',
    image: 'Assets/images/anhxe3.jpg',
    date: '2025-12-07',
    content:
      'Để đảm bảo hành trình đúng giờ, quý khách vui lòng có mặt tại điểm đón sớm. ' +
      'Nhân viên/phụ xe sẽ hỗ trợ sắp xếp hành lý và hướng dẫn lên xe.\n\n' +
      'Trong trường hợp thay đổi kế hoạch, hãy tham khảo Chính sách đổi trả trước khi gửi yêu cầu.'
  },
  {
    id: 4,
    title: 'Cam kết chất lượng phục vụ',
    description: 'DŨNG CÚC AUTO luôn ưu tiên an toàn – uy tín – trải nghiệm khách hàng.',
    image: 'Assets/images/anhxe1.jpg',
    date: '2025-12-06',
    content:
      'Chúng tôi không ngừng nâng cấp chất lượng xe và quy trình vận hành để mỗi chuyến đi an tâm hơn. ' +
      'Đội ngũ tài xế nhiều kinh nghiệm, xe được bảo dưỡng định kỳ.\n\n' +
      'Mọi phản hồi của quý khách là động lực để DŨNG CÚC AUTO cải thiện mỗi ngày.'
  },
  {
    id: 5,
    title: 'Thông báo về hành lý khi đi xe',
    description: 'Một số lưu ý về hành lý để chuyến đi thuận tiện và an toàn.',
    image: 'Assets/images/anhxe2.jpg',
    date: '2025-12-05',
    content:
      'Quý khách nên sắp xếp hành lý gọn gàng, ghi chú các vật dụng quan trọng. ' +
      'Đối với hành lý cồng kềnh, vui lòng trao đổi trước để được hỗ trợ.\n\n' +
      'Vật dụng giá trị nên tự bảo quản trong suốt hành trình.'
  },
  {
    id: 6,
    title: 'Ưu đãi theo thời điểm (đang cập nhật)',
    description: 'Theo dõi mục Khuyến mãi để nhận ưu đãi mới nhất theo từng tuyến và thời điểm.',
    image: 'Assets/images/anhxe3.jpg',
    date: '2025-12-04',
    content:
      'Các chương trình ưu đãi (nếu có) sẽ được cập nhật theo từng giai đoạn. ' +
      'Quý khách có thể theo dõi website để không bỏ lỡ ưu đãi.\n\n' +
      'Mọi thông tin chi tiết sẽ được thông báo công khai và minh bạch.'
  },
  {
    id: 7,
    title: 'Quy trình lên xe gọn gàng',
    description: 'Hướng dẫn nhanh giúp lên xe thuận tiện và đảm bảo trật tự.',
    image: 'Assets/images/anhxe2.jpg',
    date: '2025-12-03',
    content:
      'Khi đến điểm đón, quý khách vui lòng chuẩn bị thông tin/mã vé. ' +
      'Nhân viên sẽ hỗ trợ xác nhận và hướng dẫn vị trí ghế (nếu áp dụng).\n\n' +
      'Quý khách tuân thủ hướng dẫn để đảm bảo an toàn và đúng giờ khởi hành.'
  },
  {
    id: 8,
    title: 'Giá vé minh bạch – không phát sinh',
    description: 'Chính sách giá rõ ràng, thông tin hiển thị trước khi thanh toán.',
    image: 'Assets/images/anhxe1.jpg',
    date: '2025-12-02',
    content:
      'DŨNG CÚC AUTO hướng đến trải nghiệm đặt vé minh bạch, hiển thị rõ thông tin trước khi thanh toán. ' +
      'Nếu có thay đổi (phí/điều kiện), hệ thống sẽ thông báo trước khi xác nhận.\n\n' +
      'Quý khách có thể liên hệ CSKH để được giải đáp chi tiết.'
  },
  {
    id: 9,
    title: 'Dịch vụ phù hợp nhiều đối tượng',
    description: 'Đi công tác – du lịch – thăm người thân đều thuận tiện.',
    image: 'Assets/images/anhxe3.jpg',
    date: '2025-12-01',
    content:
      'Chúng tôi phục vụ đa dạng nhu cầu di chuyển: công tác, du lịch, thăm người thân. ' +
      'Xe được vệ sinh thường xuyên, đảm bảo hành trình thoải mái.\n\n' +
      'Hãy tra cứu tuyến và lựa chọn chuyến phù hợp với lịch của bạn.'
  },
  {
    id: 10,
    title: 'Cảm ơn phản hồi từ khách hàng',
    description: 'Mọi góp ý đều giúp DŨNG CÚC AUTO hoàn thiện dịch vụ.',
    image: 'Assets/images/anhxe1.jpg',
    date: '2025-11-30',
    content:
      'Cảm ơn quý khách đã tin tưởng DŨNG CÚC AUTO. ' +
      'Chúng tôi luôn lắng nghe phản hồi để cải thiện chất lượng phục vụ.\n\n' +
      'Bạn có thể gửi góp ý tại trang Liên hệ, chúng tôi sẽ phản hồi trong thời gian sớm nhất.'
  },
];
