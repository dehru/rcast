import { LightningElement, createElement } from 'lwc';
import HelloWorld from '../components/hello/hello'

export default class App extends LightningElement {

    // @todo: add @track and store state as a test

    constructor() {
        super();
    }

    renderedCallback() {
        // Resolve the current view only after the container has rendered
        if (!this.isRendered) {
            this.isRendered = true;
            this.renderContent();
        }
    }

    renderContent() {
        const el = createElement('hello-world', {
            is: HelloWorld,
            fallback: false,
        });

        // Remove previous components from the container if necessary
        const container = this.template.querySelector('.container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(el);
    }
}
