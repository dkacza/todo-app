import {mainMap, currentDay, compareDates, DAY_MILISEC} from '../js/main.js';

const templates = {
    desktopFramework: `
    <main class="desktop">
    <div class="container">
        <section class="date"></section>
        <section class="tasks"></section>
        <div class="callendar"></div>
        <aside></aside>
        <button class="add-task-btn">ADD TASK</button>
    </div>
    </main>`,

    mobileFramework: `
    <main class="mobile">
    <div class="container">
        <section class="date"></section>
        <section class="tasks"></section>
        <aside>
            <button class="callendar-btn">CALLENDAR</button>
            <button class="add-task-btn">ADD TASK</button>
        </aside>
    </div>
    </main>`,

    generateAddTaskModal: function(date) {
        return `
        <div class="modal add-task-modal">

            <h1>Add new task</h1>

            <section class="inputs">
                <input name="task-name" type="text" class="task-name" placeholder="task name">
                <textarea name="task-description" class="task-description" placeholder="description"></textarea>
                <div class="checkbox-container">
                    <p>Reccuring task</p>
                    <div class="checkbox">
                        <span class="material-symbols-rounded medium-large">
                            done
                        </span>
                    </div>
                </div>
            </section>

            <div class="text">
                <p>task will be added to (single/every) day.</p>
                <p>starting from: <span class="starting-date">${date}</span></p>
            </div>

            <section class="buttons">
                <button class="cancel-task-btn">Cancel</button>
                <button class="confirm-task-btn">Add</button>
            </section>
        </div>`;
    },

    generateDeleteTaskModal: function() {
        return `
        <div class="modal delete-task-modal">
            <div class="popup">
                <p class="main-message">The task you have selected is a recurring one.</p>
                <p class="secondary-message">Do you want to delete each reccurence?</p>
                <section class="buttons">
                    <button class="delete-each-btn">delete each</button>
                    <button class="delete-once-btn">delete once</button>
                </section>
            </div>
        </div>`;
    },

    generateCallendarModal: function(date) {
        let template =  `
        <div class="modal callendar-modal mobile-modal">
            <div class="text-container">
                <h1>Select the Day</h1>
                <p class="description">Click a date on the callendar or go back</p>
            </div>
            <button class="cancel-button">Cancel</button>`;
        template += this.generateCallendarTemplate(date);
        template += `</div>`;
        return template;
        
    },

    generateCallendarTemplate: function(date) {
        let year = date.getYear() + 1900;
        let month = date.getMonth();
        let day = date.getDate();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthStr = monthNames[month];
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const leapYear = ((year % 4 == 0 && year % 100 != 0) ? true : false);
        if(leapYear) monthDays[1] = 29;

        const dayMatrix = [];
        let currentDate = day;
        let dayOfWeek = date.getDay()

        // Pushing the date back to the last monday
        while(dayOfWeek != 1) {
            dayOfWeek--;
            currentDate--;
        }
        
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

        let resultTemplate = `
        <section class="month-year">
            <button class="left-arrow-btn arrow">
                <span class="material-symbols-rounded large">
                    navigate_before
                    </span>
            </button>
            <div class="text">
                <p class="month">${monthStr}</p>
                <p class="year">${year}</p>
            </div>
            <button class="right-arrow-btn arrow">
                <span class="material-symbols-rounded large">
                    navigate_next
                </span>
            </button>
        </section>
        <section class="days">
            <div class="day desc">mon</div>
            <div class="day desc">tue</div>
            <div class="day desc">wed</div>
            <div class="day desc">thu</div>
            <div class="day desc">fri</div>
            <div class="day desc">sat</div>
            <div class="day desc">sun</div>`;
        
        let previousMonthFlag = true;
        for(const week of dayMatrix) {
            for (const currDay of week) {
                let classes = `day`
                if(currDay == 1) previousMonthFlag = false;
                if(previousMonthFlag && day > 1) classes += ' gray';
                if(week.indexOf(currDay) == 6) classes += ' sun';
                if(currDay == day) classes += ' current';
                
                const dayTemplate = `<div class="${classes}">${currDay}</div>`
                resultTemplate += dayTemplate;
            }
        }
        resultTemplate += `</section>`
        return resultTemplate;

    },

    generateDateSectionTemplate: function(date) {        
        let day = date.getDate();
        let dayStr = String(day);
        switch(day % 10) {
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

        let month = date.getMonth();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthStr = monthNames[month];

        let weekday = date.getDay();
        const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let weekdayStr = weekdayNames[weekday];

        let title;
        if(compareDates(currentDay, date)) title = 'Today';
        else if (compareDates(currentDay - DAY_MILISEC, date)) title = 'Yesterday';
        else if (compareDates(currentDay - DAY_MILISEC, date)) title = 'Tommorow';
        else title = weekday;

        let dateString = `${title == weekdayStr ? '' : `${weekdayStr},`} ${dayStr} of ${monthStr}`;

        return `
        <div class="date-title">${title}</div>
        <div class="date-full">${dateString}</div>
        
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
        </section>`
    },
    generateTaskTemplate: function(title, description, completion) {
        return `
        <div class="task">

            <section class="left-check">
                <div class="checkbox ${completion ? 'done' : ''}">
                    <span class="material-symbols-rounded small">
                        done
                        </span>
                </div>
            </section>

            <section class="text">
                <h2 class="title">${title}</h2>
                <p class="description">${description}</p>
            </section>

            <section class="buttons">
                <button class="extend">
                    <span class="material-symbols-rounded large">
                        expand_more
                        </span>
                </button>
                <button class="delete">
                    <span class="material-symbols-rounded medium">
                        delete
                        </span>
                </button>
            </section>
        </div>`
    },
    generateHTMLFramework: function(viewType) {
        let result = '';
        if(viewType == 'mobile') {
            result += this.mobileFramework;

            result += this.generateAddTaskModal(currentDay);
            result += this.generateCallendarModal(currentDay);
            result += this.generateDeleteTaskModal();
        }
        else {
            result += this.desktopFramework;

            result += this.generateAddTaskModal(currentDay);
            result += this.generateDeleteTaskModal(currentDay);
        }
        return result;
    }
}
export default templates;
