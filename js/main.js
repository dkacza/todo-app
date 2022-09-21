import view from './view.js';

export const compareDates = function(date1, date2) {
    return (date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getYear() == date2.getYear()); 
}

Date.prototype.stringYMD = function() {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    return `${day}-${month}-${year}`;
}

class Task {
    constructor(title, description, date, reccurence, completion) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.reccurence = reccurence;
        this.completion = completion;
    };
}

// CurrentDay stores the selected day in the app
// Main map stores the day-tasks pairs
export let currentDate = new Date();
export const todayDate = new Date();

const mainMap = new Map();

// Responsive layout
const viewType = (window.innerWidth >= view.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
view.loadHTMLFramework(viewType);
window.addEventListener('resize', view.checkResize.bind(view));

