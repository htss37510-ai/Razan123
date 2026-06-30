import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Bell, Moon, Sun, ShieldCheck, FileText, ChevronLeft, X, Info } from 'lucide-react';
import { scheduleWeeklyReminder } from '../utils/notifications';
import './../App.css';

const Settings = () => {
  const navigate = useNavigate();
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('razan-theme') || 'light';
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('razan-notifications');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | null

  // Apply theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('razan-theme', theme);
  }, [theme]);

  // Apply notifications change
  useEffect(() => {
    localStorage.setItem('razan-notifications', JSON.stringify(notifications));
    scheduleWeeklyReminder(notifications);
  }, [notifications]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };

  return (
    <div className="settings-page fade-in">
      <div className="orders-header card">
        <button className="nav-icon-btn" onClick={() => navigate('/')} title="الرئيسية">
          <Home size={24} />
        </button>
        <h1>الإعدادات</h1>
      </div>

      {/* App Preferences Section */}
      <div className="settings-section card">
        <h2 className="settings-section-title">
          <Info size={20} className="accent-icon" /> تفضيلات التطبيق
        </h2>

        <div className="settings-list">
          {/* Notification Row */}
          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-icon-box">
                <Bell size={20} />
              </div>
              <div className="settings-item-text">
                <h3>إشعارات التطبيق</h3>
                <p>تفعيل أو إلغاء تلقي التنبيهات والإشعارات</p>
              </div>
            </div>
            <label className="switch-toggle">
              <input 
                type="checkbox" 
                checked={notifications} 
                onChange={toggleNotifications} 
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Theme Row */}
          <div className="settings-item">
            <div className="settings-item-info">
              <div className="settings-icon-box">
                {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              </div>
              <div className="settings-item-text">
                <h3>مظهر التطبيق</h3>
                <p>تغيير المظهر بين الوضع الفاتح والداكن</p>
              </div>
            </div>
            <button 
              className={`theme-toggle-btn ${theme === 'dark' ? 'dark' : 'light'}`}
              onClick={toggleTheme}
            >
              {theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
            </button>
          </div>
        </div>
      </div>

      {/* Support & Legal Section */}
      <div className="settings-section card" style={{ marginTop: '25px' }}>
        <h2 className="settings-section-title">
          <ShieldCheck size={20} className="accent-icon" /> الدعم والمعلومات القانونية
        </h2>

        <div className="settings-list">
          {/* Privacy Policy */}
          <div className="settings-item clickable" onClick={() => setActiveModal('privacy')}>
            <div className="settings-item-info">
              <div className="settings-icon-box">
                <ShieldCheck size={20} />
              </div>
              <div className="settings-item-text">
                <h3>سياسة الخصوصية</h3>
                <p>مراجعة كيفية حماية وإدارة بياناتك</p>
              </div>
            </div>
            <ChevronLeft size={20} className="chevron-icon" />
          </div>

          {/* Terms of Use */}
          <div className="settings-item clickable" onClick={() => setActiveModal('terms')}>
            <div className="settings-item-info">
              <div className="settings-icon-box">
                <FileText size={20} />
              </div>
              <div className="settings-item-text">
                <h3>شروط الاستخدام</h3>
                <p>قراءة الشروط والأحكام الخاصة باستعمال التطبيق</p>
              </div>
            </div>
            <ChevronLeft size={20} className="chevron-icon" />
          </div>
        </div>
      </div>

      {/* Version display */}
      <div className="settings-version">
        <p>مكتب الرزان العلمي - إصدار التطبيق 1.0.0</p>
      </div>

      {/* Modals for Privacy Policy & Terms of Use */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content settings-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{activeModal === 'privacy' ? 'سياسة الخصوصية' : 'شروط الاستخدام'}</h2>
              <button className="modal-close-btn" onClick={() => setActiveModal(null)}><X size={20} /></button>
            </div>
            <div className="modal-body settings-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto', textAlign: 'right', direction: 'rtl', padding: '20px', lineHeight: '1.8' }}>
              {activeModal === 'privacy' ? (
                <div>
                  <p>مرحباً بك في تطبيق مكتب الرزان العلمي لدعاية الأدوية. نحن نولي خصوصية بياناتك أهمية قصوى.</p>
                  <h4 style={{ marginTop: '15px', color: 'var(--primary)' }}>1. البيانات التي نجمعها</h4>
                  <p>تطبيقنا يعمل بشكل محلي بالكامل لترتيب طلبياتك وجردها. نقوم بحفظ قائمة الأدوية وسجل الطلبات على ذاكرة جهازك المحلية (Local Storage / Filesystem). لا نقوم برفع أو مشاركة هذه البيانات مع خوادم خارجية إلا عند قيامك بمشاركة الطلبية بنفسك.</p>
                  <h4 style={{ marginTop: '15px', color: 'var(--primary)' }}>2. حماية البيانات</h4>
                  <p>يتم تخزين جميع البيانات بشكل آمن على جهازك. يُنصح بحماية جهازك بكلمة مرور لمنع الوصول غير المصرح به إلى سجل الطلبيات الخاص بك.</p>
                  <h4 style={{ marginTop: '15px', color: 'var(--primary)' }}>3. التعديلات على السياسة</h4>
                  <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر للتوافق مع شروط المتاجر. سيتم توفير أي تغييرات مباشرة داخل هذا القسم.</p>
                  <p style={{ marginTop: '20px', fontWeight: 'bold' }}>للاستفسارات والدعم الفني، يرجى التواصل معنا عبر البريد الإلكتروني: hsynkraeem@gmail.com</p>
                </div>
              ) : (
                <div>
                  <p>باستخدامك لتطبيق مكتب الرزان العلمي، فإنك توافق على الشروط والأحكام التالية:</p>
                  <h4 style={{ marginTop: '15px', color: 'var(--primary)' }}>1. ترخيص الاستخدام</h4>
                  <p>يُمنح المندوبون والعملاء المصرح لهم فقط ترخيصاً لاستخدام هذا التطبيق لغرض جرد ومراجعة وطلب الأدوية المتاحة في مكتب الرزان العلمي.</p>
                  <h4 style={{ marginTop: '15px', color: 'var(--primary)' }}>2. مسؤولية المستخدم</h4>
                  <p>يتحمل المستخدم المسؤولية الكاملة عن صحة البيانات المدخلة في الطلبيات وعن حماية الجهاز من الاستخدام غير المصرح به. كلمة مرور مسح البيانات هي مسؤولية الإدارة ولا يجب مشاركتها.</p>
                  <h4 style={{ marginTop: '15px', color: 'var(--primary)' }}>3. حدود المسؤولية</h4>
                  <p>يتم تقديم هذا التطبيق "كما هو" لتسهيل ترتيب وتنظيم الطلبيات. لا يتحمل المكتب مسؤولية أي أخطاء ناتجة عن خلل في جهاز المستخدم أو فقدان غير مقصود للبيانات المخزنة محلياً.</p>
                  <p style={{ marginTop: '20px', fontWeight: 'bold' }}>باستمرارك في تصفح واستخدام التطبيق، فإنك تقر بالالتزام بهذه الشروط.</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn modal-btn-cancel" style={{ width: '100%' }} onClick={() => setActiveModal(null)}>إغلاق</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
