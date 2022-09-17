import templates from "./templates.js";

const view = {
    // DOM elements
    domBody: document.querySelector('body'),
    currentSize: null,

    // FUNCTIONS
    loadHTML: function(viewType) {
        console.log(viewType);
        if(viewType == 'desktop') {
            this.domBody.innerHTML = '';
            this.domBody.innerHTML = templates.desktopFramework;
        }
        if(viewType == 'mobile') {
            this.domBody.innerHTML = '';
            this.domBody.innerHTML = templates.mobileFramework;
        }
    }
}
export default view;