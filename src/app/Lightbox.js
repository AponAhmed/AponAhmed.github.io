export default class Lightbox {
    constructor(lightboxImages) {
        this.lightboxImages = lightboxImages || [];
        this.currentImageIndex = 0;

        this.addClickEvent();
    }

    addClickEvent() {
        this.lightboxImages.forEach((image, index) => {
            image.addEventListener('click', () => this.openLightbox(index));
        });

        // Add event listener to close the lightbox when clicking outside the image
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('lightbox-overlay')) {
                this.closeLightbox();
            }
        });

        // Add event listener to navigate to the next image
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.showNextImage();
            }
        });

        // Add event listener to navigate to the previous image
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.showPreviousImage();
            }
        });
    }

    openLightbox(index) {
        this.currentImageIndex = index;

        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.classList.add('lightbox-overlay');
        document.body.appendChild(lightboxOverlay);

        const lightboxImage = document.createElement('img');
        lightboxImage.src = this.lightboxImages[index].src;
        lightboxImage.classList.add('lightbox-image');
        lightboxOverlay.appendChild(lightboxImage);

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&times;';
        closeButton.classList.add('lightbox-close');
        closeButton.addEventListener('click', () => this.closeLightbox());
        lightboxOverlay.appendChild(closeButton);

        // Prevent scrolling when the lightbox is open
        document.body.style.overflow = 'hidden';

        // Add keyboard event listener to close the lightbox on 'Esc' key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    closeLightbox() {
        const lightboxOverlay = document.querySelector('.lightbox-overlay');
        if (lightboxOverlay) {
            lightboxOverlay.remove();
        }

        // Enable scrolling when the lightbox is closed
        document.body.style.overflow = 'auto';
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.lightboxImages.length;
        this.updateLightboxImage();
    }

    showPreviousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const lightboxImage = document.querySelector('.lightbox-image');
        if (lightboxImage) {
            lightboxImage.src = this.lightboxImages[this.currentImageIndex].src;
        }
    }
}

