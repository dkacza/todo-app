const callendarView = {
    callendarDate: new Date(),

    // USED WHEN RENDERING A NEW CALLENDAR
    // ATTACHES EVENT LISTENERS TO CALLENDAR BUTTONS
    renderInitial: function() {
        this.callendar = document.querySelector('div.callendar');
        this.callendar.innerHTML = '';
        this.generateCalendarTemplate();
        this.callendar.innerHTML = this.fullTemplate;

        this.previousMonthButton = document.querySelector('.left-arrow-btn');
        this.nextMonthButton = document.querySelector('.right-arrow-btn');

        this.previousMonthButton.addEventListener('click', this.updateCallendar.bind(callendarView, -1));
        this.nextMonthButton.addEventListener('click', this.updateCallendar.bind(callendarView, 1));
    },
    // USED FOR CHANGING A MONTH
    updateCallendar: function(monthDelta) {
        console.log('month update');
        this.callendarDate.setMonth(this.callendarDate.getMonth() + monthDelta);
        

        // THIS LINE FREEZES THE BROWSER
        this.generateDayTemplate();

        
        const monthText = document.querySelector('p.month');
        const yearText = document.querySelector('p.year');
        monthText.innerHTML = this.monthStr;
        yearText.innerHTML = this.year;

        const daysSection = document.querySelector('section.days');
        daysSection.innerHTML = this.dayTemplate;
        
    },
    // GENERATES DAY SECTION MATRIX
    // THIS FUNCTION GENERATES THE PROBLEM
    generateDayMatrix: function() {
        
        let year = this.callendarDate.getYear() + 1900;
        let month = this.callendarDate.getMonth();
        let day = this.callendarDate.getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthStr = monthNames[month];
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const leapYear = ((year % 4 == 0 && year % 100 != 0) ? true : false);
        if(leapYear) monthDays[1] = 29;

        // FINE UNTIL HERE
        
        const dayMatrix = [];
        let currentDate = day;
        let dayOfWeek = this.callendarDate.getDay()

        // Pushing the date back to the last monday
        while(dayOfWeek > 1) {
            dayOfWeek--;
            currentDate--;
        }
        
        // DOESNOT WORK BELOW
        // Pushing the date to the first week of the month
        while(currentDate > 0) {
            currentDate -= 7;
        }
        // Filling the Matrix
        while(currentDate <= monthDays[month]) {
            const week = [];
            for(let i = 0; i < 7; i++) {
                week.push(currentDate);
                currentDate++;
            }
            dayMatrix.push(week);
        }
        
        
        // Fixing the matrix - deleting days like -1, 0 or 32
        // Fix next month
        let firstNextMonthDay = 1;
        for (let i = 0; i < dayMatrix.length; i++) {
            for (let j = 0; j < 7; j++) {
                if(dayMatrix[i][j] > monthDays[month]) {
                    dayMatrix[i][j] = firstNextMonthDay;
                    firstNextMonthDay++;
                }
            }
        }
        // Fix previous month
        let lastNextMonthDay = monthDays[month - 1]
        for (let i = dayMatrix.length - 1; i >= 0; i--) {
            for (let j = 6; j >= 0; j--) {
                if(dayMatrix[i][j] < 1) {
                    dayMatrix[i][j] = lastNextMonthDay;
                    lastNextMonthDay--;
                }
            }
        }
        this.day = day;
        this.year = year;
        this.monthStr = monthStr;
        this.dayMatrix = dayMatrix;
    },
    // GENERATES TEMPLATE FOR DAYS
    generateDayTemplate: function() {
        this.generateDayMatrix();

        let resultTemplate = 
        `<div class="day desc">mon</div>
        <div class="day desc">tue</div>
        <div class="day desc">wed</div>
        <div class="day desc">thu</div>
        <div class="day desc">fri</div>
        <div class="day desc">sat</div>
        <div class="day desc">sun</div>`;
        let previousMonthFlag = true;
        for(const week of this.dayMatrix) {
            for (const currDay of week) {
                let classes = `day`
                if(currDay == 1) previousMonthFlag = false;
                if(previousMonthFlag && this.day > 1) classes += ' gray';
                if(week.indexOf(currDay) == 6) classes += ' sun';
                if(currDay == this.day) classes += ' current';
                
                const dayTemplate = `<div class="${classes}">${currDay}</div>`
                resultTemplate += dayTemplate;
            }
        }
        this.dayTemplate = resultTemplate;
    },
    // GENERATES FULL TEMPLATE
    generateCalendarTemplate: function() {
        this.generateDayTemplate();
        
        let resultTemplate = `
        <section class="month-year">
            <button class="left-arrow-btn arrow">
                <span class="material-symbols-rounded large">
                    navigate_before
                    </span>
            </button>
            <div class="text">
                <p class="month">${this.monthStr}</p>
                <p class="year">${this.year}</p>
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
    // GENERATE MOBILE MODAL
    generateCallendarModal: function() {

    },
}
export default callendarView;