import dateView from "./dateView.js";
import { todayDate, currentDate } from "./main.js";
import view from "./view.js";

const callendarView = {
    callendarDate: new Date(),

    // Initial Callendar rendering and attaching event listeners
    renderInitial: function() {

        this.generateDayMatrix();

        // Rendering mobile modal 
        if(view.viewType == 'mobile') {
            this.generateCallendarModalTemplate();
            document.querySelector('body').innerHTML += this.callendarModalTemplate;
            this.callendarModal = document.querySelector('.callendar-modal');
        }

        // Initial HTML
        this.callendar = document.querySelector('div.callendar');
        this.callendar.innerHTML = '';
        this.generateCallendarTemplate();
        this.callendar.innerHTML = this.fullTemplate;

        // Mobile modal handling
        if(view.viewType == 'mobile') {
            this.callendarButton = document.querySelector('.callendar-btn');
            this.callendarButton.addEventListener('click', () => {
                this.callendarModal.classList.add('active');
            })
            this.callendarCancelButton = document.querySelector('.callendar-cancel-btn');
            this.callendarCancelButton.addEventListener('click', () => {
                this.callendarModal.classList.remove('active');
            })
        }

        // Month navigation
        this.previousMonthButton = document.querySelector('.left-arrow-btn');
        this.nextMonthButton = document.querySelector('.right-arrow-btn');
        this.previousMonthButton.addEventListener('click',() => {
            const newMonthDate = new Date(this.callendarDate);
            newMonthDate.setMonth(newMonthDate.getMonth() - 1);
            this.updateCallendar(newMonthDate);
        });
        this.nextMonthButton.addEventListener('click',() => {
            const newMonthDate = new Date(this.callendarDate);
            newMonthDate.setMonth(newMonthDate.getMonth() + 1);
            this.updateCallendar(newMonthDate);
        });

        // Selecting date by clicking on a callendar
        this.daySection = document.querySelector('section.days');
        this.daySection.addEventListener('click', (e) => {
            if(e.target.classList.contains('desc')) return;
            const targetDateStr = e.target.dataset.date;
            const dateArr = targetDateStr.split('-');
            currentDate.setDate(dateArr[0]);
            currentDate.setMonth(dateArr[1] - 1);
            currentDate.setFullYear(dateArr[2]);
            dateView.updateDate();

            if(view.viewType == 'mobile') {
                this.callendarModal.classList.remove('active');
            }
        })

        

    },
    // Updating the structure for a new month
    updateCallendar: function(newDate) {
        this.callendarDate = newDate;
        this.generateDayMatrix();
        this.generateCallendarTemplate();
        
        const monthText = document.querySelector('p.month');
        const yearText = document.querySelector('p.year');
        monthText.innerHTML = this.callendarMonthStr;
        yearText.innerHTML = this.callendarYear;

        const daysSection = document.querySelector('section.days');
        daysSection.innerHTML = this.dayTemplate;
        
    },
    // Generating Matrix with day data for the month
    generateDayMatrix: function() {
        this.callendarYear = this.callendarDate.getYear() + 1900;
        this.callendarMonth = this.callendarDate.getMonth() + 1;
        this.callendarDay = this.callendarDate.getDate();

        this.previousCallendarMonth = this.callendarMonth - 1;
        this.nextCallendarMonth = this.callendarMonth + 1;
        if(this.previousMonth == 0) this.previousMonth = 12;
        if(this.nextMonth == 13) this.nextMonth = 1;

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.callendarMonthStr = monthNames[this.callendarMonth - 1];

        const leapYear = ((this.callendarYear % 4 == 0 && this.callendarYear % 100 != 0) ? true : false);
        if(leapYear) monthDays[1] = 29;

        this.dayMatrix = [];
        let currentDate = this.callendarDay;
        let dayOfWeek = this.callendarDate.getDay()

        // Pushing the date back to the last monday
        while(dayOfWeek > 1) {
            dayOfWeek--;
            currentDate--;
        }
        // Pushing the date to the first week of the month
        while(currentDate > 0) {
            currentDate -= 7;
        }
        // Filling the Matrix
        let firstWeekFlag = true;
        while(currentDate <= monthDays[this.callendarMonth]) {
            const week = [];
            for(let i = 0; i < 7; i++) {
                const dateArray = new Array(currentDate, this.callendarMonth, this.callendarYear);
                week.push(dateArray);
                currentDate++;
            }
            
            if (firstWeekFlag) {
                const conditionToDelete = !week.find((date) => {
                    return date[0] == 1
                })
                if(conditionToDelete) {
                    firstWeekFlag = false;
                    continue;
                }
                firstWeekFlag = false;
            }
            
            
            this.dayMatrix.push(week);
            firstWeekFlag = false;
        }
        
        // Fixing the matrix - deleting days like -1, 0 or 32
        // Fix next month
        let firstNextMonthDay = 1;
        for (let i = 0; i < this.dayMatrix.length; i++) {
            for (let j = 0; j < 7; j++) {
                if(this.dayMatrix[i][j][0] > monthDays[this.callendarMonth]) {
                    this.dayMatrix[i][j][0] = firstNextMonthDay;
                    this.dayMatrix[i][j][1] = this.nextCallendarMonth;
                    if(this.dayMatrix[i][j][1] == 11) {
                        this.dayMatrix[i][j][1] = 0;
                        this.dayMatrix[i][j][2] += 1;
                    }
                    firstNextMonthDay++;
                }
            }
        }
        // Fix previous month
        let lastPreviousMonthDay;
        if(this.dayMatrix[0][0][1] == 1) lastPreviousMonthDay = 31;
        else lastPreviousMonthDay = monthDays[this.previousCallendarMonth];
        
        for (let i = this.dayMatrix.length - 1; i >= 0; i--) {
            for (let j = 6; j >= 0; j--) {
                if(this.dayMatrix[i][j][0] < 1) {
                    this.dayMatrix[i][j][0] = lastPreviousMonthDay;
                    this.dayMatrix[i][j][1] = this.previousCallendarMonth;
                    if(this.dayMatrix[0][0][1] == 0) {
                        this.dayMatrix[i][j][2] = this.callendarYear - 1;
                    }
                    lastPreviousMonthDay--;
                }
            }
        }
    },
    // Generating HTML template for the days section of the callendar
    generateDayTemplate: function() {
        let resultTemplate = 
        `<div class="day desc">mon</div>
        <div class="day desc">tue</div>
        <div class="day desc">wed</div>
        <div class="day desc">thu</div>
        <div class="day desc">fri</div>
        <div class="day desc">sat</div>
        <div class="day desc">sun</div>`;

        for(const week of this.dayMatrix) {
            for(const currDay of week) {
                let classes = `day`
                // PREVIOUS OR NEXT MONTH CLASS
                if(currDay[1] == this.previousCallendarMonth || currDay[1] == this.nextCallendarMonth) classes += ` gray`;
                // SUNDAY CLASS
                if(week.indexOf(currDay) == 6) classes += ` sun`;
                // TODAY CLASS
                if(todayDate.getDate() == currDay[0] &&
                todayDate.getMonth() == currDay[1] - 1 &&
                todayDate.getYear() + 1900 == currDay[2]) classes += ` today`;

                const dayTemplate = `<div class="${classes}" data-date="${currDay[0]}-${currDay[1]}-${currDay[2]}">${currDay[0]}</div>`
                resultTemplate += dayTemplate;
            }
        }
        this.dayTemplate = resultTemplate;
    },
    // Generating full callendar template
    generateCallendarTemplate: function() {
        this.generateDayTemplate();
        
        let resultTemplate = `
        <section class="month-year">
            <button class="left-arrow-btn arrow">
                <span class="material-symbols-rounded large">
                    navigate_before
                    </span>
            </button>
            <div class="text">
                <p class="month">${this.callendarMonthStr}</p>
                <p class="year">${this.callendarYear}</p>
            </div>
            <button class="right-arrow-btn arrow">
                <span class="material-symbols-rounded large">
                    navigate_next
                </span>
            </button>
        </section>
        <section class="days">`;
        
        resultTemplate += this.dayTemplate;
        resultTemplate += `</section>`
        this.fullTemplate = resultTemplate;
            
    },
    // Generating Mobile modal template
    generateCallendarModalTemplate: function() {
        this.callendarModalTemplate = `
        <section class="callendar-modal modal">
            <div class="text">
                <h1>Select the Day</h1>
                <p class="description">Click a date on the callendar or go back</p>
            </div>
            <div class="callendar">`;
        this.generateCallendarTemplate();
        this.callendarModalTemplate += this.fullTemplate;
        this.callendarModalTemplate += 
            `</div>
            <button class="callendar-cancel-btn">Cancel</button>
        </section>`;

    },
}
export default callendarView;