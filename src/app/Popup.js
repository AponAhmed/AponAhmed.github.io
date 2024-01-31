import { Dombuilder } from "@aponahmed/dombuilder";
import Lightbox from "./lightbox";
// Popup class

class Popup {
    constructor(popupId) {
        this.popupId = popupId;

        this.popupUi = new Dombuilder('div').classes([
            'fixed',
            'left-0',
            'top-0',
            'w-full',
            'h-full',
            'bg-primary-dark-full',
            'bg-opacity-40',
            'zi-10'
        ]);
        this.popupInner = new Dombuilder('div').classes([
            'popup-content',
            'm-10',
            'p-10',
            'h-full',
            'border',
            'border-slate-600',
            'rounded-md',
            'bg-custom-bg',
            'max-h-full'

        ]).element;
        // Close button
        const closeButton = new Dombuilder('button')
            .classes([
                'absolute',
                'top-0',
                'right-0',
                'm-2',
                'cursor-pointer',
                'text-5xl',
                'font-light',
                'leading-3'
            ])
            .html('&times;')
            .event('click', () => this.close())
            .element;
        const header = new Dombuilder('div');
        header.append(closeButton);
        // Append close button to popup
        this.popupUi.append(header.element);
        this.popupUi.append(this.popupInner)
        this.outer = new Dombuilder('div').classes(['absolute', 'left-0', 'top-0', 'w-full', 'h-full', 'z-[-1]']);
        this.outer.event('click', (e) => {
            this.close();
        });
        this.popupUi.append(this.outer.element)
    }

    open() {
        return new Promise((resolve, reject) => {
            this.loadContent()
                .then(() => {
                    this.renderToBody();
                    resolve();
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    reject(error);
                });
        });
    }

    close() {
        this.popupUi.element.remove();
    }

    loadContent() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        this.popupInner.innerHTML = xhr.responseText;
                        resolve();
                    } else {
                        reject(new Error(`Failed to load content. Status: ${xhr.status}`));
                    }
                }
            };
            xhr.open('GET', './popups/' + this.popupId + '.html', true);
            xhr.send();
        });
    }

    renderToBody() {
        document.body.appendChild(this.popupUi.element);
        const imageElements = this.popupUi.element.querySelectorAll('.lightbox');
        const lightbox = new Lightbox(Array.from(imageElements));
    }
}

export default Popup;