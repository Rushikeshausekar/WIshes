const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Create fireworks particles
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = random(2, 5);
        this.speedX = random(-5, 5);
        this.speedY = random(-5, 5);
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.97;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Store particles
let particles = [];

function playFireworks() {
    const x = random(0, canvas.width);
    const y = random(0, canvas.height / 2);
    const colors = ['#FF6347', '#FFD700', '#00FF7F', '#87CEEB', '#FF69B4'];

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(random(0, colors.length))]));
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size < 0.5) particles.splice(index, 1);
    });
    requestAnimationFrame(animate);
}

animate();
