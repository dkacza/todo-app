import { currentDate, compareDates, todayDate } from "./main.js";
import callendarView from "./callendarView.js";

const dateView = {
    renderInitial: function() {
        this.dateSection = document.querySelector('section.date');
        this.dateSection.innerHTML = '';
        this.generateTitles();
        this.generateDateTemplate();
        this.dateSection.innerHTML = this.dateTemplate;

        const previousDayButton = this.dateSection.querySelector('button.previous');
        const nextDayButton = this.dateSection.querySelector('button.next');

        previousDayButton.addEventListener('click', () => {
            const monthBeforeChange = currentDate.getMonth();
            currentDate.setDate(currentDate.getDate() - 1);
            this.updateDate();
            const monthAfterChange = currentDate.getMonth();
            const monthDelta = monthAfterChange - monthBeforeChange;
            if(monthDelta != 0) callendarView.updateCallendar(monthDelta);
            
        });
        nextDayButton.addEventListener('click', () => {
            const monthBeforeChange = currentDate.getMonth();
            currentDate.setDate(currentDate.getDate() + 1);
            this.updateDate();
            const monthAfterChange = currentDate.getMonth();
            const monthDelta = monthAfterChange - monthBeforeChange;
            if(monthDelta != 0) callendarView.updateCallendar(monthDelta);
        });
    },
    updateDate: function() {
        this.generateTitles();
        const dateTitleDOM = document.querySelector('.date-title');
        const dateDescDOM = document.querySelector('.date-full');
        dateTitleDOM.innerHTML = this.title;
        dateDescDOM.innerHTML = this.dateString;
    },
    generateDateTemplate: function() {
        this.dateTemplate =  `
        <div class="date-title">${this.title}</div>
        <div class="date-full">${this.dateString}</div>
        
        <section class="date-nav">
            <button class="previous">
                <span class="material-symbols-rounded medium">
                    navigate_before
                </span>
                previous
            </button>
            <button class="next">
                next
                <span class="material-symbols-rounded medium">
                    navigate_next
                </span> 
            </button>
        </section>`;

    },
    generateTitles: function() {
        this.day = currentDate.getDate();
        let dayStr = String(this.day);
        switch(this.day % 10) {
            case 1:
                dayStr += 'st'
                break;
            case 2:
                dayStr += 'nd'
                break;
            case 3:
                dayStr += 'rd'
                break;
            default:
                dayStr += 'th'
                break; 
        }

        let month = currentDate.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthStr = monthNames[month];

        let weekday = currentDate.getDay();
        const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekdayStr = weekdayNames[weekday];

        this.title = '';
        let yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        let tommorow = new Date(currentDate);
        tommorow.setDate(tommorow.getDate() + 1);
        if(compareDates(currentDate, todayDate)) this.title = 'Today';
        else if (compareDates(todayDate, yesterday)) this.title = 'Tommorow';
        else if (compareDates(todayDate, tommorow)) this.title = 'Yesterday';
        else this.title = weekdayNames[weekday];

        this.dateString = `${this.title == weekdayStr ? '' : `${weekdayStr},`} ${dayStr} of ${monthStr}`;
    }
}
export default dateView;