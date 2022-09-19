import templates from "./templates.js";
import {tasks} from './main.js';

const view = {
    currentSize: null,

    domBody: document.querySelector('body'),
    mainElement: null,
    addTaskButton: null,
    addTaskModal: null,

    // FUNCTIONS
    loadHTML: function(viewType) {
        this.viewType = viewType;
        if(viewType == 'desktop') {
            this.domBody.innerHTML = '';
            this.domBody.innerHTML = templates.desktopFramework;
            this.domBody.innerHTML += templates.desktopAddTaskModal;
            this.domBody.innerHTML += templates.desktopDeleteTaskModal;
        }
        if(viewType == 'mobile') {
            this.domBody.innerHTML = '';
            this.domBody.innerHTML = templates.mobileFramework;
            this.domBody.innerHTML += templates.mobileAddTaskModal;
            this.domBody.innerHTML += templates.mobileDeleteTaskModal;
            this.domBody.innerHTML += templates.mobileCallendarModal;
        }
        this.getDomElements();
    },
    
    getDomElements: function() {
        this.mainElement = document.querySelector('main');
        this.addTaskButton = document.querySelector('.add-task-btn');
        this.addTaskButton.addEventListener('click', this.renderAddTaskModal.bind(this))
        if(this.viewType == 'mobile') {
            this.callendarButton = document.querySelector('.callendar-btn');
            this.callendarButton.addEventListener('click', this.renderCallendarModal.bind(this));
        }

        this.dateSection = document.querySelector('section.date');
        this.dateSection.innerHTML = templates.generateDateSectionTemplate('22-07-2022');
        console.log(this.dateSection);

        this.taskSection = document.querySelector('section.tasks');
        tasks.forEach((task) => {
            this.taskSection.innerHTML += task.htmlTemplate;
        })

        
    },

    renderAddTaskModal: function() {
        console.log('render add task modal');
        this.addTaskModal = document.querySelector('.add-task-modal');
        this.addTaskModal.classList.add('active');

        const cancelTaskButton = document.querySelector('.cancel-task-btn');
        const confirmTaskButton = document.querySelector('.confirm-task-btn');

        console.log(confirmTaskButton, cancelTaskButton);

        cancelTaskButton.addEventListener('click', this.closeModal.bind(this, this.addTaskModal));
        confirmTaskButton.addEventListener('click', this.closeModal.bind(this, this.addTaskModal))
    },

    renderCallendarModal: function() {
        console.log('render callendar modal');
        this.callendarModal = document.querySelector('.callendar-modal');
        this.callendarModal.classList.add('active');

        const cancelCallendarButton = document.querySelector('.cancel-callendar-btn');
        cancelCallendarButton.addEventListener('click', this.closeModal.bind(this, this.callendarModal));
    },

    closeModal: function(modal) {
        modal.classList.remove('active');
    }
}
export default view;