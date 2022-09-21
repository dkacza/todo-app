import { currentDate } from "./main.js";

const taskView = {
    renderInitial: function() {
        this.generateAddTaskModal();

        this.taskSection = document.querySelector('.tasks');
        this.taskSection.innerHTML = '';
        document.querySelector('body').insertAdjacentHTML('beforeend', this.addTaskModalTemplate);

        this.addTaskModal = document.querySelector('.add-task-modal')
        this.addTaskButton = document.querySelector('.add-task-btn');
        this.cancelTaskButton = document.querySelector('.cancel-task-btn');
        this.confirmTaskButton = document.querySelector('.confirm-task-btn');
        this.taskNameInput = document.querySelector('input.task-name');
        this.taskDescInput = document.querySelector('textarea.task-desc');
        this.taskCheckbox = document.querySelector('div.checkbox-recurring');

        this.addTaskButton.addEventListener('click', () => {
            this.addTaskModal.classList.add('active');
        });
        this.cancelTaskButton.addEventListener('click', () => {
            this.addTaskModal.classList.remove('active');
        });
        this.taskCheckbox.addEventListener('click', () => {
            this.taskCheckbox.classList.toggle('active');
        });

        this.confirmTaskButton.addEventListener('click', this.validateAndAddTask.bind(this));
    },
    validateAndAddTask() {
        this.addTaskModal.classList.remove('active');
        console.log('Task name:', this.taskNameInput.value);
        console.log('Task description:', this.taskDescInput.value);
    },
    updateTaskSection: function() {

    },
    generateAddTaskModal: function() {
        this.addTaskModalTemplate = `
        <section class="add-task-modal modal">
            <h1>Add new task</h1>
            <section class="inputs">
                <input name="task-name" type="text" class="task-name" placeholder="task name">
                <textarea name="task-desc" class="task-desc" placeholder="description"></textarea>
                <div class="checkbox-container">
                    <p>Reccuring task</p>
                    <div class="checkbox-recurring checkbox">
                        <span class="material-symbols-rounded medium-large">
                            done
                            </span>
                    </div>
                </div>
            </section>
            <div class="text">
                <p>tPLACEHOLDER FOR MESSAGE</p>
            </div>
            <section class="buttons">
                <button class="cancel-task-btn">Cancel</button>
                <button class="confirm-task-btn">Confirm</button>
            </section>
        </section>`;
    }
}
export default taskView;