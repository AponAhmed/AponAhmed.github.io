export default class BB8 {
    constructor(bb8Element) {
        this.bb8 = bb8Element;

        this.antennas = this.bb8.querySelector('.antennas');
        this.head = this.bb8.querySelector('.head');
        this.eyes = this.bb8.querySelector('.eyes');
        this.ball = this.bb8.querySelector('.ball');


        this.droidX = 0;
        this.mouseX = 150;
        this.speed = 2;
        this.accelMod = 1;
        this.toTheRight = true;

        this.init();
    }

    init() {
        // Track mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouseX = event.pageX;
        });

        // Start the movement
        this.startMovement();
        // Add event listeners for toggling the chatbot window
        this.head.addEventListener('click', (event) => {
            this.toggleChatbotWindow();
        });

        this.ball.addEventListener('mousedown', (event) => {
            this.toggleChatbotWindow();
        });
    }

    toggleChatbotWindow() {
        this.chatbotWindow = document.getElementById('chatbot-window'); // Reference to the chatbot window
        // Toggle between 'none' and 'flex'
        if (this.chatbotWindow.style.display === 'none' || this.chatbotWindow.style.display === '') {
            this.chatbotWindow.style.display = 'flex';
        } else {
            this.chatbotWindow.style.display = 'none';
        }
    }

    movement() {
        let distance = this.mouseX - this.droidX;
        let acceleration = Math.abs(distance * this.accelMod) / 100;

        // Move to the right
        if (this.droidX < this.mouseX) {
            this.droidX += this.speed * acceleration;
            this.toTheRight = true;
        }
        // Move to the left
        else {
            this.droidX -= this.speed * acceleration;
            this.toTheRight = false;
        }

        // Update BB8 position
        this.bb8.style.transform = `translateX(${this.droidX}px)`;

        // Update antenna and head movement based on droid's position
        let antennaTransformX = (this.mouseX - this.droidX) / 25;
        let antennaRotateZ = (this.mouseX - this.droidX) / 80;
        this.antennas.style.transform = `translateX(${antennaTransformX}px) rotateZ(${antennaRotateZ}deg)`;

        let headTransformX = (this.mouseX - this.droidX) / 25;
        let headRotateZ = (this.mouseX - this.droidX) / 35;
        this.head.style.transform = `translateX(${headTransformX}px) rotateZ(${headRotateZ}deg)`;

        // Update directional classes
        if (this.toTheRight) {
            this.antennas.classList.add('right');
            this.eyes.classList.add('right');
        } else {
            this.antennas.classList.remove('right');
            this.eyes.classList.remove('right');
        }

        // Update ball rotation
        this.ball.style.transform = `rotateZ(${this.droidX * 1.2}deg)`;
    }

    startMovement() {
        // Set interval for continuous movement
        setInterval(() => this.movement(), 10);
    }
}
