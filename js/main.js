import view from './view.js';

// Responsive layout
const WIDTH_BREAKPOINT = 800;
if(window.innerWidth > WIDTH_BREAKPOINT) view.currentSize = 'desktop';
else view.currentSize = 'mobile'
view.loadHTML(view.currentSize);

window.addEventListener('resize', () => {
    if(window.innerWidth > WIDTH_BREAKPOINT && view.currentSize != 'desktop') {
        view.currentSize = 'desktop'
        view.loadHTML('desktop');
        view.getDomElements();
        return;
    }
    if(window.innerWidth <= WIDTH_BREAKPOINT && view.currentSize != 'mobile') {
        view.currentSize = 'mobile';
        view.loadHTML('mobile');
        view.getDomElements();
        return;
    }
}) 