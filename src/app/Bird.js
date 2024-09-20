export default class Bird {
    constructor(size, x, y, vx, vy, minDistance, smoothingFactor) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.minDistance = minDistance;
        this.opacity = .6;
        this.smoothingFactor = smoothingFactor;
        this.color = `hsl(${this.rnd(170, 190)},${this.rnd(70, 100)}%,${this.rnd(40, 100)}%,${this.opacity})`;
    }

    static clearFlockNearMouse(mouseX, mouseY, radius, flock) {
        for (const bird of flock) {
            const distanceToMouse = Math.sqrt((bird.x - mouseX) ** 2 + (bird.y - mouseY) ** 2);
            if (distanceToMouse < radius) {
                flock.splice(flock.indexOf(bird), 1);
            }
        }
    }

    rnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    update(birds, canvas) {
        const damping = 0.95;
        const { x, y, minDistance, smoothingFactor } = this;

        // Apply simple alignment behavior
        const alignmentRadius = 50;
        const nearbyBirds = birds.filter(otherBird => {
            return (
                otherBird !== this &&
                Math.abs(otherBird.x - x) < alignmentRadius &&
                Math.abs(otherBird.y - y) < alignmentRadius
            );
        });

        if (nearbyBirds.length > 0) {
            let averageAngle = 0;

            for (const otherBird of nearbyBirds) {
                const angle = Math.atan2(otherBird.vy, otherBird.vx);
                averageAngle += angle;
            }

            averageAngle /= nearbyBirds.length;

            // Smoothly adjust the bird's velocity based on the average direction of nearby birds
            this.vx += (0.1 * Math.cos(averageAngle) - this.vx) * smoothingFactor;
            this.vy += (0.1 * Math.sin(averageAngle) - this.vy) * smoothingFactor;

            // Normalize the velocity vector
            const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
            this.vx = (this.vx / speed || 1) * damping;
            this.vy = (this.vy / speed || 1) * damping;
        }

        // Apply simple cohesion behavior
        const cohesionRadius = 50;
        const centerOfMass = { x: 0, y: 0 };

        for (const otherBird of nearbyBirds) {
            centerOfMass.x += otherBird.x;
            centerOfMass.y += otherBird.y;
        }

        if (nearbyBirds.length > 0) {
            centerOfMass.x /= nearbyBirds.length;
            centerOfMass.y /= nearbyBirds.length;

            // Adjust bird's velocity to move towards the center of mass of nearby birds
            this.vx += (0.05 * (centerOfMass.x - x) - this.vx) * smoothingFactor;
            this.vy += (0.05 * (centerOfMass.y - y) - this.vy) * smoothingFactor;

            // Normalize the velocity vector
            const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
            this.vx = (this.vx / speed || 1) * damping;
            this.vy = (this.vy / speed || 1) * damping;
        }

        // Apply simple separation behavior
        const separationRadius = 20;
        const avoidVector = { x: 0, y: 0 };

        for (const otherBird of nearbyBirds) {
            const distance = Math.sqrt((otherBird.x - x) ** 2 + (otherBird.y - y) ** 2);

            if (distance < separationRadius) {
                avoidVector.x += x - otherBird.x;
                avoidVector.y += y - otherBird.y;
            }
        }

        // Adjust bird's velocity to avoid collisions with nearby birds
        this.vx += (0.1 * avoidVector.x - this.vx) * smoothingFactor;
        this.vy += (0.1 * avoidVector.y - this.vy) * smoothingFactor;

        // Normalize the velocity vector
        const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        this.vx = (this.vx / speed || 1) * damping;
        this.vy = (this.vy / speed || 1) * damping;

        // Update bird position based on velocity
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around the canvas edges
        this.x = (this.x + canvas.width) % canvas.width;
        this.y = (this.y + canvas.height) % canvas.height;
    }

    draw(ctx) {
        // Draw the bird as a small circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.stroke();
    }
}
