# 🌤️ Thời tiết Việt Nam

## 1. Giới thiệu dự án

**Thời tiết Việt Nam** là ứng dụng web giúp người dùng theo dõi thời tiết hiện tại và dự báo thời tiết trong 7 ngày tiếp theo tại 8 thành phố của Việt Nam.

Ứng dụng được xây dựng bằng React và TypeScript, sử dụng Vite để phát triển và chạy dự án. Dữ liệu thời tiết được lấy từ Open-Meteo API.

Giao diện được thiết kế đơn giản, dễ sử dụng và có khả năng thích ứng với nhiều kích thước màn hình khác nhau.

## 2. Chức năng chính

### 2.1. Danh sách thành phố

Ứng dụng cung cấp danh sách 8 thành phố:

- Hà Nội
- Thành phố Hồ Chí Minh
- Đà Nẵng
- Hải Phòng
- Cần Thơ
- Huế
- Nha Trang
- Đà Lạt

Người dùng có thể chọn một thành phố để xem thông tin thời tiết tương ứng. Thành phố đang được chọn sẽ được làm nổi bật trên giao diện.

### 2.2. Thời tiết hiện tại

Sau khi chọn thành phố, ứng dụng hiển thị các thông tin:

- Nhiệt độ hiện tại.
- Mô tả tình trạng thời tiết.
- Độ ẩm không khí.
- Tốc độ gió.
- Thời gian cập nhật dữ liệu.

Các thông tin được trình bày trực quan để người dùng dễ dàng theo dõi.

### 2.3. Dự báo thời tiết 7 ngày

Ứng dụng hiển thị dự báo thời tiết trong 7 ngày, bao gồm:

- Thứ trong tuần.
- Ngày và tháng.
- Biểu tượng thời tiết.
- Mô tả tình trạng thời tiết.
- Nhiệt độ cao nhất.
- Nhiệt độ thấp nhất.

### 2.4. Chuyển đổi đơn vị nhiệt độ

Người dùng có thể chuyển đổi giữa hai đơn vị:

- Độ Celsius (°C).
- Độ Fahrenheit (°F).

Việc chuyển đổi được thực hiện trên dữ liệu đã tải về, không cần gọi lại API chỉ để đổi đơn vị nhiệt độ.

### 2.5. Xử lý trạng thái ứng dụng

Ứng dụng xử lý các trạng thái cơ bản:

- **Chưa chọn thành phố:** Hiển thị hướng dẫn chọn thành phố.
- **Đang tải:** Hiển thị thông báo trong khi lấy dữ liệu thời tiết.
- **Lỗi:** Hiển thị thông báo khi không thể tải dữ liệu và cung cấp nút thử lại.

Những trạng thái này giúp người dùng hiểu tình trạng hoạt động của ứng dụng.

### 2.6. Giao diện responsive

Giao diện được thiết kế để hoạt động trên máy tính, máy tính bảng và điện thoại.

- Màn hình từ 768px trở lên: bố cục chính có hai cột.
- Màn hình dưới 768px: bố cục chuyển thành một cột.
- Các thành phần được điều chỉnh để phù hợp với chiều rộng màn hình.

## 3. Công nghệ sử dụng

| Công nghệ | Vai trò |
|---|---|
| React | Xây dựng giao diện người dùng theo dạng component. |
| TypeScript | Bổ sung kiểu dữ liệu, giúp phát hiện lỗi trong quá trình phát triển. |
| Vite | Khởi tạo, chạy và xây dựng ứng dụng. |
| CSS | Thiết kế giao diện và bố cục responsive. |
| Lucide React | Cung cấp các biểu tượng cho giao diện. |
| Open-Meteo API | Cung cấp dữ liệu thời tiết hiện tại và dự báo. |

## 4. Cấu trúc thư mục

