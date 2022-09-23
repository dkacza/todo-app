import callendarView from "./callendarView.js";
import dateView from "./dateView.js";
import taskView from "./taskView.js";

const view = {
    body: document.querySelector('body'),
    WIDTH_BREAKPOINT: 800,

    loadHTMLFramework: function(viewType) {
        this.viewType = viewType;
        this.body.innerHTML = '';
        // this.body.innerHTML = this.generateHTMLFramework(viewType);
        this.body.insertAdjacentHTML('beforeend', this.generateHTMLFramework(viewType));

        dateView.renderInitial();
        callendarView.renderInitial();
        taskView.renderInitial();
    },

    checkResize: function() {
        const newViewType = (window.innerWidth >= this.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
        if (newViewType == this.viewType) return;
        this.loadHTMLFramework(newViewType);
    },

    generateHTMLFramework() {
        let result = '';
        if(this.viewType == 'mobile') result += this.mobileFramework;
        else result += this.desktopFramework;
        return result;
    },

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
};
export default view;