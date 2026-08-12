# Premium Hair Transplant Clinic — Frontend Development Prompt

Sıfırdan, **yalnızca frontend odaklı**, modern ve premium görünümlü bir saç ekim kliniği web sitesi geliştir.

## 1. Projenin amacı

Bu proje bir saç ekim kliniğinin müşterilerine yönelik **yüksek kaliteli, güven veren ve görsel olarak etkileyici bir tanıtım/landing website'i** olacaktır.

**Admin paneli oluşturma.**

Backend, CMS, dashboard, admin paneli veya gereksiz CRUD sistemleri oluşturma.

Öncelik:

* Görsel kalite
* Premium his
* Akıcı kullanıcı deneyimi
* Modern animasyonlar
* Mobil uyumluluk
* Hızlı yükleme
* Güven veren klinik görünümü
* Kullanıcıyı sayfada tutan görsel akış

Site kesinlikle klasik, düz ve statik bir kurumsal web sitesi gibi görünmemeli.

---

# 2. Teknoloji

Aşağıdaki stack'i kullan:

* React
* TypeScript
* Vite
* Tailwind CSS
* GSAP
* Lenis veya benzeri smooth-scroll çözümü
* Lucide Icons

Animasyonlarda öncelikle **GSAP** kullan.

Gereksiz yere ağır kütüphaneler ekleme.

Three.js/WebGL yalnızca gerçekten görsel deneyime ciddi katkı sağlayacaksa kullanılmalı.

---

# 3. Tasarım anlayışı

Tasarımın temel prensibi:

> **Luxury medical clinic + modern editorial design + cinematic scrolling**

Site:

* Premium
* Minimal
* Zarif
* Modern
* Güvenilir
* Sinematik
* Akışkan

olmalı.

Ancak **minimal = boş ve düz** olmamalı.

Beyaz arka plan + siyah yazı + birkaç karttan oluşan klasik kurumsal tasarım istemiyorum.

Sayfada:

* Büyük tipografi
* Büyük kaliteli görseller
* Asimetrik layoutlar
* Katmanlı görseller
* Yumuşak gradientler
* Subtle shadows
* Glass efektleri gerektiği yerlerde
* Hover efektleri
* Scroll animasyonları
* Image reveal animasyonları
* Text reveal animasyonları
* Parallax
* Scale animasyonları
* Smooth section transitions

kullan.

Fakat animasyonları abartma.

Amaç:

> "Bak burada animasyon var."

hissi değil,

> "Bu site inanılmaz akıcı."

hissi oluşturmak.

---

# 4. Sayfanın genel akışı

Ana sayfa bir hikâye gibi ilerlemeli.

Kullanıcı siteye girdiğinde bir anda bütün bilgileri görmek yerine, sayfa aşağı doğru indikçe klinik ve saç ekimi deneyimi anlatılmalı.

Önerilen akış:

## HERO

Tam ekran premium hero section.

Büyük ve etkileyici bir saç/saç ekimi görseli veya yüksek kaliteli video kullanılabilir.

Örneğin:

"YOUR NEW
CONFIDENCE"

veya Türkçe:

"Yeni görünümünüz.
Yeni güveniniz."

gibi güçlü bir başlık.

Hero içerisinde:

* Ana CTA
* İkincil CTA
* Minimal navigation
* Scroll indicator

bulunsun.

Hero açılışında:

* Başlık kelime kelime veya satır satır reveal olsun.
* Görsel hafif scale-up yapsın.
* CTA'lar fade/slide ile gelsin.

---

# 5. TRUST / CLINIC INTRO

Hero'dan sonra doğrudan klasik "Hakkımızda" bölümü oluşturma.

Önce klinik güvenilirliğini hissettiren bir bölüm oluştur.

Örneğin:

"Natural results.
Precision.
Experience."

gibi büyük tipografi.

Ardından:

* Yıllık deneyim
* Gerçekleştirilen operasyon
* Hasta memnuniyeti
* Uzman ekip

gibi istatistikler animasyonlu şekilde gösterilebilir.

Sayılar scroll ile görünürken count-up animasyonu kullanılabilir.

---

# 6. BEFORE / AFTER

Sitenin en güçlü bölümlerinden biri olmalı.

