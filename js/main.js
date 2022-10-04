import view from './view.js';

export const STORAGE_KEY = 'mainMap';

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

// Main Map stores the tasks in the app
// DMY string -> Array with task objects
export const mainMap = new Map();


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
console.log(mainMap);



// for (const entry of textArray) {
//     const divisorsCount = entry.match(/-/g)?.length;
//     if(divisorsCount === 2 && entry.length <= 10) {
//         newKey = entry;
//         console.log(newKey)
//     }
//     else {
//         console.log(entry);
//         const taskObject = JSON.parse(entry);
//         console.log(taskObject)
//     }
// }


// Responsive layout
const viewType = (window.innerWidth >= view.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
view.loadHTMLFramework(viewType);
window.addEventListener('resize', view.checkResize.bind(view));




