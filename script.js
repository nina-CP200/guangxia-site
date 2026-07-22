const workflowData = {
  meter: {
    kicker: 'CAMERA METER / REAL-TIME READING',
    title: '先看整体，再看主体。',
    copy: '打开测光页，选择全局平均或中心点，光匣会把手机读到的 EV 换成你熟悉的光圈与快门。',
    value: '10.3',
    unit: 'f/5.6　1/250',
    foot: 'APERTURE PRIORITY / ISO 400',
    className: 'visual-meter',
  },
  flash: {
    kicker: 'FLASH POWER / MANUAL CONTROL',
    title: '把 GN，换成现场的选择。',
    copy: '输入闪光灯全功率 GN、距离和 ISO，按下一个拨盘，就能知道该用多大光圈和功率。',
    value: '1/16',
    unit: 'f/4.0　2.4 m',
    foot: 'GUIDE NUMBER 60 / ISO 400',
    className: 'visual-flash',
  },
  film: {
    kicker: 'RECIPROCITY / FILM REFERENCE',
    title: '长曝光，也有可核对的依据。',
    copy: '选一卷胶卷，输入测光时间。官方资料、玩家估算或自定义参数，来源会和结果一起显示。',
    value: '+1.5',
    unit: '100 s → 300 s',
    foot: 'KODAK T-MAX 400 / OFFICIAL',
    className: 'visual-film',
  },
  memo: {
    kicker: 'FILM LOG / LOCAL MEMORY',
    title: '记住你正在拍什么。',
    copy: '为每台相机留下当前胶卷、ISO、装卷日期和备注。卸卷之后，过去的记录仍然在。',
    value: '07',
    unit: 'ROLLS ARCHIVED',
    foot: 'NIKON FM2 / PORTRA 400',
    className: 'visual-memo',
  },
};

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

const menuToggle = qs('[data-menu-toggle]');
const mobileNav = qs('[data-mobile-nav]');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileNav?.classList.toggle('is-open', !open);
});
qsa('[data-mobile-nav] a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileNav?.classList.remove('is-open');
}));

const workflowVisual = qs('[data-workflow-visual]');
qsa('.workflow-tab').forEach((tab) => tab.addEventListener('click', () => {
  const data = workflowData[tab.dataset.tool];
  if (!data) return;
  qsa('.workflow-tab').forEach((item) => item.classList.toggle('is-active', item === tab));
  qs('[data-workflow-kicker]').textContent = data.kicker;
  qs('[data-workflow-title]').textContent = data.title;
  qs('[data-workflow-copy]').textContent = data.copy;
  qs('[data-workflow-value]').textContent = data.value;
  qs('[data-workflow-unit]').textContent = data.unit;
  qs('[data-workflow-foot]').textContent = data.foot;
  workflowVisual.className = `workflow-visual ${data.className}`;
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
qsa('.reveal').forEach((element) => observer.observe(element));

window.addEventListener('scroll', () => {
  qs('[data-header]')?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });
