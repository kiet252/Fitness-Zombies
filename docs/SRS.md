# Software Requirements Specification (Agile SRS)

## Project: Zombie Runner - Fitness Survival App
* **Version:** 1.0  
* **Target OS:** Android 10+ (MVP Baseline)  
* **Architecture:** React Native (Frontend) + Spring Boot (Backend) + Supabase (PostgreSQL Database)

---

## 1. Giới thiệu

### 1.1 Mục đích
Xây dựng ứng dụng di động trên nền tảng Android sử dụng React Native nhằm hỗ trợ theo dõi hoạt động chạy bộ, đi bộ, tích hợp sâu các yếu tố trò chơi hóa (Gamification) sinh tồn nhằm tăng động lực và duy trì thói quen rèn luyện sức khỏe của người dùng.

**Ứng dụng cung cấp các khả năng cốt lõi:**
* Theo dõi bước chân theo thời gian thực.
* Đo đạc quãng đường chạy và tính toán lượng calo tiêu thụ.
* Hiển thị bản đồ trực quan hành trình di chuyển qua GPS.
* Chế độ rượt đuổi kịch tính (Zombie Chase Mode) dựa trên tốc độ di chuyển thực tế.
* Quy đổi thành tựu thể thao thành tài nguyên ảo (Gỗ, Đá, Thức ăn).
* Xây dựng và nâng cấp hệ thống căn cứ trú ẩn (Base Building).

### 1.2 Phạm vi hệ thống (MVP - Minimum Viable Product)
Để tập trung tối ưu hóa các tính năng cốt lõi trong giai đoạn đầu, hệ thống chỉ hỗ trợ giới hạn phạm vi:
* **Hệ điều hành:** Thiết bị Android (Chưa hỗ trợ iOS ở giai đoạn MVP).
* **Môi trường hoạt động:** Chạy ngoài trời (Yêu cầu nhận diện tín hiệu GPS định vị).
* **Chế độ chơi:** Đơn nhiệm (Single Player), chưa hỗ trợ tính năng kết nối nhiều người chơi (Multiplayer).
* **Hệ thống dữ liệu:** Toàn bộ dữ liệu người dùng, lịch sử chạy và tài nguyên được đồng bộ về máy chủ cơ sở dữ liệu Supabase PostgreSQL thông qua REST API của Spring Boot.

### 1.3 Đối tượng sử dụng mục tiêu
* **Sinh viên:** Có nhu cầu rèn luyện sức khỏe, yêu thích công nghệ và các trò chơi điện tử dạng sinh tồn.
* **Người mới bắt đầu tập chạy (Beginners):** Cần các yếu tố giải trí kích thích tính kỷ luật nhằm phá bỏ sự nhàm chán khi chạy bộ truyền thống.

---

## 2. Product Vision

> **Vision Statement:** > *"Biến mỗi buổi chạy bộ thông thường thành một nhiệm vụ sinh tồn đầy kịch tính, giúp người dùng duy trì thói quen vận động lâu dài thông qua cơ chế trò chơi hóa nhập vai trực quan."*

---

## 3. Product Backlog (Agile User Stories)

### Epic 1 - Authentication & User Management
* **US01: Đăng ký tài khoản mới**
    * *Là một người dùng mới*, tôi muốn đăng ký tài khoản bằng Email và Mật khẩu cá nhân để lưu giữ tiến trình của mình.
    * **Acceptance Criteria:**
        * Hệ thống cho phép đăng ký bằng Email hợp lệ và cấu hình mật khẩu an toàn.
        * Tự động kiểm tra tính hợp lệ dữ liệu nhập (Validation) trước khi gửi yêu cầu (ví dụ: định dạng email đúng, mật khẩu tối thiểu 6 ký tự).
* **US02: Đăng nhập hệ thống**
    * *Là một người dùng đã có tài khoản*, tôi muốn đăng nhập để truy cập lại hồ sơ, tài nguyên và căn cứ của mình.
    * **Acceptance Criteria:**
        * Đăng nhập thành công với thông tin khớp trong hệ thống, chuyển hướng trực tiếp vào màn hình chính (Home).
        * Hiển thị thông báo lỗi rõ ràng nếu nhập sai email hoặc mật khẩu, không làm treo ứng dụng.

