import { useMemo, useState } from 'react';
import {
  Search, MapPin, Bell, ChevronLeft, Sparkles, Palette, Scissors,
  Camera, CakeSlice, Wrench, Monitor, Star, Heart, MessageCircle,
  Bookmark, Plus, Wallet, ArrowUpLeft, Compass, Store, Users, UserRound,
  SlidersHorizontal, BadgeCheck, TrendingUp, Clock3, ArrowLeft, X
} from 'lucide-react';

const categories = [
  { name: 'الكل', icon: Sparkles },
  { name: 'تصميم', icon: Palette },
  { name: 'تصوير', icon: Camera },
  { name: 'حلويات', icon: CakeSlice },
  { name: 'جمال', icon: Scissors },
  { name: 'صيانة', icon: Wrench },
  { name: 'تقنية', icon: Monitor },
];

const services = [
  { id: 1, name: 'استوديو لونا', kind: 'تصوير وهوية بصرية', category: 'تصوير', rating: '4.9', reviews: 128, price: 'يبدأ من 350 ج.م', area: 'المعادي، القاهرة', image: 'photo-1531058020387-3be344556be6', badge: 'اختيار المجتمع', tint: 'lavender' },
  { id: 2, name: 'سكر وورد', kind: 'كيك حسب الطلب', category: 'حلويات', rating: '4.8', reviews: 96, price: 'يبدأ من 280 ج.م', area: 'الجيزة', image: 'photo-1578985545062-69928b1d9587', badge: 'الأكثر طلبًا', tint: 'peach' },
  { id: 3, name: 'لمسة فن', kind: 'تصميم شعارات وهويات', category: 'تصميم', rating: '5.0', reviews: 74, price: 'يبدأ من 500 ج.م', area: 'عن بُعد', image: 'photo-1531058020387-3be344556be6', badge: 'موهبة صاعدة', tint: 'blue' },
  { id: 4, name: 'ورشة عماد', kind: 'صيانة منزلية', category: 'صيانة', rating: '4.7', reviews: 63, price: 'معاينة حسب الطلب', area: 'فيصل، الجيزة', image: 'photo-1621905251189-08b45d6a269e', badge: 'قريب منك', tint: 'mint' },
  { id: 5, name: 'نورا بيوتي', kind: 'تجميل وعناية', category: 'جمال', rating: '4.9', reviews: 112, price: 'يبدأ من 200 ج.م', area: 'مدينة نصر', image: 'photo-1522335789203-aabd1fc54bc9', badge: 'تقييم مرتفع', tint: 'rose' },
];

const posts = [
  { id: 1, name: 'مريم حسن', handle: 'mariam.design', avatar: 'photo-1534528741775-53994a69daeb', time: 'منذ ٢ س', text: 'خلصت هوية بصرية جديدة لمشروع صغير بيبدأ حلمه النهارده ✨ إيه أكتر تفصيلة شدت انتباهكم؟', tags: '#هوية_بصرية  #مشاريع_صغيرة', image: 'photo-1558655146-9f40138edfeb', likes: 48, comments: 12 },
  { id: 2, name: 'سكر وورد', handle: 'sugar.word', avatar: 'photo-1551836022-d5d88e9218df', time: 'منذ ٥ س', text: 'ألوان الأسبوع ده كلها بهجة 🍰 بنجهز طلباتكم بحب، والحجز مفتوح لنهاية الأسبوع.', tags: '#حلويات_بيتي  #صنع_بإيدينا', image: 'photo-1578985545062-69928b1d9587', likes: 83, comments: 19 },
];

const imageUrl = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function Brand() {
  return <div className="brand-mark" aria-label="هاوي"><span className="brand-symbol">هـ</span><span className="brand-name">هاوي<span className="brand-dot">.</span></span></div>;
}

