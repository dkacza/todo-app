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

        this.updateTaskSection();
    },
    validateAndAddTask() {
        const taskName = this.taskNameInput.value;
        const taskDesc = this.taskDescInput.value;
        const reccurence = this.taskCheckbox.classList.contains('active');
        // Check if the values are correct
        if(!taskName || !taskDesc) {
            alert('Please fill the form correctly.');
            return;
        }
        const taskDate = new Date(currentDate);
        const taskFromInput = new Task(taskName, taskDesc, taskDate, reccurence, false);
        const key = taskDate.stringDMY();

        console.log(key);
        console.log(taskFromInput);

        let taskArray = mainMap.get(key);
        if(taskArray == undefined) {
            mainMap.set(key, [taskFromInput]);
        }
        else {
            mainMap.get(key).push(taskFromInput);
        }
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

        this.taskSection.addEventListener('click', (e) => {
            if(e.path.find(element => {
                return element.classList?.contains('extend-task-btn');

            })) {
                console.log('expand');
            }
        })
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
    },
    generateTaskTemplate(task) {
        const template = `
        <div class="task">
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