Büyük bir Before / After karşılaştırma alanı oluştur.

Kullanıcı slider'ı sürükleyerek:

BEFORE ↔ AFTER

görsellerini karşılaştırabilsin.

Bu bölüm ekranın büyük bir kısmını kaplasın.

Slider üzerinde:

* Smooth drag
* Hover feedback
* Before/After labels
* Subtle animation

bulunsun.

Görsellerin kalitesi çok yüksek görünmeli.

---

# 7. HAIR TRANSPLANT PROCESS

Saç ekim sürecini klasik kart grid'i şeklinde gösterme.

Bunun yerine **horizontal/vertical storytelling** yaklaşımı kullan.

Örneğin:

01 — Consultation
02 — Analysis
03 — Planning
04 — Transplantation
05 — Recovery

Kullanıcı scroll yaptıkça süreç ilerlesin.

Aktif aşamanın:

* numarası
* başlığı
* açıklaması
* görseli

değişsin.

Bu bölüm sitenin en akıcı bölümlerinden biri olsun.

---

# 8. INTERACTIVE HAIRLINE / RESULT SECTION

Kullanıcıya saç ekimi sonucunu görsel olarak hissettirecek etkileyici bir section oluştur.

Büyük bir saç çizgisi / sonuç görseli kullanılabilir.

Scroll sırasında:

* görsel scale
* mask reveal
* text movement
* subtle parallax

kullan.

Amaç kullanıcıya:

> "Ben de böyle bir sonuç elde edebilirim."

hissini vermek.

---

# 9. TECHNIQUE SECTION

Klinikte kullanılan saç ekim tekniklerini göster.

Örneğin:

* FUE
* DHI
* Sapphire FUE

gibi teknikler.

Ancak bunları 3 tane düz kart halinde gösterme.

Daha editorial bir layout kullan.

Bir teknik seçildiğinde:

* büyük görsel
* teknik adı
* kısa açıklama
* avantajlar

smooth transition ile değişsin.

---

# 10. DOCTOR / EXPERT SECTION

Doktor veya uzman ekibi premium bir şekilde tanıt.

Büyük portrait fotoğraf kullanılabilir.

Hover veya scroll sırasında:

* fotoğraf hareketi
* isim
* uzmanlık
* deneyim

ortaya çıksın.

Kart tasarımından kaçın.

---

# 11. PATIENT TESTIMONIALS

Hasta yorumlarını klasik testimonial kartları şeklinde oluşturma.

Büyük tipografi kullan.

Örneğin:

> "Sonuçtan çok memnunum."

Yorum değiştikçe:

* hasta adı
* ülke
* operasyon bilgisi
* gerekiyorsa fotoğraf

smooth transition ile değişsin.

---

# 12. FAQ

FAQ bölümünü sade ve modern accordion yapısında oluştur.

Her soru açıldığında:

* smooth height animation
* icon rotation
* opacity transition

kullan.

---

# 13. FINAL CTA

Sayfanın sonunda çok güçlü bir CTA oluştur.

Örneğin:

"Your new look
starts here."

Altında:

"Ücretsiz Konsültasyon"

CTA butonu.

Bu bölüm görsel olarak sayfanın final sahnesi gibi hissettirmeli.

---

# 14. NAVBAR

Navbar sade fakat premium olmalı.

Desktop:

Logo | Treatments | Results | Process | About | Contact | CTA

Mobilde:

Hamburger menu.

Navbar scroll sırasında:

* başlangıçta transparan
* scroll sonrası hafif blur/backdrop
* smooth transition

şeklinde değişebilir.

---

# 15. ANİMASYON KURALLARI

Animasyonlar profesyonel olmalı.

Kullan:

* Fade
* Slide
* Scale
* Clip-path reveal
* Image reveal
* Parallax
* Text reveal
* Stagger
* Smooth scrolling
* Scroll-triggered animations

Kaçın:

* Aşırı bounce
* Sürekli hareket eden elementler
* Gereksiz spinning
* Fazla neon efekt
* Her elemente animasyon verme
* Kullanıcıyı yoran hareketler

Animasyonların çoğu **subtle ve premium** olmalı.

---

# 16. MICRO INTERACTIONS

Butonlarda:

* Hover
* Magnetic/subtle movement
* Background transition
* Arrow movement

