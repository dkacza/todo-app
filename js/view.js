import templates from "./templates.js";

const view = {
    currentSize: null,

    domBody: document.querySelector('body'),
    mainElement: null,
    addTaskButton: null,
    addTaskModal: null,

    // FUNCTIONS
    loadHTML: function(viewType) {
        console.log(viewType);
        if(viewType == 'desktop') {
            this.domBody.innerHTML = '';
            this.domBody.innerHTML = templates.desktopFramework;
            this.domBody.innerHTML += templates.desktopAddTaskModal;
            this.domBody.innerHTML += templates.desktopDeleteTaskModal;
            this.getDomElements();
        }
        if(viewType == 'mobile') {
            this.domBody.innerHTML = '';
            this.domBody.innerHTML = templates.mobileFramework;
        }
    },
    
    getDomElements: function() {
        this.mainElement = document.querySelector('main');
        this.addTaskButton = document.querySelector('.add-task-btn');
        this.addTaskButton.addEventListener('click', this.renderAddTaskModal.bind(this))
        
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

    renderDeleteTaskModal: function() {

    },

    extendTask: function() {

    },
    
    closeModal: function(modal) {
        modal.classList.remove('active');
    }
}
export default view;