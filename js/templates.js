const templates = {
    desktopFramework: `
    <main class="desktop">
    <div class="container">
        <section class="date">DATE</section>
        <section class="tasks">TASKS</section>
        <div class="callendar">CALLENDAR</div>
        <aside>ASIDE</aside>
        <button class="add-task-btn">ADD TASK</button>
    </div>
    </main>`,

    desktopAddTaskModal: `
    <div class="modal add-task-modal">
        ADD TASK
        <button class="cancel-task-btn">CANCEL</button>
        <button class="confirm-task-btn">CONFIRM</button>
    </div>`,

    desktopDeleteTaskModal: `
    <div class="modal delete-task-modal">
        DELETE TASK
        <button class="delete-once-btn>DELETE ONCE</button>
        <button class="delete-each-btn>DELETE EACH</button>
    </div>`,

    mobileFramework: `
    <main class="mobile">
    <div class="container">
        <section class="date">DATE</section>
        <section class="tasks">TASKS</section>
        <aside>ASIDE</aside>
    </div>
    </main>`,
}
export default templates;
