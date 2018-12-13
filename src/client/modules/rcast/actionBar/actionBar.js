import { LightningElement, api } from 'lwc';

const VIEWS = [
    { viewName: 'podcast', label: 'Podcast', iconUrl: `/svg/sprite.svg#grid` },
    { viewName: 'discover', label: 'Discover', iconUrl: `/svg/sprite.svg#search` },
];

export default class ActionBar extends LightningElement {
    @api viewName;

    get views() {
        return VIEWS.map(view => {
            return {
                ...view,
                className: [
                    `action`,
                    view.viewName === this.viewName ? 'active' : '',
                ]
                .filter(Boolean)
                .join(' '),
            };
        });
    }

    handleViewClick(event) {
        const { viewName } = event.target.dataset;

        // Discard event if the target view is the currently selected one
        if (viewName === this.viewName) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    viewName,
                },
            }),
        );
    }
}