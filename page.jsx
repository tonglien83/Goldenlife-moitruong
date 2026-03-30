import { useEffect, useMemo, useState } from "react";

type HeroSlide = {
  title: string;
  desc: string;
  badge: string;
  image: string;
};

type Service = {
  title: string;
  desc: string;
  image: string;
  points: string[];
  slug: string;
};

type ServiceLanding = {
  slug: string;
  navTitle: string;
  heroTitle: string;
  heroDesc: string;
  image: string;
  benefits: string[];
  process: { step: string; detail: string }[];
  faq: { question: string; answer: string }[];
  cta: string;
};

type Project = {
  name: string;
  category: string;
  result: string;
  challenge: string;
  solution: string;
  impact: string;
};

type ContactFormData = {
  company: string;
  contactName: string;
  phone: string;
  message: string;
};

function CompanyLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Golden Life logo"
      role="img"
    >
      <circle cx="60" cy="60" r="56" fill="#8AB640" />
      <path
        d="M28 48c18 2 35 10 49 25 7-7 15-11 24-12-7 6-11 14-11 24 0 15-12 27-27 27-8 0-15-3-20-8-15-5-28-19-39-41 7 6 15 12 24 17-8-8-15-18-20-32 6 7 13 13 20 18z"
        fill="#EDBB4C"
      />
      <path
        d="M32 30c21 0 40 8 55 22-8-2-15 0-22 6-12-12-24-20-33-28z"
        fill="white"
        opacity="0.92"
      />
      <path d="M24 54c10 20 22 34 38 43-18-4-32-18-38-43z" fill="white" opacity="0.92" />
    </svg>
  );
}

