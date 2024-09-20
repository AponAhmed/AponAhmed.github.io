import { Dombuilder } from "@aponahmed/dombuilder";
import Popup from './Popup.js';
import Lightbox from "./lightbox.js";
import Bird from "./Bird.js";

export default class App {
  constructor() {
    // Bind the methods to the class instance
    this.back2Top = this.back2Top.bind(this);
    this.nav = this.nav.bind(this);
    this.headerPos = null;
  }

  handleButtonClick(event) {
    const popupId = event.target.dataset.popup;
    const newPopup = new Popup(popupId);
    newPopup.open();
  }

  popupInit() {
    // Add click event listener to all buttons with class 'popup-button'
    const popupButtons = document.querySelectorAll('.popup-button');
    popupButtons.forEach(button => {
      button.addEventListener('click', this.handleButtonClick);
    });
  }

  back2Top() {
    // Get the back to top button
    const backToTopButton = document.getElementById('back-to-top-btn');

    // Add click event listener to the back to top button
    backToTopButton.addEventListener('click', () => {
      // Scroll smoothly to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Add scroll event listener to show/hide back to top button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        // If scrolled down, show the back to top button
        backToTopButton.classList.remove('hidden');
      } else {
        // If at the top, hide the back to top button
        backToTopButton.classList.add('hidden');
      }
    });
  }

  nav() {
    // Get the mobile menu button and mobile menu
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.querySelector('header');

    const main = document.querySelector('main');

    // Add click event listener to the mobile menu button
    mobileMenuButton.addEventListener('click', () => {
      // Toggle the visibility of the mobile menu
      mobileMenu.classList.toggle('hidden');
    });

    // Get all links with the class 'scroll-link'
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    // Add click event listener to each scroll link
    scrollLinks.forEach(scrollLink => {
      scrollLink.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = scrollLink.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll smoothly to the target element
          window.scrollTo({
            top: targetElement.offsetTop - header.offsetHeight,
            behavior: 'smooth'
          });

          // Set the Tailwind CSS classes for the active and inactive links
          scrollLinks.forEach(link => {
            let lnkid = link.getAttribute('href').substring(1);
            if (lnkid != "home") {
              link.classList.remove('text-primary-color', 'active');
              link.classList.add('text-gray-300', 'hover:text-primary-color');
            }
          });
          if (targetId != "home") {
            scrollLink.classList.add('text-primary-color', 'active');
          }
          // Hide the mobile menu after clicking a link (if it's visible)
          mobileMenu.classList.add('hidden');
        }
      });
    });

    // Add scroll event listener to fix the header when scrolled out of view
    window.addEventListener('scroll', () => {
      if (!this.headerPos) {
        this.headerPos = header.getBoundingClientRect();
      }
      if (window.scrollY > header.offsetHeight) {
        header.classList.add('fixed', 'z-50', 'fixed-header');
        //header.classList.remove('p-0');
        header.style.left = `${this.headerPos.x}px`;
        main.style.paddingTop = this.headerPos.height + "px";
        header.style.top = `0px`;
        header.style.width = `${this.headerPos.width}px`;
      } else {
        header.classList.remove('fixed', 'z-50', 'fixed-header');
        main.style.paddingTop = 0;
        //header.classList.add('fixed', 'py-4');
      }
    });
  }

  typeEffect() {
    // Find all elements with data-typing attribute
    var elements = document.querySelectorAll('[data-typing]');

    elements.forEach(function (element) {
      var texts = element.dataset.typing.split('|').map(function (text) {
        element.removeAttribute('data-typing');
        return text.trim();
      });

      var currentIndex = 0;
      var currentText = '';
      var isDeleting = false;

      function type() {
        var delay = 100; // Adjust the typing speed

        if (isDeleting) {
          currentText = texts[currentIndex].substring(0, currentText.length - 1);
          delay = 50; // Faster deletion speed
        } else {
          currentText = texts[currentIndex].substring(0, currentText.length + 1);
        }

        element.innerHTML = currentText;

        if (!isDeleting && currentText === texts[currentIndex]) {
          isDeleting = true;
          delay = 500; // Wait after typing
        } else if (isDeleting && currentText === '') {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % texts.length;
          delay = 200; // Faster delay before starting to type next text
        }

        setTimeout(type, delay);
      }

      type(); // Start the typing effect
    });

  }

  hilighter() {
    // Get the element with the class "highlight"
    var element = document.querySelector('.highlight');
    // Get the text content of the element
    var text = element.textContent;
    // Create a new HTML content with each character wrapped in a span
    var htmlContent = text.split('').map(function (char, index) {
      // Calculate animation delay for each span
      var animationDelay = (index + 1) * 0.1;
      // Wrap each character in a span with animation-delay
      return '<span style="animation-delay: ' + animationDelay.toFixed(1) + 's;">' + char + '</span>';
    }).join('');
    // Set the new HTML content back to the element
    element.innerHTML = htmlContent;
  }

  lightboxInit() {
    const imageElements = document.querySelectorAll('.lightbox');
    const lightbox = new Lightbox(Array.from(imageElements));
  }


  ntf(form, message, textColor, bgColor) {
    // Create a new notification element
    const notificationContainer = form;
    const notification = document.createElement('div');
    notification.classList.add('py-2', 'px-4', 'rounded', 'mb-2', 'text-sm', textColor, bgColor);
    notification.innerText = message;

    // Append the notification to the container
    notificationContainer.appendChild(notification);

    // Remove the notification after a few seconds (adjust as needed)
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  async submitForm(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Get the form element
    const form = event.target;
    // Fetch API to submit the form data
    // Disable the submit button and show loading state
    const submitButton = form.querySelector('button');
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;

    try {
      // Fetch API to submit the form data
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json();
      // Check if the submission was successful
      if (data.success) {
        // Show a success notification (you can replace this with your own notification logic)
        this.ntf(form, 'Form submitted successfully!', 'text-green-700', 'bg-green-100');
        form.reset();
      } else {
        // Handle errors or show an error notification
        this.ntf(form, 'Form submission failed. Please try again.', 'text-red-700', 'bg-red-100');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting form:', error);
      this.ntf(form, 'An error occurred. Please try again later.', 'text-red-700', 'bg-red-100');
    } finally {
      // Enable the submit button and restore its text
      submitButton.innerText = 'Send';
      submitButton.disabled = false;
    }
  }

  birdsFlocking() {

    // Initialize flock
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;pointer-events: none;`;//pointer-events: none;

    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const flock = [];
    const flockSize = 150;

    window.addEventListener("resize", (e) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    })

    for (let i = 0; i < flockSize; i++) {
      flock.push(new Bird(
        .6,//Size
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 - 1, // Random velocity in x direction
        Math.random() * 2 - 1, // Random velocity in y direction
        Math.random() * 30 + 20, // Random minDistance between 20 and 50
        0.1 // Smoothing factor
      ));
    }

    // canvas.addEventListener('mousemove', (event) => {
    //   const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    //   const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    //   const breakRadius = 50; // Adjust the radius as needed
    //   Bird.clearFlockNearMouse(mouseX, mouseY, breakRadius, flock);
    // });

    function drawFlock() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const bird of flock) {
        bird.draw(ctx);
      }
    }

    function updateFlock() {
      for (const bird of flock) {
        bird.update(flock, canvas);
      }
    }

    function animate() {
      updateFlock();
      drawFlock();
      requestAnimationFrame(animate);
    }
    animate();
  }

  robot() {
    let eve = new Eve();
    eve.init();
  }



  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.typeEffect();
      this.hilighter();
      this.nav();
      this.back2Top();
      this.popupInit();
      this.lightboxInit()
      const form = document.getElementById('contactForm');
      form.addEventListener('submit', this.submitForm.bind(this));
      this.birdsFlocking();
      //this.robot();
    });
  }
}
