import { currentDate, todayDate } from "./main.js";
import taskView from "./taskView.js";

const dateView = {
    // Initial date panel rendering and attaching event listeners 
    renderInitial: function() {

        // Initial HTML
        this.dateSection = document.querySelector('section.date');
        this.dateSection.innerHTML = '';

        this.generateTitles();
        this.generateDateTemplate();
        this.dateSection.innerHTML = this.dateTemplate;

        // If past add past class
        if(currentDate-todayDate < 0) this.dateSection.classList.add('past');
        else this.dateSection.classList.remove('past');
        

        // Day navigation
        this.previousDayButton = document.querySelector('button.previous');
        this.nextDayButton = document.querySelector('button.next');
        this.previousDayButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            this.updateDate();
            
        });
        this.nextDayButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            this.updateDate();
        });
    },

    // Updating the HTML structure for a new date
    updateDate: function() {
        this.generateTitles();
        const dateTitleDOM = document.querySelector('.date-title');
        const dateDescDOM = document.querySelector('.date-full');
        if(currentDate-todayDate < 0) this.dateSection.classList.add('past');
        else this.dateSection.classList.remove('past');
        dateTitleDOM.innerHTML = this.title;
        dateDescDOM.innerHTML = this.dateString;
        taskView.updateTaskSection();
    },

    // Generating template for Date sectiin
    generateDateTemplate: function() {
        this.dateTemplate =  `
        <h1 class="date-title">${this.title}</h1>
        <p class="date-full">${this.dateString}</p>
        
        <section class="date-nav">
            <button class="previous">
                <span class="material-symbols-rounded medium">
                    navigate_before
                </span>
                Previous
            </button>
            <button class="next">
                Next
                <span class="material-symbols-rounded medium">
                    navigate_next
                </span> 
            </button>
        </section>`;

    },

    // Generating titles in the date section
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

        

        let yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        let tommorow = new Date(currentDate);
        tommorow.setDate(tommorow.getDate() + 1);

        this.title = '';
        if(currentDate.compareDates(currentDate, todayDate)) this.title = 'Today';
        else if (currentDate.compareDates(todayDate, yesterday)) this.title = 'Tommorow';
        else if (currentDate.compareDates(todayDate, tommorow)) this.title = 'Yesterday';
        else this.title = weekdayNames[weekday];

        this.dateString = `${this.title == weekdayStr ? '' : `${weekdayStr},`} ${dayStr} of ${monthStr} ${currentDate.getFullYear()}`;
    }
}
export default dateView;