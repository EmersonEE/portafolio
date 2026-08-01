import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/dist/photoswipe.css';

const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: 'a',
  showHideAnimationType: 'zoom',
  bgOpacity: 0.95,
  wheelToZoom: true,
  closeOnVerticalDrag: true,
  pswpModule: () => import('photoswipe'),
});

lightbox.on('uiRegister', () => {
  lightbox.pswp.ui.registerElement({
    name: 'download-button',
    order: 8,
    isButton: true,
    html: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    onClick: () => {
      const slide = lightbox.pswp.currSlide;
      if (slide) {
        const link = document.createElement('a');
        link.download = slide.data.src.split('/').pop();
        link.href = slide.data.src;
        link.click();
      }
    },
  });
});

lightbox.on('opening', () => {
  document.documentElement.style.overflow = 'hidden';
});

lightbox.on('close', () => {
  document.documentElement.style.overflow = '';
});

lightbox.init();

const phaseFilters = document.querySelectorAll('.phase-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

phaseFilters.forEach((btn) => {
  btn.classList.add(
    'border-surface-200', 'text-surface-600',
    'hover:border-brand-300', 'hover:text-brand-700', 'hover:bg-brand-50',
    'cursor-pointer'
  );
  btn.addEventListener('click', () => {
    phaseFilters.forEach((b) => {
      b.classList.remove('bg-brand-50', 'border-brand-300', 'text-brand-700');
      b.classList.add('border-surface-200', 'text-surface-600');
    });
    btn.classList.remove('border-surface-200', 'text-surface-600');
    btn.classList.add('bg-brand-50', 'border-brand-300', 'text-brand-700');

    const phase = btn.dataset.phase;
    galleryItems.forEach((item) => {
      if (phase === 'all' || item.dataset.phase === phase) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const activeFilter = document.querySelector('.phase-filter[data-phase="all"]');
if (activeFilter) {
  activeFilter.classList.remove('border-surface-200', 'text-surface-600');
  activeFilter.classList.add('bg-brand-50', 'border-brand-300', 'text-brand-700');
}
