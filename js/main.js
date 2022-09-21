import view from './view.js';

export const compareDates = function(date1, date2) {
    return (date1.getDate() == date2.getDate() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getYear() == date2.getYear()); 
}

Date.prototype.stringDMY = function() {
    let day = this.getDate();
    let month = this.getMonth() + 1;
    let year = this.getFullYear();
    return `${day}-${month}-${year}`;
}

export class Task {
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

export const mainMap = new Map();
const sampleDate1 = new Date();
const sampleDate2 = new Date(sampleDate1);
const sampleDate3 = new Date();
sampleDate3.setDate(sampleDate3.getDate() + 1);

const sampleKey1 = sampleDate1.stringDMY();
const sampleKey2 = sampleDate2.stringDMY();
const sampleKey3 = sampleDate3.stringDMY();

const sampleTask1 = new Task('zadanie 1', 'opis 1', sampleDate1, false, false);
const sampleTask2 = new Task('zadanie 2', 'opis 2', sampleDate2, false, false);
const sampleTask3 = new Task('zadanie 3', 'opis 3', sampleDate3, false, false);

mainMap.set(sampleKey1, [sampleTask1]);
mainMap.get(sampleKey2).push(sampleTask2);
mainMap.set(sampleKey3, [sampleTask3]);

console.log(mainMap);

// Responsive layout
const viewType = (window.innerWidth >= view.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
view.loadHTMLFramework(viewType);
window.addEventListener('resize', view.checkResize.bind(view));