kullanılabilir.

Görsellerde:

* Hover zoom
* Mask reveal
* Cursor interaction

kullanılabilir.

Ancak her şeyi animasyonlu yapma.

---

# 17. RESPONSIVE DESIGN

Site tamamen responsive olmalı.

Özellikle:

* Desktop
* Laptop
* Tablet
* Mobile

için ayrı layout kararları alınmalı.

Mobilde desktop animasyonlarını birebir kopyalama.

Mobil performansını koru.

---

# 18. PERFORMANCE

Görsel kalite yüksek olmasına rağmen site hızlı olmalı.

Dikkat et:

* Lazy loading
* Image optimization
* WebP/AVIF
* Code splitting
* Gereksiz JS kullanmama
* Gereksiz animation hesaplamalarından kaçınma

GSAP animasyonlarını mümkün olduğunca `transform` ve `opacity` üzerinden oluştur.

Layout thrashing oluşturma.

---

# 19. ACCESSIBILITY

Site yalnızca görsel olarak güzel değil, teknik olarak da kaliteli olmalı.

* Semantic HTML
* Alt text
* Keyboard navigation
* Focus states
* Accessible buttons
* Sufficient contrast
* Reduced motion desteği

ekle.

`prefers-reduced-motion` desteği oluştur.

---

# 20. COMPONENT MİMARİSİ

Kodun tamamını tek dosyada yazma.

Component yapısı oluştur.

Örneğin:

src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── TrustSection.tsx
│   ├── BeforeAfter.tsx
│   ├── ProcessSection.tsx
│   ├── Techniques.tsx
│   ├── DoctorSection.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── FinalCTA.tsx
│   └── Footer.tsx
│
├── animations/
│   ├── heroAnimations.ts
│   ├── scrollAnimations.ts
│   └── revealAnimations.ts
│
├── data/
│   └── siteData.ts
│
├── pages/
│   └── Home.tsx
│
└── App.tsx

Kod okunabilir, modüler ve sürdürülebilir olsun.

---

# 21. CONTENT

Gerçek klinik bilgileri elimizde olmadığı için:

* Uydurma doktor isimleri
* Uydurma hasta sayıları
* Uydurma başarı oranları
* Uydurma klinik sertifikaları
* Uydurma yorumlar

kullanma.

Bunların yerine kolayca değiştirilebilecek placeholder içerikler kullan.

Örneğin:

[CLINIC NAME]

[DOCTOR NAME]

[YEARS OF EXPERIENCE]

[NUMBER OF PROCEDURES]

[TESTIMONIAL]

şeklinde placeholder kullan.

---

# 22. EN ÖNEMLİ TASARIM KURALI

Bu siteyi **"birkaç section koyulmuş kurumsal web sitesi"** gibi tasarlama.

Siteyi bir **digital experience** olarak düşün.

Kullanıcı:

Hero
↓
Trust
↓
Results
↓
Process
↓
Technology
↓
Doctor
↓
Testimonials
↓
CTA

şeklinde ilerlerken her bölüm bir öncekinin devamı gibi hissettirmeli.

Bölümler arasında sert kesimler yerine:

* smooth transitions
* overlapping elements
* image transitions
* background transitions
* typography transitions

kullan.

Siteye giren kişi:

**"Bu sıradan bir saç ekim sitesi değil."**

hissine kapılmalı.

---

# 23. SON KURAL

İlk olarak bütün siteyi kodlamaya çalışma.

Önce:

1. Proje yapısını oluştur.
2. Global typography sistemini oluştur.
3. Renk sistemini oluştur.
4. Navbar oluştur.
5. Hero section oluştur.
6. Hero animasyonlarını tamamla.
7. Ardından section'ları sırayla geliştir.
8. Her section tamamlandığında responsive kontrol yap.
9. En sonunda tüm sayfanın scroll deneyimini optimize et.

Kod kalitesinden ödün verme.

**Öncelik sırası:**

1. Visual quality
2. User experience
3. Smooth animations
4. Performance
5. Responsive design
6. Accessibility
7. Clean architecture

Sonuç, premium bir saç ekim kliniğinin **2026 seviyesinde modern, sinematik ve yüksek dönüşüm odaklı frontend deneyimi** olmalı.