```text
ThoiTietVietNam/
├── public/
├── src/
│   ├── components/
│   │   ├── CityList.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── ForecastList.tsx
│   │   ├── WeatherCard.tsx
│   │   └── WeatherState.tsx
│   ├── data/
│   │   └── cities.ts
│   ├── services/
│   │   └── weatherService.ts
│   ├── types/
│   │   └── weather.ts
│   ├── utils/
│   │   ├── temperature.ts
│   │   └── weatherCode.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Vai trò của các thư mục và file

**`src/components/`**

Chứa các component giao diện:

- `CityList.tsx`: Hiển thị danh sách thành phố và xử lý lựa chọn thành phố.
- `CurrentWeather.tsx`: Hiển thị thông tin thời tiết hiện tại.
- `ForecastList.tsx`: Hiển thị danh sách dự báo thời tiết 7 ngày.
- `WeatherCard.tsx`: Hiển thị dự báo của một ngày.
- `WeatherState.tsx`: Hiển thị trạng thái chưa chọn, đang tải hoặc lỗi.

**`src/data/cities.ts`**

Lưu danh sách thành phố và tọa độ địa lý dùng để lấy dữ liệu thời tiết.

**`src/services/weatherService.ts`**

Chứa chức năng gọi Open-Meteo API, nhận dữ liệu và xử lý lỗi khi yêu cầu không thành công.

**`src/types/weather.ts`**

Khai báo các kiểu dữ liệu TypeScript dùng trong ứng dụng, bao gồm dữ liệu thời tiết hiện tại, dự báo theo ngày và đơn vị nhiệt độ.

**`src/utils/temperature.ts`**

Chứa các hàm xử lý và định dạng nhiệt độ theo đơn vị Celsius hoặc Fahrenheit.

**`src/utils/weatherCode.ts`**

Chuyển mã thời tiết do API cung cấp thành mô tả và biểu tượng phù hợp để hiển thị.

**`src/App.tsx`**

Là component chính, quản lý thành phố được chọn, dữ liệu thời tiết, trạng thái tải, lỗi và đơn vị nhiệt độ.

**`src/App.css`**

Chứa các quy tắc CSS dành cho bố cục và các thành phần chính của ứng dụng.

**`src/index.css`**

Chứa các thiết lập CSS chung cho toàn bộ trang web.

**`src/main.tsx`**

Là điểm khởi chạy của ứng dụng React.

## 5. Nguồn dữ liệu thời tiết

Ứng dụng sử dụng Open-Meteo API để lấy dữ liệu thời tiết theo tọa độ địa lý của từng thành phố.

Trang chủ dịch vụ: https://open-meteo.com/

API dự báo: https://api.open-meteo.com/v1/forecast

Dữ liệu được sử dụng bao gồm:

- Nhiệt độ hiện tại.
- Độ ẩm tương đối.
- Tốc độ gió.
- Mã mô tả thời tiết.
- Nhiệt độ cao nhất và thấp nhất theo ngày.
- Dữ liệu dự báo trong 7 ngày.

Ứng dụng sử dụng tọa độ được khai báo trong `src/data/cities.ts` để xác định vị trí cần lấy dữ liệu.

**Lưu ý:** Ứng dụng cần kết nối Internet để lấy dữ liệu thời tiết từ API.

## 6. Cài đặt và chạy dự án

### 6.1. Yêu cầu

Máy tính cần cài đặt:

- Node.js.
- npm.
- Visual Studio Code hoặc một trình soạn thảo mã nguồn tương đương.

### 6.2. Cài đặt thư viện

Mở Terminal tại thư mục gốc của dự án và chạy:

```bash
npm install
```

Cài đặt Lucide React nếu dự án chưa có thư viện này:

```bash
npm install lucide-react
```

### 6.3. Khởi chạy ứng dụng

Chạy lệnh:

```bash
npm run dev
```

Sau khi Vite khởi động thành công, Terminal sẽ hiển thị địa chỉ localhost. Mở địa chỉ đó trên trình duyệt để sử dụng ứng dụng.

Địa chỉ thường có dạng:

```text
http://localhost:5173/
```

Cổng có thể thay đổi nếu cổng mặc định đang được sử dụng.

### 6.4. Xây dựng phiên bản production

Để kiểm tra và xây dựng ứng dụng, chạy:

```bash
npm run build
```

Nếu quá trình thành công, Vite sẽ tạo thư mục `dist/` chứa các tệp đã được xây dựng.

Có thể chạy thử phiên bản production bằng lệnh:

```bash
npm run preview
```

## 7. Hướng dẫn sử dụng

1. Mở ứng dụng trên trình duyệt.
2. Chọn một thành phố trong danh sách ở bên trái trên màn hình lớn hoặc phía trên khu vực thời tiết trên màn hình nhỏ.
3. Chờ ứng dụng tải dữ liệu.
4. Xem nhiệt độ, độ ẩm, tốc độ gió và mô tả thời tiết hiện tại.
5. Theo dõi dự báo nhiệt độ cao nhất và thấp nhất trong 7 ngày.
6. Sử dụng nút °C hoặc °F để chuyển đổi đơn vị nhiệt độ.
7. Nếu xảy ra lỗi tải dữ liệu, kiểm tra kết nối Internet và nhấn nút **Thử lại**.

## 8. Xử lý lỗi

Một số tình huống có thể xảy ra trong quá trình sử dụng:

| Tình huống | Cách xử lý |
|---|---|
| Không có kết nối Internet | Kiểm tra lại kết nối và thử tải dữ liệu lần nữa. |
| API không phản hồi | Chờ một lúc rồi nhấn nút Thử lại. |
| Dữ liệu không hợp lệ | Ứng dụng hiển thị thông báo lỗi thay vì tiếp tục hiển thị dữ liệu không đầy đủ. |
| Chưa chọn thành phố | Chọn một thành phố trong danh sách. |

## 9. Hướng phát triển

Trong tương lai, ứng dụng có thể được mở rộng với các chức năng:

- Tìm kiếm thành phố theo tên.
- Hiển thị biểu đồ nhiệt độ.
- Lưu thành phố yêu thích.
- Bổ sung thông tin về lượng mưa và chỉ số UV.
- Cải thiện giao diện và hiệu ứng chuyển động.
- Hỗ trợ nhiều ngôn ngữ.

## 10. Kết luận

Dự án Thời tiết Việt Nam giúp người dùng theo dõi thông tin thời tiết tại 8 thành phố thông qua một giao diện trực quan, dễ sử dụng.

Thông qua quá trình xây dựng ứng dụng, người phát triển có thể thực hành React, TypeScript, quản lý trạng thái, chia nhỏ giao diện thành component, gọi API và thiết kế responsive bằng CSS.

Dự án cũng là cơ hội để rèn luyện cách tổ chức mã nguồn thành các thư mục riêng biệt, giúp việc đọc, bảo trì và mở rộng ứng dụng thuận tiện hơn.
