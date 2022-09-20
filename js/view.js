import templates from "./templates.js";
import { currentDate } from "./main.js";

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
        this.dateSection.innerHTML = '';
        this.dateSection.innerHTML = templates.generateDateSectionTemplate(currentDate);


        if(this.viewType == 'desktop') {
            this.callendar.innerHTML = templates.generateCallendarTemplate(currentDate);
        } else {
            this.callendarButton.addEventListener('click', () => {
                console.log('set callendar modal to active');
            });
        }

        const previousMonthButton = document.querySelector('.left-arrow-btn');
        const nextMonthButton = document.querySelector('.right-arrow-btn');
        let callendarDate = new Date(currentDate);

        previousMonthButton.addEventListener('click', () => {          
            callendarDate.setMonth(callendarDate.getMonth() - 1);
            templates.updateCallendarTemplate(callendarDate);
        });
        nextMonthButton.addEventListener('click', () => {
            callendarDate.setMonth(callendarDate.getMonth() + 1);
            templates.updateCallendarTemplate(callendarDate);
        })


        this.dateSection.querySelector('button.previous').addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            templates.updateDateSectionTemplate(currentDate);
            
        })
        this.dateSection.querySelector('button.next').addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            templates.updateDateSectionTemplate(currentDate);
        })
    },
};
export default view;