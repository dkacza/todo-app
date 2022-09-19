import view from './view.js';
import templates from './templates.js';


class Task {
    constructor(title, description, date, reccurence) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.reccurence = reccurence;

        this.completion = false;
        this.htmlTemplate = templates.generateTaskTemplate(this.title, this.description)
    };
}

export const tasks = [new Task('DOKONCZ TO GOWNO', 'trzeba to skonczyc', '22-07-2002', false)];



// Responsive layout
const WIDTH_BREAKPOINT = 800;
if(window.innerWidth > WIDTH_BREAKPOINT) view.currentSize = 'desktop';
else view.currentSize = 'mobile'
view.loadHTML(view.currentSize);

window.addEventListener('resize', () => {
    if(window.innerWidth > WIDTH_BREAKPOINT && view.currentSize != 'desktop') {
        view.currentSize = 'desktop'
        view.loadHTML('desktop');
        return;
    }
    if(window.innerWidth <= WIDTH_BREAKPOINT && view.currentSize != 'mobile') {
        view.currentSize = 'mobile';
        view.loadHTML('mobile');
        view.getDomElements();
        return;
    }
});