function ServiceCard({ service, saved, onSave, onOpen }) {
  return (
    <article className="service-card">
      <button className="service-image-button" onClick={() => onOpen(service)} aria-label={`عرض متجر ${service.name}`}>
        <img className="service-image" src={imageUrl(service.image)} alt={service.kind} loading="lazy" />
        <span className="service-badge"><Sparkles size={12} />{service.badge}</span>
      </button>
      <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => onSave(service.id)} aria-label={saved ? 'إزالة من المحفوظات' : 'حفظ المتجر'}>
        <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <div className="service-body">
        <div className="service-title-line">
          <div><h3>{service.name}</h3><p>{service.kind}</p></div>
          <span className="rating"><Star size={13} fill="currentColor" /> {service.rating}</span>
        </div>
        <div className="service-meta"><span><MapPin size={13} />{service.area}</span><span>{service.reviews} تقييم</span></div>
        <div className="service-footer"><strong>{service.price}</strong><button className="text-action" onClick={() => onOpen(service)}>زيارة المتجر <ChevronLeft size={15} /></button></div>
      </div>
    </article>
  );
}

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return <article className="post-card">
    <div className="post-head">
      <img className="avatar" src={imageUrl(post.avatar, 120)} alt="" />
      <div className="post-author"><strong>{post.name}</strong><span>@{post.handle} · {post.time}</span></div>
      <button className="icon-button more-button" aria-label="خيارات المنشور"><span>•••</span></button>
    </div>
    <p className="post-text">{post.text}</p>
    <p className="post-tags">{post.tags}</p>
    <img className="post-image" src={imageUrl(post.image)} alt="من أعمال مقدم الخدمة" loading="lazy" />
    <div className="post-stats"><span>{post.likes + (liked ? 1 : 0)} إعجاب</span><span>{post.comments} تعليق · مشاركة</span></div>
    <div className="post-actions">
      <button className={liked ? 'active' : ''} onClick={() => setLiked(!liked)}><Heart size={18} fill={liked ? 'currentColor' : 'none'} /> إعجاب</button>
      <button onClick={() => alert('المحادثات ستُربط بالخدمة الخلفية في المرحلة التالية.')}><MessageCircle size={18} /> تعليق</button>
      <button className={saved ? 'active' : ''} onClick={() => setSaved(!saved)}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /> حفظ</button>
    </div>
  </article>;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  const [savedIds, setSavedIds] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [area, setArea] = useState('كل المناطق');
  const [sort, setSort] = useState('الأكثر تميزًا');

  const filteredServices = useMemo(() => services.filter((service) => {
    const matchesCategory = activeCategory === 'الكل' || service.category === activeCategory;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [service.name, service.kind, service.category, service.area].some((v) => v.toLowerCase().includes(q));
    const matchesArea = area === 'كل المناطق' || service.area.includes(area);
    return matchesCategory && matchesQuery && matchesArea;
  }), [activeCategory, query, area]);

  const toggleSave = (id) => setSavedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="sidebar-brand"><Brand /><span className="beta-label">مساحة جديدة</span></div>
      <button className={`side-link ${activeTab === 'discover' ? 'selected' : ''}`} onClick={() => setActiveTab('discover')}><Compass size={19} /> اكتشف</button>
      <button className={`side-link ${activeTab === 'community' ? 'selected' : ''}`} onClick={() => setActiveTab('community')}><Users size={19} /> المجتمع <span className="side-count">جديد</span></button>
      <button className={`side-link ${activeTab === 'stores' ? 'selected' : ''}`} onClick={() => setActiveTab('stores')}><Store size={19} /> المتاجر</button>
      <button className={`side-link ${activeTab === 'wallet' ? 'selected' : ''}`} onClick={() => setActiveTab('wallet')}><Wallet size={19} /> المحفظة</button>
      <div className="sidebar-spacer" />
      <div className="creator-card"><div className="creator-orb"><Sparkles size={20} /></div><strong>عندك موهبة؟</strong><p>خلّي شغلك يوصل لناس أكتر.</p><button onClick={() => alert('سيتم تفعيل إنشاء المتجر عند ربط التسجيل والخدمات الخلفية.')}>ابدأ متجرك <ArrowLeft size={15} /></button></div>
      <button className="side-link muted-link" onClick={() => alert('إعدادات الحساب والخصوصية ضمن مراحل التنفيذ التالية.')}><SlidersHorizontal size={19} /> الإعدادات</button>
      <div className="sidebar-profile"><img className="avatar" src={imageUrl('photo-1500648767791-00dcc994a43e', 100)} alt="" /><div><strong>أحمد محمد</strong><span>حساب تجريبي</span></div><ChevronLeft size={16} /></div>
    </aside>

    <main className="main-content">
      <header className="topbar">
        <div className="mobile-brand"><Brand /></div>
        <div className="location-chip"><MapPin size={16} /><span><small>بتدور فين؟</small><strong>{area === 'كل المناطق' ? 'كل المناطق' : area}</strong></span><ChevronLeft size={15} /></div>
        <div className="topbar-actions"><button className="icon-button" aria-label="الإشعارات" onClick={() => alert('مركز الإشعارات سيتم ربطه لاحقًا.')}><Bell size={19} /><i /></button><button className="create-button" onClick={() => alert('إنشاء منشور أو عرض سيُفعّل بعد تجهيز الحسابات.') }><Plus size={17} /> شارك شغلك</button></div>
      </header>

      {activeTab === 'wallet' ? <section className="page-section wallet-page">
        <div className="section-kicker"><Wallet size={16} /> فلوسك في مكان واحد</div><h1>محفظة هاوي</h1><p className="page-lead">تابع رصيدك وحركاتك المالية بكل وضوح وأمان.</p>
        <div className="wallet-panel"><div className="wallet-panel-top"><span>الرصيد التجريبي</span><span className="secure-tag"><BadgeCheck size={14} /> واجهة تجريبية</span></div><div className="wallet-balance">٠٫٠٠ <small>ج.م</small></div><p>المحفظة غير مرتبطة بمدفوعات حقيقية حتى الآن.</p><div className="wallet-buttons"><button onClick={() => alert('سيتم الربط بمزود الدفع بعد استكمال متطلبات التعاقد والترخيص.')}>إضافة رصيد <Plus size={16} /></button><button className="secondary-button" onClick={() => alert('السحب سيُتاح لمقدمي الخدمة بعد التحقق من الحساب وربط مزود الدفع.')}>طلب سحب <ArrowUpLeft size={16} /></button></div></div>
        <div className="section-heading"><div><h2>آخر الحركات</h2><p>كل معاملاتك هتظهر هنا</p></div></div><div className="empty-state"><div className="empty-icon"><Clock3 size={23} /></div><strong>لسه مفيش حركات مالية</strong><p>لما تبدأ تستخدم المحفظة، هتلاقي تفاصيل معاملاتك هنا.</p></div>
      </section> : activeTab === 'community' ? <section className="page-section"><div className="section-kicker"><Users size={16} /> ناس بتصنع فرق</div><h1>مجتمع هاوي</h1><p className="page-lead">أفكار وأعمال ومواهب تستحق إنها تتشاف.</p><div className="community-tabs"><button className="active">لك</button><button>بتتابعهم</button><button>الأحدث</button></div><div className="feed">{posts.map(post => <PostCard key={post.id} post={post} />)}</div></section> : activeTab === 'stores' ? <section className="page-section"><div className="section-kicker"><Store size={16} /> شغل يستاهل يتشاف</div><h1>متاجر مميزة</h1><p className="page-lead">اختار مقدم الخدمة اللي يناسبك، وشوف شغله وتقييمات الناس.</p><div className="service-grid">{services.map(s => <ServiceCard key={s.id} service={s} saved={savedIds.includes(s.id)} onSave={toggleSave} onOpen={setSelectedService} />)}</div></section> : <section className="page-section">
        <div className="hero-banner"><div className="hero-glow glow-one" /><div className="hero-glow glow-two" /><div className="hero-content"><span className="hero-eyebrow"><Sparkles size={14} /> المكان اللي موهبتك تستاهله</span><h1>كل موهبة وراها حكاية.<br /><span>خلّي حكايتك تبدأ هنا.</span></h1><p>اكتشف ناس شاطرة، خدمات قريبة منك، ومشاريع صغيرة تستحق دعمك.</p><button className="hero-cta" onClick={() => { setActiveTab('stores'); setActiveCategory('الكل'); }}>اكتشف المتاجر <ArrowLeft size={17} /></button></div><div className="hero-art" aria-hidden="true"><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="art-card card-top"><Palette size={18} /><span>إبداع</span></div><div className="art-card card-bottom"><Star size={17} fill="currentColor" /><span>موهبة تستاهل</span></div><div className="art-core"><span>هـ</span></div></div><div className="hero-footnote"><span className="pulse-dot" /> مجتمع محلي يكبر بيك</div></div>

        <div className="search-row"><div className="search-box"><Search size={20} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="بتدور على إيه؟ تصميم، حلويات، صيانة..." aria-label="ابحث عن خدمة أو متجر" />{query && <button onClick={() => setQuery('')} aria-label="مسح البحث"><X size={16} /></button>}</div><button className={`filter-button ${showFilters ? 'filter-active' : ''}`} onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={18} /><span>فلترة</span></button></div>
        {showFilters && <div className="filters-panel"><label>المنطقة<select value={area} onChange={e => setArea(e.target.value)}><option>كل المناطق</option><option>القاهرة</option><option>الجيزة</option><option>المعادي</option><option>مدينة نصر</option><option>فيصل</option></select></label><label>ترتيب النتائج<select value={sort} onChange={e => setSort(e.target.value)}><option>الأكثر تميزًا</option><option>الأعلى تقييمًا</option><option>الأحدث</option></select></label><button onClick={() => { setArea('كل المناطق'); setSort('الأكثر تميزًا'); }}>مسح الفلاتر</button></div>}

        <div className="category-row">{categories.map(({name, icon: Icon}) => <button key={name} className={`category-chip ${activeCategory === name ? 'active' : ''}`} onClick={() => setActiveCategory(name)}><Icon size={17} />{name}</button>)}</div>
        <div className="section-heading"><div><div className="section-kicker"><Sparkles size={15} /> مختارة ليك</div><h2>خدمات تستاهل تكتشفها</h2><p>أصحاب شغل مميزين، قريبين منك أو أونلاين.</p></div><button className="view-all" onClick={() => setActiveTab('stores')}>كل المتاجر <ChevronLeft size={16} /></button></div>
        {filteredServices.length ? <div className="service-grid">{filteredServices.map(service => <ServiceCard key={service.id} service={service} saved={savedIds.includes(service.id)} onSave={toggleSave} onOpen={setSelectedService} />)}</div> : <div className="empty-state"><Search size={24} /><strong>ملقيناش نتائج مطابقة</strong><p>جرّب كلمة بحث مختلفة أو غيّر المنطقة.</p><button onClick={() => { setQuery(''); setActiveCategory('الكل'); setArea('كل المناطق'); }}>عرض كل الخدمات</button></div>}

        <div className="section-heading community-heading"><div><div className="section-kicker"><Users size={15} /> من مجتمع هاوي</div><h2>شغل الناس وحكاياتهم</h2><p>تابع الرحلة، مش بس النتيجة.</p></div><button className="view-all" onClick={() => setActiveTab('community')}>روح للمجتمع <ChevronLeft size={16} /></button></div>
        <div className="feed">{posts.slice(0, 1).map(post => <PostCard key={post.id} post={post} />)}</div>
      </section>}
    </main>

    <aside className="right-rail">
      <div className="rail-welcome"><span className="welcome-spark"><Sparkles size={17} /></span><div><strong>أهلًا بيك في هاوي</strong><p>مكان يجمع الموهبة بالفرصة.</p></div></div>
      <div className="rail-card wallet-mini"><div className="rail-card-head"><span><Wallet size={17} /> محفظتك</span><span className="soon-tag">قريبًا</span></div><strong className="mini-balance">٠٫٠٠ <small>ج.م</small></strong><p>رصيد تجريبي · بدون معاملات حقيقية</p><button onClick={() => setActiveTab('wallet')}>تفاصيل المحفظة <ChevronLeft size={15} /></button></div>
      <div className="rail-card"><div className="rail-title"><h3>الأكثر تميزًا</h3><TrendingUp size={17} /></div>{services.slice(0, 3).map((s, i) => <button className="trending-store" key={s.id} onClick={() => setSelectedService(s)}><span className={`trend-number n-${i+1}`}>0{i+1}</span><img src={imageUrl(s.image, 120)} alt="" /><span className="trend-copy"><strong>{s.name}</strong><small>{s.kind}</small><span><Star size={11} fill="currentColor" /> {s.rating} · {s.reviews} تقييم</span></span><ChevronLeft size={15} /></button>)}</div>
      <div className="rail-card community-promo"><div className="promo-icon"><Users size={21} /></div><h3>مكانك وسط مجتمعك</h3><p>تابع مقدمي الخدمات، شارك خبرتك، وخلي شغلك يوصل لناس جديدة.</p><button onClick={() => setActiveTab('community')}>اكتشف المجتمع <ArrowLeft size={15} /></button></div>
      <div className="rail-footer"><span>هاوي © 2026</span><span>معمول عشان المواهب تكبر.</span></div>
    </aside>

    <nav className="mobile-nav" aria-label="التنقل الرئيسي">
      <button className={activeTab === 'discover' ? 'active' : ''} onClick={() => setActiveTab('discover')}><Compass size={20} /><span>اكتشف</span></button>
      <button className={activeTab === 'community' ? 'active' : ''} onClick={() => setActiveTab('community')}><Users size={20} /><span>المجتمع</span></button>
      <button className="mobile-create" onClick={() => alert('إنشاء المحتوى سيُفعّل بعد تجهيز الحسابات.')}><Plus size={22} /></button>
      <button className={activeTab === 'stores' ? 'active' : ''} onClick={() => setActiveTab('stores')}><Store size={20} /><span>المتاجر</span></button>
      <button className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}><Wallet size={20} /><span>محفظتي</span></button>
    </nav>

    {selectedService && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedService(null)}><section className="store-modal" role="dialog" aria-modal="true" aria-labelledby="store-modal-title" onClick={e => e.stopPropagation()}><button className="modal-close icon-button" onClick={() => setSelectedService(null)} aria-label="إغلاق"><X size={19} /></button><img className="modal-cover" src={imageUrl(selectedService.image)} alt="" /><div className="modal-content"><span className="service-badge"><Sparkles size={12} />{selectedService.badge}</span><h2 id="store-modal-title">{selectedService.name}</h2><p>{selectedService.kind}</p><div className="modal-rating"><Star size={15} fill="currentColor" /> {selectedService.rating} <span>({selectedService.reviews} تقييم)</span><span>·</span><MapPin size={14} /> {selectedService.area}</div><div className="modal-price">{selectedService.price}</div><p className="modal-note">دي صفحة متجر تجريبية. تفاصيل الأعمال، التواصل، والطلب هتتربط بالخدمات الخلفية في مراحل التنفيذ التالية.</p><button className="hero-cta full-cta" onClick={() => { setSelectedService(null); alert('إرسال الطلب والمحادثة يحتاجان تسجيل دخول وربط API.'); }}>تواصل مع المتجر <MessageCircle size={17} /></button></div></section></div>}
  </div>;
}