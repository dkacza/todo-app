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
        const template =  `
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
        return `
        <div class="callendar">
        <section class="month-year">
            <div class="left arrow">
                <span class="material-symbols-rounded large">
                    navigate_before
                    </span>
            </div>
            <div class="text">
                <p class="month">September</p>
                <p class="year">2022</p>
            </div>
            <div class="right arrow">
                <span class="material-symbols-rounded large">
                    navigate_next
                </span>
            </div>
        </section>
        <section class="days">
            <div class="day desc">mon</div>
            <div class="day desc">tue</div>
            <div class="day desc">wed</div>
            <div class="day desc">thu</div>
            <div class="day desc">fri</div>
            <div class="day desc">sat</div>
            <div class="day desc">sun</div>

            <!-- DAYS -->
            <div class="day gray">26</div>
            <div class="day gray">27</div>
            <div class="day gray">28</div>
            <div class="day gray">29</div>
            <div class="day gray">30</div>
            <div class="day gray">31</div>
            <div class="day sun">1</div>

            <div class="day">2</div>
            <div class="day">3</div>
            <div class="day">4</div>
            <div class="day">5</div>
            <div class="day">6</div>
            <div class="day">7</div>
            <div class="day sun">8</div>

            <div class="day">9</div>
            <div class="day">10</div>
            <div class="day">11</div>
            <div class="day">12</div>
            <div class="day">13</div>
            <div class="day">14</div>
            <div class="day sun">15</div>

            <div class="day current">16</div>
            <div class="day">17</div>
            <div class="day">18</div>
            <div class="day">19</div>
            <div class="day">20</div>
            <div class="day">21</div>
            <div class="day sun">22</div>

            <div class="day">23</div>
            <div class="day">24</div>
            <div class="day">25</div>
            <div class="day">26</div>
            <div class="day">27</div>
            <div class="day">28</div>
            <div class="day sun">29</div>

            <div class="day">30</div>
            <div class="day">31</div>
            <div class="day gray">1</div>
            <div class="day gray">2</div>
            <div class="day gray">3</div>
            <div class="day gray">4</div>
            <div class="day gray">5</div>
        </section>
    </div>`
    },

    generateDateSectionTemplate: function(date) {
        const title = 'Today';
        const weekday = 'Monday';
        const month = 'September'
        const fullDate = `${weekday}, 18th ${month}`;

        return `
        <div class="date-title">${title}</div>
        <div class="date-full">${fullDate}</div>
        
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
    generateTaskTemplate: function(title, description) {
        return `
        <div class="task">

            <section class="left-check">
                <div class="checkbox">
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
    }
}
export default templates;
