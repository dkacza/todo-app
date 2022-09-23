import callendarView from "./callendarView.js";
import { currentDate, Task, mainMap } from "./main.js";

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

        this.addTaskButton.addEventListener('click', () => {
            this.addTaskModal.classList.add('active');
            callendarView?.callendarModal.classList.remove('active');
        });
        this.cancelTaskButton.addEventListener('click', () => {
            this.addTaskModal.classList.remove('active');
        });
        this.confirmTaskButton.addEventListener('click', this.validateAndAddTask.bind(this));

        this.updateTaskSection();
        this.taskSection.addEventListener('click', this.handleTaskSectionClick.bind(this));
    },
    validateAndAddTask() {
        const taskName = this.taskNameInput.value;
        const taskDesc = this.taskDescInput.value;
        // Check if the values are correct
        if(!taskName || !taskDesc) {
            alert('Please fill the form correctly.');
            return;
        }
        const taskDate = new Date(currentDate);
        const taskFromInput = new Task(taskName, taskDesc, taskDate, false);
        const key = taskDate.stringDMY();

        let taskArray = mainMap.get(key);
        if(!taskArray) mainMap.set(key, [taskFromInput]);
        else mainMap.get(key).push(taskFromInput);
        this.addTaskModal.classList.remove('active');
        this.updateTaskSection();
    },
    updateTaskSection: function() {
        this.taskSection.innerHTML = '';
        const searchKey = currentDate.stringDMY();
        const tasksForCurrentDay = mainMap.get(searchKey);

        if(!tasksForCurrentDay) return;
        for(const task of tasksForCurrentDay) {
            const template = this.generateTaskTemplate(task);
            this.taskSection.insertAdjacentHTML('beforeend', template);
        }
    },
    handleTaskSectionClick: function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Extend Button
        const extendButton = e.target.closest('button.extend-task-btn');
        if (extendButton) {
            extendButton.closest('div.task').classList.toggle('extended');            
        }
            // Checkbox
        const checkbox = e.target.closest('div.checkbox');
        if (checkbox) {
            checkbox.classList.toggle('active');

            const dateKey = currentDate.stringDMY();
            const id = checkbox.closest('div.task').dataset.id;
            const task = mainMap.get(dateKey).find(task => {return task.id == id});
            if (task.completion) task.completion = false;
            else task.completion = true;
        }
            // Deleting task
        const deleteBtn = e.target.closest('button.delete-task-btn');
        if (deleteBtn) {
            const dateKey = currentDate.stringDMY();
            const idForDeletion = Number(deleteBtn.closest('div.task').dataset.id);

            const taskArray = mainMap.get(dateKey);
            const newArray = taskArray.filter((task) => {
                return !(task.id == idForDeletion);
            })
            mainMap.set(dateKey, newArray); 
            deleteBtn.closest('div.task').remove();
        }
        return;
    },
    generateAddTaskModal: function() {
        this.addTaskModalTemplate = `
        <section class="add-task-modal modal">
            <h1>Add new task</h1>
            <section class="inputs">
                <input name="task-name" type="text" class="task-name" placeholder="task name">
                <textarea name="task-desc" class="task-desc" placeholder="description"></textarea>
            </section>
            <div class="text">
                <p>task will be added to: </p>
                <p class="date">${currentDate.stringDMY().replaceAll('-','.')}</p>
            </div>
            <section class="buttons">
                <button class="cancel-task-btn">Cancel</button>
                <button class="confirm-task-btn">Confirm</button>
            </section>
        </section>`;
    },
    generateTaskTemplate(task) {
        const template = `
        <div class="task" data-id="${task.id}">
            <section class="left-check">
                <div class="checkbox ${task.completion ? 'active' : ''}">
                    <span class="material-symbols-rounded small">
                        done
                    </span>
                </div>
            </section>
            <section class="text">
                <p class="title">${task.title}</p>
                <p class="description">${task.description}</p>
            </section>
            <section class="buttons">
                <button class="extend-task-btn">
                    <span class="material-symbols-rounded large">
                        expand_more
                        </span>
                </button>
                <button class="delete-task-btn">
                    <span class="material-symbols-rounded medium">
                        delete
                        </span>
                </button>
            </section>
        </div>`;
        return template;
    }
}
export default taskView;