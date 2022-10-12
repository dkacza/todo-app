import view from './view.js';

export const STORAGE_KEY = 'mainMap';

// Setting methods on the Date object prototype
Date.prototype.compareDates = function(date1, date2) {
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
    constructor(title, description, date, completion) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.completion = completion;
        this.id = this.nextID;
        Task.prototype.nextID++;
    };
    
}
Task.prototype.nextID = 1;


// CurrentDay stores the selected day in the app
// TodayDate stores today's date
// Main map stores the day-tasks pairs
export let currentDate = new Date();
export const todayDate = new Date();
export const mainMap = new Map();

// Reading local storage
const storedText = window.localStorage.getItem(STORAGE_KEY);
const stringRecordArray = storedText.split('\n');
for(const stringEntry of stringRecordArray) {
    if (!stringEntry) continue;
    const stringArray = stringEntry.split(';');
    const key = stringArray[0];
    const newArray = [];
    for (let i = 1; i < stringArray.length; i++) {
        if (!stringArray[i]) continue;
        newArray.push(JSON.parse(stringArray[i]));
    }
    mainMap.set(key, newArray);
}

// Initializing responsive HTML layout 
const viewType = (window.innerWidth >= view.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
view.loadHTMLFramework(viewType);
window.addEventListener('resize', view.checkResize.bind(view));

// Accessing local storage when window closes
window.addEventListener('beforeunload', () => {
    let textToSave = ''
    for (const [key, entry] of mainMap.entries()) {
        textToSave += key + ';'
        for(const task of entry) {
            const taskText = JSON.stringify(task);
            textToSave += taskText + ";";
        }
        textToSave += '\n';
    }
    window.localStorage.setItem(STORAGE_KEY, textToSave);
})


