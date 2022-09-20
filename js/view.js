import templates from "./templates.js";
import callendarView from "./callendarView.js";
import dateView from "./dateView.js";

const view = {
    body: document.querySelector('body'),
    WIDTH_BREAKPOINT: 800,

    loadHTMLFramework: function(viewType) {
        this.viewType = viewType;
        this.body.innerHTML = '';
        this.body.innerHTML = templates.generateHTMLFramework(viewType);

        dateView.renderInitial();
        callendarView.renderInitial();
    },

    checkResize: function() {
        const newViewType = (window.innerWidth >= this.WIDTH_BREAKPOINT ? 'desktop' : 'mobile');
        if (newViewType == this.viewType) return;
        console.log('resize');
        this.loadHTMLFramework(newViewType);
    },
};
export default view;