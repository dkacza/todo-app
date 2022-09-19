import templates from "./templates.js";
import { currentDay, DAY_MILISEC, mainMap, setDate } from "./main.js";

const view = {
    body: document.querySelector('body'),
    WIDTH_BREAKPOINT: 800,

    loadHTMLFramework: function(viewType) {
        this.viewType = viewType;
        this.body.innerHTML = '';
        this.body.innerHTML = templates.generateHTMLFramework(viewType);

        this.getDomElements();
        this.fillSections();
    },
    checkResize: function() {
        const newViewType = (window.innerWidth >= this.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
        if (newViewType == this.viewType) return;
        console.log('resize');
        this.loadHTMLFramework(newViewType);
    },
    // Gets all the dom elements in from the framework.
    // Doesn't get buttons from the modals.
    getDomElements: function() {
        // Common between mobile and desktop
        this.dateSection = document.querySelector('section.date');
        this.taskSection = document.querySelector('section.tasks');
        this.aside = document.querySelector('aside');
        this.addTaskButton = document.querySelector('button.add-task-button');

        if(this.viewType == 'desktop') {
            this.callendar = document.querySelector('div.callendar');
        } else {
            this.callendarButton = document.querySelector('button.callendar-btn');
        }
    },

    fillSections: function() {
        // Date Section
        // DONE
        this.dateSection.innerHTML = templates.generateDateSectionTemplate(currentDay);
        this.dateSection.querySelector('button.previous').addEventListener('click', () => {
            let newDate = new Date(currentDay);
            newDate.setDate(newDate.getDate() - 1);
            setDate(newDate);
            this.fillSections();
        })
        this.dateSection.querySelector('button.next').addEventListener('click', () => {
            let newDate = new Date(currentDay);
            newDate.setDate(newDate.getDate() + 1);
            setDate(newDate);
            this.fillSections();
        })
        // Task Section
        // IN PROGRESS ADD HANDLERS FOR THE EXTENSION BUTTONS
        this.taskSection.innerHTML = '';
        for(const value of mainMap.values()) {
            this.taskSection.innerHTML += value.htmlTemplate;
            const extendBtn = document.querySelector('.extend-task-btn');
            extendBtn.addEventListener('click', (e) => {
                console.log(e.path[3].classList.toggle('extended'));
                
            })
        }

        if(this.viewType == 'desktop') {
            // Callendar Section
            this.callendar.innerHTML = templates.generateCallendarTemplate(currentDay);
        } else {

        }
    },
};
export default view;