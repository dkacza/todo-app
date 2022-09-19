import templates from "./templates.js";
import { currentDay, mainMap } from "./main.js";

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
        // IN PROGRESS ADD EVENTS
        this.dateSection.innerHTML = templates.generateDateSectionTemplate(currentDay);

        // Task Section
        // IN PROGRESS ADD HANDLERS FOR THE EXTENSION BUTTONS
        this.taskSection.innerHTML = '';
        for(const value of mainMap.values()) {
            this.taskSection.innerHTML += value.htmlTemplate;
        }

        if(this.viewType == 'desktop') {
            // Callendar
            this.callendar.innerHTML = templates.generateCallendarTemplate(currentDay);
        } else {

        }
    },
} 
// const view = {
//     currentSize: null,

//     domBody: document.querySelector('body'),
//     mainElement: null,
//     addTaskButton: null,
//     addTaskModal: null,

//     // FUNCTIONS
//     loadHTML: function(viewType) {
//         this.viewType = viewType;
//         if(viewType == 'desktop') {
//             this.domBody.innerHTML = '';
//             this.domBody.innerHTML = templates.desktopFramework;
//             this.domBody.innerHTML += templates.desktopAddTaskModal;
//             this.domBody.innerHTML += templates.desktopDeleteTaskModal;
//         }
//         if(viewType == 'mobile') {
//             this.domBody.innerHTML = '';
//             this.domBody.innerHTML = templates.mobileFramework;
//             this.domBody.innerHTML += templates.mobileAddTaskModal;
//             this.domBody.innerHTML += templates.mobileDeleteTaskModal;
//             this.domBody.innerHTML += templates.mobileCallendarModal;
//         }
//         this.getDomElements();
//     },
    
//     getDomElements: function() {
//         this.mainElement = document.querySelector('main');
//         this.addTaskButton = document.querySelector('.add-task-btn');
//         this.addTaskButton.addEventListener('click', this.renderAddTaskModal.bind(this))
//         if(this.viewType == 'mobile') {
//             this.callendarButton = document.querySelector('.callendar-btn');
//             this.callendarButton.addEventListener('click', this.renderCallendarModal.bind(this));
//         }

//         this.dateSection = document.querySelector('section.date');
//         this.dateSection.innerHTML = templates.generateDateSectionTemplate('22-07-2022');
//         console.log(this.dateSection);

//         this.taskSection = document.querySelector('section.tasks');
//         tasks.forEach((task) => {
//             this.taskSection.innerHTML += task.htmlTemplate;
//         })

        
//     },

//     renderAddTaskModal: function() {
//         console.log('render add task modal');
//         this.addTaskModal = document.querySelector('.add-task-modal');
//         this.addTaskModal.classList.add('active');

//         const cancelTaskButton = document.querySelector('.cancel-task-btn');
//         const confirmTaskButton = document.querySelector('.confirm-task-btn');

//         console.log(confirmTaskButton, cancelTaskButton);

//         cancelTaskButton.addEventListener('click', this.closeModal.bind(this, this.addTaskModal));
//         confirmTaskButton.addEventListener('click', this.closeModal.bind(this, this.addTaskModal))
//     },

//     renderCallendarModal: function() {
//         console.log('render callendar modal');
//         this.callendarModal = document.querySelector('.callendar-modal');
//         this.callendarModal.classList.add('active');

//         const cancelCallendarButton = document.querySelector('.cancel-callendar-btn');
//         cancelCallendarButton.addEventListener('click', this.closeModal.bind(this, this.callendarModal));
//     },

//     closeModal: function(modal) {
//         modal.classList.remove('active');
//     }
// }
 export default view;