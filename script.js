const workflowData = {
  meter: {
    kicker: 'CAMERA METER / REAL-TIME READING',
    title: '先看整体，再看主体。',
    copy: '打开测光页，选择全局平均或中心点，光匣会把手机读到的 EV 换成你熟悉的光圈与快门。',
    foot: 'REAL SCREEN / METER',
    image: 'assets/meter-screen.jpg',
    alt: '光匣实际测光页面截图',
  },
  flash: {
    kicker: 'FLASH POWER / MANUAL CONTROL',
    title: '把 GN，换成现场的选择。',
    copy: '输入闪光灯全功率 GN、距离和 ISO，按下一个拨盘，就能知道该用多大光圈和功率。',
    foot: 'REAL SCREEN / FLASH',
    image: 'assets/flash-screen.jpg',
    alt: '光匣实际闪光页面截图',
  },
  film: {
    kicker: 'RECIPROCITY / FILM REFERENCE',
    title: '长曝光，也有可核对的依据。',
    copy: '选一卷胶卷，输入测光时间。官方资料、玩家估算或自定义参数，来源会和结果一起显示。',
    foot: 'REAL SCREEN / RECIPROCITY',
    image: 'assets/reciprocity-screen.jpg',
    alt: '光匣实际倒易律页面截图',
  },
  memo: {
    kicker: 'FILM LOG / LOCAL MEMORY',
    title: '记住你正在拍什么。',
    copy: '为每台相机留下当前胶卷、ISO、装卷日期和备注。卸卷之后，过去的记录仍然在。',
    foot: 'REAL SCREEN / FILM LOG',
    image: 'assets/memo-screen.jpg',
    alt: '光匣实际胶卷备忘录页面截图',
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
  qs('[data-workflow-foot]').textContent = data.foot;
  workflowVisual.href = data.image;
  workflowVisual.setAttribute('aria-label', `打开${data.alt.replace('截图', '')}完整截图`);
  const workflowImage = qs('[data-workflow-image]');
  workflowImage.src = data.image;
  workflowImage.alt = data.alt;
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