### Epic 2 - Fitness Tracking (Hệ thống Theo dõi Thể chất)
* **US03: Đếm bước chân hằng ngày**
    * *Là một người dùng*, tôi muốn ứng dụng theo dõi chính xác số bước chân di chuyển trong ngày để nắm rõ cường độ vận động.
    * **Acceptance Criteria:**
        * Số bước chân được hiển thị theo thời gian thực trên giao diện chính nhờ cảm biến chuyển động phần cứng (Step Counter Sensor).
        * Hệ thống tự động thiết lập và thiết lập lại (Reset) chỉ số đếm về `0` vào lúc 00:00 mỗi ngày.
* **US04: Định vị hành trình thời gian thực (GPS)**
    * *Là một người dùng chạy bộ*, tôi muốn ứng dụng kích hoạt định vị GPS để theo dõi chính xác tuyến đường tôi đang đi.
    * **Acceptance Criteria:**
        * Ứng dụng yêu cầu quyền truy cập vị trí và hiển thị điểm định vị hiện tại của người dùng.
        * Bản đồ (Google Maps API) tự động vẽ và cập nhật liên tục đường chạy dạng Polyline khi người dùng di chuyển.
* **US05: Đo lường quãng đường di chuyển**
    * *Là một người dùng*, tôi muốn biết tổng chiều dài quãng đường mình đã vượt qua sau khi kết thúc buổi tập.
    * **Acceptance Criteria:**
        * Hiển thị thông số khoảng cách theo đơn vị mét (m) hoặc kilomet (km).
        * Đảm bảo độ chính xác tính toán khoảng cách từ dữ liệu tọa độ GPS với mức độ sai số không vượt quá 10%.
* **US06: Tính toán Calo tiêu thụ**
    * *Là một người dùng*, tôi muốn biết lượng năng lượng tiêu hao sau buổi chạy để kiểm soát cân nặng.
    * **Acceptance Criteria:**
        * Tự động tính và hiển thị lượng calo tiêu thụ dựa trên công thức phối hợp giữa thời gian chạy, tốc độ trung bình và số bước chân.

### Epic 3 - Zombie Mode (Chế độ Thách thức Sinh tồn)
* **US07: Kích hoạt chế độ Zombie Chase**
    * *Là một người chạy bộ cần thử thách*, tôi muốn bật chế độ Zombie để trải nghiệm trò chơi rượt đuổi kịch tính.
    * **Acceptance Criteria:**
        * Giao diện trang chủ có nút kích hoạt trạng thái "Start Zombie Mode".
        * Khi nhấn, màn hình chuyển sang giao diện chuyên dụng có âm thanh nền, hiệu ứng cảnh báo và hiển thị đồ họa biểu thị thực thể Zombie đang bám đuổi.
* **US08: Hệ thống phân tích tốc độ sinh tồn**
    * *Là một người sống sót trong game*, tôi muốn hệ thống đánh giá an toàn dựa trên tốc độ thực tế của tôi.
    * **Acceptance Criteria:**
        * Hệ thống liên tục lấy vận tốc tức thời từ GPS.
        * **Nếu tốc độ $\ge$ 7 km/h:** Người dùng giữ khoảng cách an toàn (Trạng thái: **Safe**).
        * **Nếu tốc độ < 7 km/h:** Zombie sẽ tiến gần lại người dùng theo thời gian thực kèm cảnh báo âm thanh dồn dập (Trạng thái: **Danger**).
* **US09: Trạng thái thất bại khi bị Zombie bắt**
    * *Là một người chơi*, tôi muốn biết kết quả khi không duy trì đủ tốc độ an toàn để thực hiện lại lượt chạy mới.
    * **Acceptance Criteria:**
        * Nếu khoảng cách của Zombie trên giao diện giảm về 0, buổi chạy kết thúc tức thì.
        * Màn hình hiển thị giao diện thông báo thất bại: **"You are caught!"** kèm bảng thống kê chỉ số đã đạt được và nút "Chơi lại" (Retry).

### Epic 4 - Resource System (Hệ thống Tài nguyên)
* **US10: Cơ chế quy đổi tài nguyên từ vận động**
    * *Là một người chơi*, tôi muốn công sức chạy bộ được chuyển hóa thành vật phẩm xây dựng.
    * **Acceptance Criteria:**
        * Sau khi lưu phiên chạy thành công, hệ thống tự động cộng dồn vật phẩm vào kho.
        * Công thức tính toán: $\text{Tài nguyên} = \lfloor \text{Số bước chân} \times \text{Trọng số} \rfloor$. Trong đó trọng số (Weight) cấu hình linh hoạt từ Admin (Ví dụ: 100m đổi 10 Gỗ, hoặc phân bổ ngẫu nhiên 5 Gỗ + 5 Đá).
* **US11: Quản lý kho tài nguyên cá nhân**
    * *Là một người chơi*, tôi muốn xem số lượng vật phẩm mình đang sở hữu để lên kế hoạch nâng cấp căn cứ.
    * **Acceptance Criteria:**
        * Giao diện Kho đồ (Inventory) hiển thị rõ ràng, tách biệt 3 loại tài nguyên cốt lõi bao gồm: **Gỗ (Wood)**, **Đá (Stone)**, và **Lương thực (Food)**.

### Epic 5 - Base Building (Xây dựng Căn cứ)
* **US12: Xây dựng công trình trú ẩn**
    * *Là một người sống sót*, tôi muốn tiêu hao tài nguyên thu thập được để xây dựng nhà ở trong căn cứ.
    * **Acceptance Criteria:**
        * Kiểm tra số lượng tài nguyên hiện có trong kho. Nếu đủ số lượng Wood/Stone yêu cầu, nút "Xây dựng" kích hoạt thành công, trừ tài nguyên tương ứng và cập nhật đồ họa công trình.
* **US13: Nâng cấp tổng thể Căn cứ**
    * *Là một người chơi*, tôi muốn nâng cấp cấp độ tổng thể của căn cứ để mở khóa các tính năng mới sau này.
    * **Acceptance Criteria:**
        * Khi hoàn thành xây dựng đủ số lượng công trình tối thiểu theo điều kiện, Cấp độ căn cứ (Base Level) tăng lên, hiển thị thông báo chúc mừng người dùng.

---

## 4. Functional Requirements (Yêu cầu chức năng)

| ID | Tên chức năng | Mô tả chi tiết chức năng |
| :--- | :--- | :--- |
| **FR01** | Đăng nhập | Xác thực tài khoản người dùng thông qua Spring Boot API để vào hệ thống. |
| **FR02** | Đăng ký | Khởi tạo tài khoản mới, đồng bộ hóa schema dữ liệu lên PostgreSQL. |
| **FR03** | Đếm bước chân | Giao tiếp với cảm biến phần cứng Android tích hợp để ghi nhận chỉ số bước. |
| **FR04** | Theo dõi GPS | Thu thập tọa độ địa lý Vĩ độ (Latitude) và Kinh độ (Longitude) của thiết bị liên tục. |
| **FR05** | Hiển thị Google Maps | Nhúng bản đồ động lên UI, hiển thị marker vị trí và kẻ tuyến đường chạy thực tế. |
| **FR06** | Đo tốc độ tức thời | Tính toán vận tốc di chuyển hiện tại dựa trên biến thiên vị trí định vị theo giây. |
| **FR07** | Tính quãng đường | Cộng dồn độ dài các phân đoạn di chuyển để cho ra tổng số km/m của một phiên. |
| **FR08** | Tính calo | Ước lượng năng lượng tiêu thụ dựa trên thuật toán tích hợp các thông số chạy. |
| **FR09** | Zombie Mode | Xử lý logic trạng thái đuổi bắt, âm thanh môi trường và tính điểm sống sót. |
| **FR10** | Thu thập tài nguyên | Thực hiện hàm toán học tính toán vật phẩm thưởng sau phiên chạy dựa trên luật Admin. |
| **FR11** | Xây căn cứ | Quản lý trạng thái, vị trí và cấp bậc của các kiến trúc ảo sở hữu bởi người dùng. |
| **FR12** | Lưu lịch sử chạy | Đóng gói phiên chạy (km, bước, calo, ngày giờ) gửi về lưu trữ tại Database. |

