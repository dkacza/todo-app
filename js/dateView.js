import { currentDate, compareDates, todayDate } from "./main.js";

const dateView = {
    // Initial date panel rendering and attaching event listeners 
    renderInitial: function() {

        // Initial HTML
        this.dateSection = document.querySelector('section.date');
        this.dateSection.innerHTML = '';
        this.generateTitles();
        this.generateDateTemplate();
        this.dateSection.innerHTML = this.dateTemplate;

        // Day navigation
        const previousDayButton = this.dateSection.querySelector('button.previous');
        const nextDayButton = this.dateSection.querySelector('button.next');
        previousDayButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            this.updateDate();
            
        });
        nextDayButton.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            this.updateDate();
        });
    },

    // Updating the HTML structure for a new date
    updateDate: function() {
        this.generateTitles();
        const dateTitleDOM = document.querySelector('.date-title');
        const dateDescDOM = document.querySelector('.date-full');
        dateTitleDOM.innerHTML = this.title;
        dateDescDOM.innerHTML = this.dateString;
    },

    // Generating template for Date sectiin
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
        if(compareDates(currentDate, todayDate)) this.title = 'Today';
        else if (compareDates(todayDate, yesterday)) this.title = 'Tommorow';
        else if (compareDates(todayDate, tommorow)) this.title = 'Yesterday';
        else this.title = weekdayNames[weekday];

        this.dateString = `${this.title == weekdayStr ? '' : `${weekdayStr},`} ${dayStr} of ${monthStr}`;
    }
}
export default dateView;