function ScrollButton({
  targetId,
  children,
  className,
}: {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = Math.max(elementPosition - headerOffset, 0);

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

function slugifyPath(slug: string) {
  return `/dich-vu/${slug}`;
}

function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;
  const currentSlide = slides[index];

  return (
    <section id="home" className="relative h-[560px] w-full overflow-hidden lg:h-[680px]" aria-label="Banner dịch vụ">
      <img
        src={currentSlide.image}
        alt={currentSlide.title}
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-all duration-700"
        loading="eager"
      />
      <div className="absolute inset-0 bg-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#8AB640] via-[#EDBB4C] to-[#8AB640]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#8AB640]" />
            Golden Life
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {currentSlide.title}
          </h1>

          <p className="mt-4 text-lg text-white/90">{currentSlide.desc}</p>

          <div className="mt-4 inline-block rounded-xl bg-[#EDBB4C]/90 px-4 py-2 text-sm font-semibold text-white">
            {currentSlide.badge}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:0909398862"
              className="rounded-xl bg-[#EDBB4C] px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#d4a63f]"
            >
              Gọi ngay
            </a>
            <ScrollButton
              targetId="contact"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Nhận tư vấn miễn phí
            </ScrollButton>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-xl bg-white/80 px-3 py-2 text-xl"
            aria-label="Slide trước"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl bg-white/80 px-3 py-2 text-xl"
            aria-label="Slide tiếp theo"
          >
            ›
          </button>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={`${slide.title}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Chuyển đến slide ${i + 1}`}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-[#8AB640]" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default function EnvironmentalCompanyWebsitePreview() {
  const [selectedLanding, setSelectedLanding] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>({
    company: "",
    contactName: "",
    phone: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const heroSlides: HeroSlide[] = [
    {
      title: "Hồ sơ môi trường cho doanh nghiệp",
      desc: "Tư vấn và hoàn thiện nhanh chóng",
      badge: "ĐTM • Giấy phép • Báo cáo",
      image: "https://images.unsplash.com/photo-1581090700227-1e8a7f7d2f9d?q=80&w=2070",
    },
    {
      title: "Quan trắc môi trường định kỳ",
      desc: "Đảm bảo tuân thủ pháp luật",
      badge: "Nước thải • Khí thải",
      image: "https://images.unsplash.com/photo-1581092919535-7146ff1a590b?q=80&w=2070",
    },
    {
      title: "Xử lý nước thải & khí thải",
      desc: "Tối ưu chi phí vận hành",
      badge: "Thiết kế • Thi công • Vận hành",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=2070",
    },
    {
      title: "Giải pháp ESG & Net Zero",
      desc: "Nâng cao năng lực doanh nghiệp",
      badge: "Chuẩn quốc tế • FDI",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070",
    },
  ];

  const services: Service[] = [
    {
      title: "Giấy phép môi trường",
      slug: "giay-phep-moi-truong",
      desc: "Tư vấn và lập hồ sơ xin cấp giấy phép môi trường cho doanh nghiệp theo quy định mới nhất, bảo đảm đầy đủ pháp lý trước khi vận hành.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Tư vấn điều kiện cấp phép", "Soạn hồ sơ hoàn chỉnh", "Hỗ trợ làm việc với cơ quan chức năng"],
    },
    {
      title: "Lập báo cáo đánh giá tác động môi trường",
      slug: "bao-cao-dtm",
      desc: "Lập báo cáo ĐTM chuyên sâu cho dự án đầu tư, giúp doanh nghiệp được thẩm định và phê duyệt đúng quy trình.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Khảo sát hiện trạng", "Phân tích tác động", "Hoàn thiện hồ sơ phê duyệt"],
    },
    {
      title: "Lập đăng ký môi trường",
      slug: "dang-ky-moi-truong",
      desc: "Thực hiện đăng ký môi trường cho dự án phù hợp đối tượng, bảo đảm tuân thủ quy định pháp luật nhanh gọn.",
      image: "https://images.pexels.com/photos/8297478/pexels-photo-8297478.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Hồ sơ đăng ký", "Tư vấn quy định", "Nộp và theo dõi kết quả"],
    },
    {
      title: "Vận hành thử nghiệm và báo cáo kết quả",
      slug: "van-hanh-thu-nghiem-bao-cao-ket-qua",
      desc: "Hỗ trợ vận hành thử nghiệm công trình xử lý chất thải và lập báo cáo kết quả trước khi vận hành chính thức.",
      image: "https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Giám sát vận hành", "Phân tích kết quả", "Lập báo cáo hoàn chỉnh"],
    },
    {
      title: "Lập báo cáo công tác bảo vệ môi trường",
      slug: "bao-cao-cong-tac-bao-ve-moi-truong",
      desc: "Lập báo cáo định kỳ về công tác bảo vệ môi trường, giúp doanh nghiệp duy trì tuân thủ và giảm rủi ro pháp lý.",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Thu thập dữ liệu", "Phân tích và tổng hợp", "Nộp báo cáo đúng hạn"],
    },
    {
      title: "Chất thải nguy hại",
      slug: "chat-thai-nguy-hai",
      desc: "Tư vấn quản lý, lưu trữ và xử lý chất thải nguy hại đúng quy định, bảo đảm an toàn và kiểm soát rủi ro.",
      image: "https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Phân loại chất thải", "Quy trình lưu trữ", "Báo cáo và chứng từ"],
    },
    {
      title: "Hồ sơ xin phép khai thác nước ngầm",
      slug: "ho-so-khai-thac-nuoc-ngam",
      desc: "Lập hồ sơ xin phép khai thác và sử dụng nước ngầm theo đúng quy định hiện hành cho doanh nghiệp.",
      image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1200",
      points: ["Đánh giá nguồn nước", "Lập hồ sơ xin phép", "Theo dõi và gia hạn"],
    },
  ];

  const projects: Project[] = [
    {
      name: "Doanh nghiệp sản xuất tại TP.HCM",
      category: "Công nghiệp",
      result: "Hoàn thiện hồ sơ môi trường đúng quy định, tránh rủi ro pháp lý",
      challenge: "Doanh nghiệp cần gấp bộ hồ sơ môi trường để đáp ứng yêu cầu kiểm tra và tránh gián đoạn hoạt động.",
      solution: "Golden Life rà soát hiện trạng, chuẩn hóa hồ sơ và triển khai lộ trình xử lý theo đúng quy định pháp luật.",
      impact: "Hồ sơ hoàn thành đúng tiến độ, doanh nghiệp giảm rủi ro pháp lý và yên tâm vận hành.",
    },
    {
      name: "Nhà máy thực phẩm",
      category: "Thực phẩm",
      result: "Quan trắc môi trường định kỳ đạt chuẩn và ổn định",
      challenge: "Nhà máy cần theo dõi chất lượng môi trường thường xuyên để duy trì tuân thủ và phục vụ kiểm tra nội bộ.",
      solution: "Golden Life xây dựng kế hoạch quan trắc định kỳ, lấy mẫu và tổng hợp báo cáo rõ ràng, dễ kiểm soát.",
      impact: "Doanh nghiệp chủ động dữ liệu môi trường, giảm áp lực vận hành và tăng độ tin cậy với đối tác.",
    },
    {
      name: "Nhà máy sản xuất quy mô lớn",
      category: "FDI",
      result: "Triển khai hệ thống xử lý nước thải đạt tiêu chuẩn xả thải",
      challenge: "Hệ thống xử lý cũ phát sinh chi phí vận hành cao và chưa tối ưu hiệu suất xử lý.",
      solution: "Golden Life tư vấn phương án cải tiến, tối ưu vận hành và kiểm soát đầu ra theo tiêu chuẩn yêu cầu.",
      impact: "Hiệu quả xử lý ổn định hơn, giảm áp lực vận hành và tăng khả năng đáp ứng yêu cầu khách hàng FDI.",
    },
  ];

  const legalArticles = [
    {
      title: "Giấy phép môi trường là gì? Doanh nghiệp cần chuẩn bị những gì?",
      desc: "Theo Điều 39 Luật Bảo vệ môi trường 2020, giấy phép môi trường là văn bản do cơ quan có thẩm quyền cấp để quản lý hoạt động xả nước thải, bụi, khí thải, tiếng ồn, độ rung và quản lý chất thải của cơ sở, dự án thuộc đối tượng phải có giấy phép. Hồ sơ thực hiện được quy định tại Điều 43 Luật Bảo vệ môi trường 2020 và được hướng dẫn chi tiết tại Nghị định 08/2022/NĐ-CP, sửa đổi bổ sung bởi Nghị định 05/2025/NĐ-CP.",
      source: "Nguồn: Luật BVMT 2020; Nghị định 08/2022/NĐ-CP; Nghị định 05/2025/NĐ-CP",
      silo: "Pillar: Giấy phép môi trường",
    },
    {
      title: "Quy định mới về bảo vệ môi trường doanh nghiệp cần biết",
      desc: "Doanh nghiệp cần xác định đúng nhóm dự án và nghĩa vụ môi trường tương ứng theo Luật Bảo vệ môi trường 2020 và Nghị định 08/2022/NĐ-CP. Với cơ sở sản xuất, các nghĩa vụ thường gặp gồm: đánh giá tác động môi trường, đăng ký môi trường, giấy phép môi trường, quan trắc theo yêu cầu pháp lý, quản lý chất thải nguy hại và thực hiện trách nhiệm báo cáo, công khai thông tin khi thuộc diện áp dụng.",
      source: "Nguồn: Luật BVMT 2020; Nghị định 08/2022/NĐ-CP",
      silo: "Pillar: Tuân thủ môi trường doanh nghiệp",
    },
    {
      title: "Checklist hồ sơ môi trường cho doanh nghiệp sản xuất",
      desc: "Checklist thực tiễn nên bao gồm: hồ sơ pháp lý dự án; quyết định phê duyệt kết quả thẩm định ĐTM nếu thuộc diện; giấy phép môi trường hoặc đăng ký môi trường; hồ sơ vận hành thử nghiệm công trình xử lý chất thải nếu có; chứng từ và sổ theo dõi chất thải nguy hại; kết quả quan trắc theo yêu cầu pháp luật; cùng các báo cáo liên quan theo từng trường hợp cụ thể. Hành vi vi phạm có thể bị xử phạt theo Nghị định 45/2022/NĐ-CP.",
      source: "Nguồn: Thông tư 02/2022/TT-BTNMT; Nghị định 45/2022/NĐ-CP",
      silo: "Pillar: Checklist hồ sơ môi trường",
    },
  ];

  const trustHighlights = [
    ["Tư vấn đúng trọng tâm", "Giải pháp rõ ràng theo nhu cầu từng doanh nghiệp"],
    ["Triển khai thực tế", "Kết hợp hồ sơ, quan trắc và vận hành hệ thống"],
    ["Đồng hành lâu dài", "Không chỉ làm hồ sơ mà còn hỗ trợ trong quá trình hoạt động"],
    ["Định hướng B2B / FDI", "Phù hợp doanh nghiệp sản xuất và đối tác yêu cầu cao"],
  ] as const;

  const trustReasons = [
    ["Tư vấn rõ ràng", "Phân tích hiện trạng, đề xuất phương án phù hợp ngay từ đầu."],
    ["Hồ sơ mạch lạc", "Nội dung chuẩn hóa, dễ theo dõi và bám sát yêu cầu pháp lý."],
    ["Triển khai thực tế", "Kết nối giữa tư vấn, quan trắc và vận hành hệ thống."],
    ["Đồng hành lâu dài", "Hỗ trợ doanh nghiệp trong suốt quá trình hoạt động và cải tiến."],
  ] as const;

  const trustBadges = [
    ["B2B", "Tập trung khách hàng doanh nghiệp"],
    ["FDI", "Phù hợp đối tác yêu cầu tiêu chuẩn cao"],
    ["One-stop", "Tư vấn, quan trắc và xử lý đồng bộ"],
  ] as const;

  const serviceLandings: ServiceLanding[] = [
    {
      slug: "giay-phep-moi-truong",
      navTitle: "Giấy phép môi trường",
      heroTitle: "Dịch vụ Giấy phép môi trường cho doanh nghiệp",
      heroDesc:
        "Trang dịch vụ này được thiết kế theo chuẩn SEO và chuyển đổi để giúp doanh nghiệp hiểu rõ đối tượng áp dụng, quy trình triển khai, hồ sơ cần chuẩn bị và lý do nên chọn Golden Life đồng hành.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070",
      benefits: [
        "Làm rõ doanh nghiệp của bạn có thuộc đối tượng phải xin giấy phép môi trường hay không.",
        "Chuẩn hóa hồ sơ và nội dung giải trình để rút ngắn thời gian xử lý.",
        "Giảm rủi ro thiếu hồ sơ, sai biểu mẫu hoặc chậm tiến độ trước khi vận hành.",
        "Hỗ trợ doanh nghiệp làm việc bài bản hơn với cơ quan quản lý và đối tác kiểm tra compliance.",
      ],
      process: [
        {
          step: "Bước 1: Khảo sát và rà soát pháp lý",
          detail:
            "Đánh giá hiện trạng dự án, loại hình sản xuất, quy mô hoạt động và đối chiếu với quy định để xác định phạm vi hồ sơ cần thực hiện.",
        },
        {
          step: "Bước 2: Thu thập dữ liệu và lập hồ sơ",
          detail:
            "Tổng hợp tài liệu pháp lý, bản vẽ, quy trình vận hành, thông tin chất thải phát sinh và xây dựng bộ hồ sơ theo đúng biểu mẫu yêu cầu.",
        },
        {
          step: "Bước 3: Nộp hồ sơ và theo dõi xử lý",
          detail:
            "Hỗ trợ doanh nghiệp nộp hồ sơ, cập nhật tình trạng xử lý và bổ sung thông tin khi có yêu cầu từ cơ quan chức năng.",
        },
        {
          step: "Bước 4: Bàn giao và hướng dẫn triển khai",
          detail:
            "Sau khi được cấp phép, Golden Life tiếp tục hướng dẫn doanh nghiệp các nghĩa vụ liên quan để duy trì tuân thủ trong quá trình hoạt động.",
        },
      ],
      faq: [
        {
          question: "Doanh nghiệp nào cần xin giấy phép môi trường?",
          answer:
            "Tùy theo loại hình, quy mô và mức độ tác động môi trường của dự án, doanh nghiệp có thể thuộc nhóm phải xin giấy phép môi trường trước khi vận hành chính thức.",
        },
        {
          question: "Hồ sơ giấy phép môi trường thường gồm những gì?",
          answer:
            "Thông thường hồ sơ sẽ bao gồm thông tin pháp lý của doanh nghiệp, mô tả dự án, hiện trạng môi trường, nguồn phát sinh chất thải, công trình xử lý và các tài liệu liên quan khác theo quy định.",
        },
        {
          question: "Thời gian thực hiện có nhanh không?",
          answer:
            "Thời gian phụ thuộc vào mức độ hoàn chỉnh của hồ sơ đầu vào và phạm vi dự án. Khi dữ liệu được chuẩn hóa sớm, tiến độ thường sẽ được rút ngắn đáng kể.",
        },
      ],
      cta: "Nhận tư vấn giấy phép môi trường",
    },
    {
      slug: "bao-cao-dtm",
      navTitle: "Báo cáo ĐTM",
      heroTitle: "Dịch vụ Lập báo cáo đánh giá tác động môi trường (ĐTM)",
      heroDesc:
        "Landing page này tập trung vào việc giải thích rõ vai trò của báo cáo ĐTM trong giai đoạn chuẩn bị đầu tư, giúp doanh nghiệp hiểu đúng yêu cầu pháp lý và chuẩn bị hồ sơ bài bản ngay từ đầu.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070",
      benefits: [
        "Xác định sớm các tác động môi trường để giảm rủi ro khi triển khai dự án.",
        "Xây dựng bộ hồ sơ ĐTM logic, rõ ràng và bám sát thực tế vận hành.",
        "Hỗ trợ doanh nghiệp chuẩn bị đầy đủ dữ liệu kỹ thuật và pháp lý phục vụ thẩm định.",
        "Tăng khả năng phê duyệt đúng tiến độ cho dự án đầu tư mới hoặc mở rộng.",
      ],
      process: [
        {
          step: "Bước 1: Khảo sát dự án và hiện trạng khu vực",
          detail:
            "Rà soát quy mô, công suất, công nghệ sản xuất, vị trí dự án và điều kiện môi trường xung quanh để xác định phạm vi đánh giá.",
        },
        {
          step: "Bước 2: Phân tích nguồn tác động",
          detail:
            "Nhận diện các yếu tố phát sinh như khí thải, nước thải, chất thải rắn, tiếng ồn và các rủi ro môi trường liên quan trong từng giai đoạn của dự án.",
        },
        {
          step: "Bước 3: Lập báo cáo ĐTM",
          detail:
            "Xây dựng nội dung báo cáo theo cấu trúc quy định, bảo đảm thông tin đồng nhất giữa phương án kỹ thuật và giải pháp bảo vệ môi trường.",
        },
        {
          step: "Bước 4: Hỗ trợ giải trình thẩm định",
          detail:
            "Đồng hành cùng doanh nghiệp trong quá trình chỉnh sửa, bổ sung và giải trình với cơ quan chuyên môn khi cần thiết.",
        },
      ],
      faq: [
        {
          question: "Khi nào dự án cần thực hiện báo cáo ĐTM?",
          answer:
            "Dự án thuộc nhóm có nguy cơ tác động xấu đến môi trường theo quy định sẽ phải lập báo cáo ĐTM trước khi triển khai đầu tư hoặc xin các chấp thuận liên quan.",
        },
        {
          question: "ĐTM khác gì với giấy phép môi trường?",
          answer:
            "ĐTM thường thực hiện ở giai đoạn chuẩn bị đầu tư để đánh giá tác động dự án, còn giấy phép môi trường thường gắn với điều kiện vận hành và xả thải của cơ sở.",
        },
        {
          question: "Doanh nghiệp cần chuẩn bị dữ liệu gì cho ĐTM?",
          answer:
            "Các tài liệu cơ bản gồm thông tin pháp lý, mặt bằng, công nghệ sản xuất, công suất, nguyên vật liệu, hạ tầng xử lý chất thải và tiến độ triển khai dự án.",
        },
      ],
      cta: "Nhận tư vấn báo cáo ĐTM",
    },
    {
      slug: "dang-ky-moi-truong",
      navTitle: "Đăng ký môi trường",
      heroTitle: "Dịch vụ Lập đăng ký môi trường cho dự án phù hợp đối tượng",
      heroDesc:
        "Trang dịch vụ này giúp doanh nghiệp xác định đúng trường hợp áp dụng đăng ký môi trường, tránh thực hiện sai loại hồ sơ và tiết kiệm thời gian xử lý thủ tục.",
      image: "https://images.unsplash.com/photo-1581091870622-1e7c8f6d5b2f?q=80&w=2070",
      benefits: [
        "Xác định đúng đối tượng phải đăng ký môi trường theo quy mô dự án.",
        "Hồ sơ ngắn gọn nhưng đầy đủ, hạn chế sửa đổi nhiều lần.",
        "Giảm nguy cơ áp dụng sai loại thủ tục pháp lý môi trường.",
        "Hỗ trợ doanh nghiệp hoàn tất thủ tục nhanh gọn trước khi hoạt động.",
      ],
      process: [
        {
          step: "Bước 1: Xác định đối tượng áp dụng",
          detail:
            "Rà soát loại hình sản xuất, công suất và nhóm ngành để xác định doanh nghiệp thuộc diện đăng ký môi trường.",
        },
        {
          step: "Bước 2: Thu thập thông tin vận hành",
          detail:
            "Tổng hợp thông tin về quy trình sản xuất, nguồn phát sinh chất thải, biện pháp xử lý và các tài liệu liên quan khác.",
        },
        {
          step: "Bước 3: Soạn và nộp hồ sơ",
          detail:
            "Chuẩn hóa hồ sơ theo biểu mẫu phù hợp, hỗ trợ nộp và theo dõi quá trình tiếp nhận hồ sơ.",
        },
        {
          step: "Bước 4: Bàn giao hướng dẫn tuân thủ",
          detail:
            "Sau khi hoàn tất, Golden Life hướng dẫn doanh nghiệp các nghĩa vụ liên quan để duy trì hồ sơ pháp lý ổn định.",
        },
      ],
      faq: [
        {
          question: "Đăng ký môi trường áp dụng cho doanh nghiệp nào?",
          answer:
            "Thủ tục này thường áp dụng cho một số dự án hoặc cơ sở thuộc nhóm phù hợp theo quy định, có mức độ tác động môi trường thấp hơn so với nhóm phải lập ĐTM.",
        },
        {
          question: "Hồ sơ đăng ký môi trường có phức tạp không?",
          answer:
            "So với các thủ tục khác, hồ sơ đăng ký môi trường gọn hơn, nhưng vẫn cần bảo đảm đầy đủ thông tin về hoạt động và biện pháp bảo vệ môi trường.",
        },
        {
          question: "Có thể nhầm giữa đăng ký môi trường và giấy phép môi trường không?",
          answer:
            "Có. Vì vậy việc rà soát đúng loại thủ tục ngay từ đầu là rất quan trọng để tránh mất thời gian và chi phí xử lý sai hồ sơ.",
        },
      ],
      cta: "Nhận tư vấn đăng ký môi trường",
    },
    {
      slug: "van-hanh-thu-nghiem-bao-cao-ket-qua",
      navTitle: "Vận hành thử nghiệm",
      heroTitle: "Dịch vụ Vận hành thử nghiệm và báo cáo kết quả công trình xử lý chất thải",
      heroDesc:
        "Landing page này giúp doanh nghiệp hiểu rõ giai đoạn vận hành thử nghiệm, mục tiêu theo dõi hiệu quả hệ thống xử lý và cách chuẩn bị báo cáo kết quả đúng yêu cầu.",
      image: "https://images.unsplash.com/photo-1581091215367-59ab6b8d3d0f?q=80&w=2070",
      benefits: [
        "Kiểm tra hiệu quả vận hành thực tế của công trình xử lý trước khi hoạt động chính thức.",
        "Thu thập dữ liệu vận hành bài bản để xây dựng báo cáo kết quả rõ ràng.",
        "Phát hiện sớm các điểm chưa ổn định để điều chỉnh kịp thời.",
        "Tăng độ tin cậy khi làm việc với cơ quan quản lý hoặc đối tác kiểm tra hệ thống.",
      ],
      process: [
        {
          step: "Bước 1: Lập kế hoạch vận hành thử nghiệm",
          detail:
            "Xác định phạm vi theo dõi, chỉ tiêu giám sát, thời gian vận hành và phương án phối hợp với bộ phận vận hành của doanh nghiệp.",
        },
        {
          step: "Bước 2: Theo dõi thông số và lấy mẫu",
          detail:
            "Giám sát công suất thực tế, các chỉ số đầu vào – đầu ra và các yếu tố có ảnh hưởng đến hiệu suất xử lý của hệ thống.",
        },
        {
          step: "Bước 3: Phân tích và đánh giá kết quả",
          detail:
            "Tổng hợp dữ liệu, so sánh với yêu cầu kỹ thuật và đánh giá mức độ ổn định của hệ thống trong giai đoạn thử nghiệm.",
        },
        {
          step: "Bước 4: Lập báo cáo hoàn chỉnh",
          detail:
            "Xây dựng báo cáo kết quả vận hành thử nghiệm mạch lạc, có đủ dữ liệu chứng minh và đề xuất điều chỉnh nếu cần.",
        },
      ],
      faq: [
        {
          question: "Vận hành thử nghiệm có bắt buộc không?",
          answer:
            "Tùy trường hợp và loại công trình xử lý chất thải, doanh nghiệp có thể phải thực hiện vận hành thử nghiệm để chứng minh hiệu quả trước khi vận hành chính thức.",
        },
        {
          question: "Báo cáo kết quả thường cần những nội dung gì?",
          answer:
            "Báo cáo thường bao gồm mô tả hệ thống, thời gian vận hành, dữ liệu theo dõi, kết quả phân tích và đánh giá mức độ đáp ứng yêu cầu kỹ thuật.",
        },
        {
          question: "Nếu kết quả chưa ổn định thì sao?",
          answer:
            "Khi hệ thống chưa ổn định, doanh nghiệp cần điều chỉnh phương án vận hành hoặc kỹ thuật để đạt hiệu quả xử lý phù hợp trước khi hoàn tất hồ sơ.",
        },
      ],
      cta: "Nhận tư vấn vận hành thử nghiệm",
    },
    {
      slug: "bao-cao-cong-tac-bao-ve-moi-truong",
      navTitle: "Báo cáo BVMT",
      heroTitle: "Dịch vụ Lập báo cáo công tác bảo vệ môi trường định kỳ",
      heroDesc:
        "Trang dịch vụ này được tối ưu để giải thích rõ nghĩa vụ báo cáo định kỳ, cách thu thập dữ liệu và quy trình chuẩn hóa nội dung nhằm giúp doanh nghiệp nộp báo cáo đúng hạn và đúng trọng tâm.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070",
      benefits: [
        "Giảm áp lực tổng hợp dữ liệu nội bộ mỗi kỳ báo cáo.",
        "Bảo đảm báo cáo có cấu trúc rõ ràng và bám sát nghĩa vụ pháp lý của doanh nghiệp.",
        "Hạn chế thiếu sót trong quá trình rà soát số liệu và chứng từ liên quan.",
        "Giúp doanh nghiệp duy trì hệ thống theo dõi môi trường bài bản hơn theo thời gian.",
      ],
      process: [
        {
          step: "Bước 1: Rà soát nghĩa vụ báo cáo",
          detail:
            "Xác định tần suất, phạm vi và nội dung doanh nghiệp cần thực hiện dựa trên hồ sơ pháp lý và tình hình hoạt động thực tế.",
        },
        {
          step: "Bước 2: Thu thập dữ liệu vận hành",
          detail:
            "Tổng hợp số liệu quan trắc, chất thải, công trình xử lý, chứng từ quản lý chất thải và các nội dung liên quan khác.",
        },
        {
          step: "Bước 3: Phân tích và soạn báo cáo",
          detail:
            "Chuẩn hóa nội dung, trình bày kết quả theo cấu trúc logic và phản ánh đúng tình hình quản lý môi trường của doanh nghiệp.",
        },
        {
          step: "Bước 4: Hoàn thiện và nộp đúng hạn",
          detail:
            "Hỗ trợ kiểm tra lần cuối, bàn giao báo cáo và theo dõi việc nộp theo thời hạn phù hợp.",
        },
      ],
      faq: [
        {
          question: "Báo cáo công tác bảo vệ môi trường có phải làm định kỳ không?",
          answer:
            "Tùy nghĩa vụ pháp lý của từng cơ sở, doanh nghiệp có thể phải thực hiện báo cáo theo chu kỳ và nội dung tương ứng với hồ sơ môi trường đã được cấp trước đó.",
        },
        {
          question: "Doanh nghiệp cần chuẩn bị những dữ liệu nào?",
          answer:
            "Các dữ liệu thường bao gồm kết quả quan trắc, lượng chất thải phát sinh, tình trạng vận hành công trình xử lý và các chứng từ liên quan đến quản lý chất thải.",
        },
        {
          question: "Làm sao để tránh thiếu dữ liệu khi đến kỳ báo cáo?",
          answer:
            "Doanh nghiệp nên duy trì cơ chế lưu trữ dữ liệu theo tháng hoặc quý để khi đến kỳ có thể tổng hợp nhanh và hạn chế sai sót.",
        },
      ],
      cta: "Nhận tư vấn báo cáo định kỳ",
    },
    {
      slug: "chat-thai-nguy-hai",
      navTitle: "Chất thải nguy hại",
      heroTitle: "Dịch vụ Quản lý chất thải nguy hại cho doanh nghiệp sản xuất",
      heroDesc:
        "Trang dịch vụ này giúp doanh nghiệp kiểm soát đúng quy trình phân loại, lưu trữ, chứng từ và báo cáo liên quan đến chất thải nguy hại, từ đó giảm rủi ro an toàn và pháp lý trong vận hành.",
      image: "https://images.unsplash.com/photo-1581090700227-1e8a7f7d2f9d?q=80&w=2070",
      benefits: [
        "Hướng dẫn nhận diện và phân loại chất thải nguy hại đúng bản chất phát sinh.",
        "Thiết lập quy trình lưu trữ nội bộ an toàn và dễ kiểm soát.",
        "Hỗ trợ chứng từ, sổ theo dõi và báo cáo liên quan đến quản lý chất thải nguy hại.",
        "Giảm nguy cơ vi phạm do sai sót trong lưu giữ hoặc bàn giao xử lý.",
      ],
      process: [
        {
          step: "Bước 1: Rà soát nguồn phát sinh",
          detail:
            "Xác định các công đoạn phát sinh chất thải nguy hại, khối lượng, tính chất và phương án quản lý đang áp dụng tại cơ sở.",
        },
        {
          step: "Bước 2: Chuẩn hóa phân loại và lưu trữ",
          detail:
            "Đề xuất cách phân loại, dán nhãn, bố trí khu vực lưu giữ và nguyên tắc kiểm soát nội bộ phù hợp với thực tế vận hành.",
        },
        {
          step: "Bước 3: Hoàn thiện chứng từ và hồ sơ quản lý",
          detail:
            "Hỗ trợ doanh nghiệp xây dựng hệ thống theo dõi, sổ sách, chứng từ bàn giao và nội dung cần thiết theo yêu cầu quản lý.",
        },
        {
          step: "Bước 4: Duy trì kiểm soát định kỳ",
          detail:
            "Định kỳ rà soát lại quy trình để hạn chế thiếu sót, bảo đảm dữ liệu quản lý luôn đồng nhất và dễ truy xuất.",
        },
      ],
      faq: [
        {
          question: "Chất thải nguy hại là gì?",
          answer:
            "Đây là nhóm chất thải có yếu tố nguy hại về hóa học, vật lý hoặc sinh học và cần được quản lý theo quy trình chặt chẽ hơn so với chất thải thông thường.",
        },
        {
          question: "Doanh nghiệp thường sai ở đâu khi quản lý chất thải nguy hại?",
          answer:
            "Các lỗi phổ biến gồm phân loại chưa đúng, lưu trữ chưa phù hợp, ghi nhận thiếu chứng từ hoặc chưa đồng nhất giữa thực tế và hồ sơ quản lý.",
        },
        {
          question: "Golden Life hỗ trợ phần nào trong quy trình này?",
          answer:
            "Chúng tôi hỗ trợ từ khâu rà soát hiện trạng, chuẩn hóa quy trình đến hướng dẫn lập hồ sơ và kiểm soát dữ liệu quản lý theo hướng dễ áp dụng thực tế.",
        },
      ],
      cta: "Nhận tư vấn chất thải nguy hại",
    },
    {
      slug: "ho-so-khai-thac-nuoc-ngam",
      navTitle: "Khai thác nước ngầm",
      heroTitle: "Dịch vụ Hồ sơ xin phép khai thác nước ngầm cho doanh nghiệp",
      heroDesc:
        "Landing page này tập trung giải thích rõ khi nào doanh nghiệp cần thực hiện thủ tục khai thác nước ngầm, hồ sơ gồm những gì và cách triển khai bài bản để bảo đảm tiến độ vận hành.",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=2070",
      benefits: [
        "Xác định đúng trường hợp phải xin phép khai thác và sử dụng nước ngầm.",
        "Chuẩn bị hồ sơ có cấu trúc rõ ràng, giảm thời gian bổ sung sửa đổi.",
        "Hỗ trợ doanh nghiệp đồng bộ dữ liệu kỹ thuật và pháp lý liên quan đến nguồn nước.",
        "Tăng sự chủ động trong kế hoạch sử dụng nước phục vụ sản xuất lâu dài.",
      ],
      process: [
        {
          step: "Bước 1: Khảo sát nhu cầu và hiện trạng khai thác",
          detail:
            "Đánh giá nhu cầu sử dụng nước, vị trí giếng, lưu lượng khai thác và hiện trạng hạ tầng liên quan để xác định phạm vi hồ sơ.",
        },
        {
          step: "Bước 2: Thu thập dữ liệu kỹ thuật",
          detail:
            "Tổng hợp thông số nguồn nước, sơ đồ khai thác, mục đích sử dụng và các tài liệu phục vụ cho bộ hồ sơ xin phép.",
        },
        {
          step: "Bước 3: Soạn và nộp hồ sơ",
          detail:
            "Chuẩn hóa nội dung hồ sơ, kiểm tra tính đầy đủ trước khi nộp và theo dõi tiến độ xử lý tại cơ quan có thẩm quyền.",
        },
        {
          step: "Bước 4: Theo dõi hiệu lực và gia hạn",
          detail:
            "Hỗ trợ doanh nghiệp theo dõi thời hạn giấy phép, nghĩa vụ liên quan và kế hoạch gia hạn khi cần thiết.",
        },
      ],
      faq: [
        {
          question: "Khai thác nước ngầm có cần xin phép không?",
          answer:
            "Tùy theo lưu lượng, mục đích sử dụng và điều kiện thực tế, doanh nghiệp có thể thuộc diện phải xin phép khai thác nước ngầm theo quy định hiện hành.",
        },
        {
          question: "Hồ sơ xin phép khai thác nước ngầm gồm gì?",
          answer:
            "Hồ sơ thường bao gồm thông tin pháp lý của doanh nghiệp, dữ liệu kỹ thuật khai thác, vị trí công trình, mục đích sử dụng và các tài liệu liên quan khác theo yêu cầu.",
        },
        {
          question: "Sau khi được cấp phép doanh nghiệp cần lưu ý gì?",
          answer:
            "Doanh nghiệp cần theo dõi hiệu lực giấy phép, lưu lượng khai thác thực tế và các nghĩa vụ phát sinh liên quan để duy trì tuân thủ ổn định.",
        },
      ],
      cta: "Nhận tư vấn khai thác nước ngầm",
    },
  ];

  const serviceLandingIndexMap = useMemo(
    () => Object.fromEntries(serviceLandings.map((item, idx) => [item.slug, idx])),
    [serviceLandings]
  );

  const currentServiceLanding = serviceLandings[selectedLanding];

  const navigateToService = (idx: number, shouldScroll = true) => {
    const target = serviceLandings[idx];
    if (!target) return;

    setSelectedLanding(idx);
    window.history.pushState({}, "", slugifyPath(target.slug));
    document.title = `${target.heroTitle} | Golden Life`;

    if (shouldScroll) {
      const el = document.getElementById("service-landing");
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const syncRoute = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/dich-vu\/([^/]+)$/);
      if (match) {
        const idx = serviceLandingIndexMap[match[1]];
        if (typeof idx === "number") {
          setSelectedLanding(idx);
          document.title = `${serviceLandings[idx].heroTitle} | Golden Life`;
          return;
        }
      }
      document.title = "Golden Life | Dịch vụ môi trường cho doanh nghiệp";
    };

    syncRoute();
    const onPopState = () => syncRoute();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [serviceLandingIndexMap, serviceLandings]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!formData.company.trim() || !formData.contactName.trim() || !formData.phone.trim()) {
      setFormError("Vui lòng điền đầy đủ Tên công ty, Người liên hệ và Số điện thoại.");
      return;
    }

    const leadPayload = {
      ...formData,
      createdAt: new Date().toISOString(),
      source: "website-preview",
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem("golden-life-leads") || "[]");
      localStorage.setItem("golden-life-leads", JSON.stringify([leadPayload, ...existingLeads]));
    } catch {
      // Ignore localStorage errors in preview mode
    }

    const subject = encodeURIComponent(`Lead mới từ website - ${formData.company}`);
    const body = encodeURIComponent(
      `Tên công ty: ${formData.company}
Người liên hệ: ${formData.contactName}
Số điện thoại: ${formData.phone}
Nhu cầu: ${formData.message || "Chưa nhập"}`
    );

    window.open(`mailto:sales@golden-life.com.vn?subject=${subject}&body=${body}`, "_blank");
    window.open("https://zalo.me/0909398862", "_blank");

    setFormSuccess("Đã ghi nhận thông tin. Golden Life sẽ liên hệ tư vấn sớm.");
    setFormData({
      company: "",
      contactName: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <ScrollButton targetId="home" className="flex items-center gap-3" >
            <CompanyLogo className="h-11 w-11 rounded-lg bg-white p-1 shadow-sm" />
            <p className="text-sm font-bold text-[#8AB640]">GOLDEN LIFE</p>
          </ScrollButton>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
            <ScrollButton targetId="home" className="hover:text-[#8AB640]">Trang chủ</ScrollButton>
            <ScrollButton targetId="about" className="hover:text-[#8AB640]">Giới thiệu công ty</ScrollButton>
            <ScrollButton targetId="services" className="hover:text-[#8AB640]">Dịch vụ</ScrollButton>
            <ScrollButton targetId="projects" className="hover:text-[#8AB640]">Dự án</ScrollButton>
            <ScrollButton targetId="legal" className="hover:text-[#8AB640]">Tin tức</ScrollButton>
            <ScrollButton targetId="contact" className="hover:text-[#8AB640]">Liên hệ</ScrollButton>
          </nav>

          <ScrollButton
            targetId="contact"
            className="rounded-xl bg-[#EDBB4C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d4a63f]"
          >
            Tư vấn nhanh
          </ScrollButton>
        </div>
      </header>

      <main>
        <HeroSlider slides={heroSlides} />

        <section id="about" className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8AB640]">Giới thiệu công ty</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Golden Life – Đối tác tư vấn môi trường đáng tin cậy cho doanh nghiệp
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Golden Life là đơn vị chuyên cung cấp giải pháp môi trường toàn diện cho doanh nghiệp, bao gồm tư vấn hồ sơ môi trường, quan trắc định kỳ và thiết kế – vận hành hệ thống xử lý nước thải, khí thải. Mục tiêu của chúng tôi là giúp doanh nghiệp tuân thủ đúng quy định pháp luật, giảm thiểu rủi ro và tối ưu chi phí vận hành.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Không chỉ dừng lại ở việc hoàn thiện hồ sơ, Golden Life hướng đến việc đồng hành lâu dài cùng doanh nghiệp trong quá trình phát triển bền vững, bảo đảm hoạt động sản xuất luôn đáp ứng tiêu chuẩn môi trường và nâng cao uy tín với đối tác trong và ngoài nước.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Tư vấn và lập hồ sơ môi trường đầy đủ (ĐTM, giấy phép, báo cáo định kỳ)",
                  "Quan trắc môi trường chính xác, đúng quy chuẩn",
                  "Thiết kế và vận hành hệ thống xử lý nước thải – khí thải",
                  "Đồng hành cùng doanh nghiệp trong suốt quá trình hoạt động",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#8AB640]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <ScrollButton
                targetId="contact"
                className="mt-8 inline-flex rounded-xl bg-[#8AB640] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#6F9530]"
              >
                Xem hồ sơ năng lực
              </ScrollButton>
            </div>

            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070"
                alt="Giới thiệu Golden Life"
                className="rounded-[28px] shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-6">
          <div className="mx-auto mb-6 max-w-7xl px-4 lg:px-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustHighlights.map(([title, desc]) => (
                <div key={title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-base font-bold text-slate-900">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl gap-4 px-4 text-sm text-slate-500 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">Chuẩn giao diện cho đối tác Nhật / Hàn / EU</div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">CMS dễ cập nhật nội dung pháp luật</div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">Cấu trúc dự án dạng portfolio có bộ lọc</div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">CTA nổi: Call / Zalo / Form nhanh</div>
          </div>
        </section>

        <section id="trust" className="bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8AB640]">Tại sao chọn Golden Life</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Nền tảng uy tín giúp doanh nghiệp yên tâm khi triển khai dịch vụ môi trường
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Chúng tôi tập trung vào tính rõ ràng, tiến độ và hiệu quả triển khai để doanh nghiệp dễ ra quyết định và dễ kiểm soát rủi ro trong vận hành.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {trustReasons.map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="inline-flex rounded-xl bg-[#F8F2DE] px-3 py-1 text-xs font-semibold text-[#C99A2E]">
                    Trust point
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {trustBadges.map(([value, label]) => (
                <div key={label} className="rounded-[24px] bg-[#6F9530] p-5 text-white shadow-sm">
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="mt-1 text-sm text-white/85">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8AB640]">Danh mục dịch vụ</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Các dịch vụ môi trường trọng tâm cho doanh nghiệp
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Danh mục dịch vụ được xây dựng theo đúng nhu cầu thực tế của doanh nghiệp sản xuất, nhà máy và khách hàng B2B.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {services.map((service, idx) => (
                <article
                  key={service.title}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <img src={service.image} alt={service.title} className="h-48 w-full bg-slate-100 object-cover" loading="lazy" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{service.desc}</p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#8AB640]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => { window.location.href = slugifyPath(service.slug); }}
                      className="mt-5 inline-flex text-sm font-semibold text-[#8AB640]"
                    >
                      Chi tiết →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="service-landing" className="bg-[#F8F2DE] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Chi tiết dịch vụ môi trường
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Mỗi dịch vụ được trình bày theo cấu trúc rõ ràng, giúp doanh nghiệp dễ nắm thông tin, hiểu quy trình triển khai và đưa ra quyết định nhanh hơn.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {serviceLandings.map((item, idx) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => { window.location.href = slugifyPath(item.slug); }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    idx === selectedLanding
                      ? "bg-[#8AB640] text-white shadow-sm"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-[#8AB640] hover:text-[#8AB640]"
                  }`}
                >
                  {item.navTitle}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                  {currentServiceLanding.heroTitle}
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  {currentServiceLanding.heroDesc}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {currentServiceLanding.benefits.map((benefit) => (
                    <div key={benefit} className="rounded-[22px] border border-[#E7D8A9] bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#8AB640]" />
                        <p className="text-sm leading-7 text-slate-700">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <ScrollButton
                    targetId="contact"
                    className="rounded-xl bg-[#8AB640] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#6F9530]"
                  >
                    {currentServiceLanding.cta}
                  </ScrollButton>
                  <ScrollButton
                    targetId="legal"
                    className="rounded-xl border border-[#C99A2E] px-6 py-3 text-sm font-semibold text-[#C99A2E] hover:bg-white"
                  >
                    Xem bài viết liên quan
                  </ScrollButton>
                </div>
              </div>

              <div>
                <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C99A2E] shadow-sm">
                  URL: {slugifyPath(currentServiceLanding.slug)}
                </div>
                <img
                  src={currentServiceLanding.image}
                  alt={currentServiceLanding.heroTitle}
                  className="rounded-[32px] shadow-2xl"
                />
              </div>
            </div>

            <div className="mt-14 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[28px] bg-white p-7 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8AB640]">
                  Quy trình triển khai
                </div>
                <div className="mt-6 space-y-5">
                  {currentServiceLanding.process.map((item, idx) => (
                    <div key={item.step} className="flex gap-4 rounded-[20px] border border-slate-200 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8AB640] text-sm font-bold text-white">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.step}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C99A2E]">
                  Câu hỏi thường gặp
                </div>
                <div className="mt-6 space-y-4">
                  {currentServiceLanding.faq.map((item) => (
                    <div key={item.question} className="rounded-[20px] border border-slate-200 p-5">
                      <h3 className="text-base font-bold text-slate-900">{item.question}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C99A2E]">Case study tiêu biểu</div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                  Một số tình huống doanh nghiệp thường gặp và cách Golden Life triển khai
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Trình bày theo dạng case study giúp khách hàng B2B hiểu nhanh giá trị thực tế, quy trình xử lý và kết quả đầu ra.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                {[
                  "Tất cả",
                  "FDI",
                  "Công nghiệp",
                  "Thực phẩm",
                ].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`rounded-full px-4 py-2 font-medium ${
                      filter === "Tất cả"
                        ? "bg-[#8AB640] text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-2 bg-gradient-to-r from-[#8AB640] via-[#EDBB4C] to-[#8AB640]" />
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#8AB640]">{project.category}</div>
                      <div className="rounded-full bg-[#F8F2DE] px-3 py-1 text-xs font-semibold text-[#C99A2E]">
                        Case study
                      </div>
                    </div>

                    <h3 className="mt-3 text-xl font-bold leading-8 text-slate-900">{project.name}</h3>
                    <p className="mt-3 text-sm font-medium text-slate-700">Kết quả: {project.result}</p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Bài toán</div>
                        <p className="mt-1 text-sm leading-7 text-slate-600">{project.challenge}</p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Giải pháp</div>
                        <p className="mt-1 text-sm leading-7 text-slate-600">{project.solution}</p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Tác động</div>
                        <p className="mt-1 text-sm leading-7 text-slate-600">{project.impact}</p>
                      </div>
                    </div>

                    <ScrollButton targetId="contact" className="mt-6 inline-flex text-sm font-semibold text-[#C99A2E] hover:text-[#8AB640]">
                      Xem chi tiết case study →
                    </ScrollButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="legal" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8AB640]">Thư viện pháp luật</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Thư viện pháp luật môi trường cho doanh nghiệp sản xuất & B2B
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Nội dung được xây dựng theo cấu trúc chuyên sâu, bám sát Luật Bảo vệ môi trường và các nghị định hướng dẫn hiện hành, giúp doanh nghiệp hiểu đúng quy định, chuẩn bị hồ sơ đầy đủ và chủ động kiểm soát rủi ro pháp lý trong quá trình vận hành.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {legalArticles.map((article) => (
                <article key={article.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#C99A2E]">Bài viết chuyên môn</div>
                    <div className="rounded-full bg-[#F8F2DE] px-3 py-1 text-[11px] font-semibold text-[#8AB640]">{article.silo}</div>
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-8">{article.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{article.desc}</p>
                  <p className="mt-4 text-xs leading-6 text-slate-500">{article.source}</p>
                  <ScrollButton targetId="service-landing" className="mt-5 inline-flex text-sm font-semibold text-[#8AB640] hover:text-[#6F9530]">
                    Xem bài viết liên quan →
                  </ScrollButton>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#6F9530] py-16 text-white lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-green-300">Liên hệ nhanh</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
                Tư vấn & triển khai giải pháp môi trường chuyên nghiệp cho doanh nghiệp
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Đội ngũ chuyên gia của Golden Life sẽ giúp bạn rà soát hiện trạng, tư vấn giải pháp phù hợp và triển khai hồ sơ môi trường nhanh chóng, đúng quy định. Chúng tôi tập trung vào hiệu quả thực tế, giúp doanh nghiệp giảm rủi ro pháp lý và vận hành ổn định.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Hotline", "0909 398 862"],
                  ["Email", "sales@golden-life.com.vn"],
                  ["Khu vực", "TP. HCM / Bình Dương / Đồng Nai / Long An / Tây Ninh"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                    <div className="text-sm text-slate-400">{label}</div>
                    <div className="mt-1 font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-700 bg-white p-6 text-slate-900 shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold">Nhận tư vấn miễn phí</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Điền thông tin để được tư vấn giải pháp môi trường phù hợp với doanh nghiệp của bạn. Golden Life sẽ hỗ trợ đánh giá hiện trạng, đề xuất hướng xử lý và lộ trình triển khai rõ ràng, đúng quy định.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-0"
                  placeholder="Tên công ty"
                />
                <input
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-0"
                  placeholder="Người liên hệ"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-0"
                  placeholder="Số điện thoại"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-0"
                  placeholder="Nhu cầu của doanh nghiệp"
                />

                {formError ? <p className="text-sm font-medium text-red-600">{formError}</p> : null}
                {formSuccess ? <p className="text-sm font-medium text-[#6F9530]">{formSuccess}</p> : null}

                <button
                  type="submit"
                  className="block w-full rounded-xl bg-[#8AB640] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#6F9530]"
                >
                  Gửi yêu cầu tư vấn
                </button>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-500">
                  Preview hiện đang mô phỏng lưu lead vào trình duyệt và mở email/Zalo. Khi triển khai production, form này nên kết nối API để lưu database thật và gửi thông báo tự động.
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>© 2026 Golden Life. Thiết kế tối ưu cho doanh nghiệp dịch vụ môi trường.</div>
          <div className="flex gap-5">
            <ScrollButton targetId="about" className="hover:text-[#C99A2E]">Giới thiệu công ty</ScrollButton>
            <ScrollButton targetId="legal" className="hover:text-[#C99A2E]">Tin tức</ScrollButton>
            <ScrollButton targetId="contact" className="hover:text-[#C99A2E]">Liên hệ</ScrollButton>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <ScrollButton targetId="contact" className="rounded-full bg-[#8AB640] px-5 py-3 text-sm font-semibold text-white shadow-lg">
          Zalo
        </ScrollButton>
        <a href="tel:0909398862" className="rounded-full bg-[#EDBB4C] px-5 py-3 text-sm font-semibold text-white shadow-lg">
          Gọi ngay
        </a>
      </div>
    </div>
  );
}
