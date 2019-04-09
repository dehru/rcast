import { createElement } from 'lwc';

import App from './modules/app/app';

init();

function init() {
    document.body.appendChild(
        createElement('sfdx-cloud-console', {
            is: App,
            fallback: false,
        }),
    );
}