---

## 5. Non-functional Requirements (Yêu cầu phi chức năng)

### 5.1 Performance (Hiệu năng)
* **Thời gian phản hồi:** Ứng dụng phải khởi động và hiển thị màn hình chính trong thời gian dưới 3 giây.
* **Tần suất định vị:** Dữ liệu tọa độ GPS toàn cầu phải được cập nhật đều đặn sau mỗi 2 giây một lần trong suốt quá trình chạy để đảm bảo độ mượt của bản đồ và tính toán tốc độ chính xác.

### 5.2 Battery Consumption (Tối ưu năng lượng)
* Do ứng dụng sử dụng đồng thời cả hai cảm biến tiêu tốn năng lượng cao là GPS và Cảm biến bước chân, hệ thống cần được cấu hình chạy ngầm tối ưu (Background Service), không gây hao pin vượt quá mức quy định thông thường của hệ điều hành đối với các ứng dụng thể thao nền tảng (ví dụ: Strava).

### 5.3 Usability (Tính dễ sử dụng)
* Giao diện trực quan hóa, tinh giản các bước cấu hình. Một người dùng mới chưa từng làm quen ứng dụng phải có khả năng nhấn nút và bắt đầu phiên chạy đầu tiên của họ trong khoảng thời gian dưới 1 phút từ khi mở app.

### 5.4 Reliability (Độ tin cậy)
* Đảm bảo tính toàn vẹn dữ liệu: Trong trường hợp ứng dụng bị tắt đột ngột do hết pin hoặc xung đột hệ thống, dữ liệu của phiên chạy hiện tại (đoạn đường trước khi ngắt kết nối) phải được lưu trữ tạm thời vào vùng nhớ cục bộ (`AsyncStorage`) để phục hồi hoặc đồng bộ lại khi khởi động, tránh mất mát dữ liệu của người dùng.

### 5.5 Compatibility (Tính tương thích)
* **Hệ điều hành:** Hoạt động ổn định trên các dòng thiết bị chạy Android phiên bản 10.0 trở lên.

---

## 6. Use Case Diagram
*(Biểu đồ Use Case tổng thể mô tả mối quan hệ giữa Actor Người dùng và các chức năng hệ thống sẽ được thiết kế trực quan bằng công cụ chuyên dụng và bổ sung tại đây).*

---

## 7. Use Case Specification (Đặc tả chi tiết Use Case)

### UC03: Start Running (Bắt đầu buổi chạy thể chất)
* **Actor chính:** Người dùng (User)
* **Điều kiện tiên quyết (Precondition):** Người dùng đã đăng nhập tài khoản thành công vào ứng dụng và đang ở màn hình giao diện chính.
* **Luồng xử lý chính (Main Flow):**
    1. Người dùng chọn nút **"Start"** trên màn hình chính.
    2. Ứng dụng gửi yêu cầu kích hoạt dịch vụ định vị vị trí (GPS) trên thiết bị.
    3. Hệ thống bắt đầu lắng nghe bộ đếm cảm biến bước chân của hệ điều hành Android.
    4. Ứng dụng khởi động luồng tính toán tốc độ di chuyển tức thời.
    5. *(Nếu trong trạng thái Zombie Mode)* Hệ thống kích hoạt thực thể quái vật bắt đầu bám đuổi theo người dùng dựa trên thuật toán vận tốc.
* **Luồng thay thế (Alternative Flow):**
    * *Tại bước 2:* Thiết bị chưa bật định vị vị trí toàn cầu (GPS tắt).
    * *Hệ thống xử lý:* Ứng dụng tạm dừng luồng chạy, hiển thị hộp thoại cảnh báo hệ thống: *"Vui lòng bật dịch vụ vị trí (GPS) để tiếp tục tính năng chạy bộ"* và điều hướng người dùng tới phần Cài đặt của Android.
* **Điều kiện sau khi thực hiện (Postcondition):** Hệ thống đóng gói toàn bộ thông số, ghi nhận kết quả và thực hiện lưu trữ hoàn chỉnh phiên (Session) chạy này vào Database sau khi người dùng nhấn "Stop".

---

## 8. Sprint Planning & Lộ trình phát triển