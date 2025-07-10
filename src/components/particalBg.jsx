import { useEffect, useRef } from "react";

export default function ParticleEffect({ pixleColor, disturbed }) {
    // Reference for the canvas element
    const canvasRef = useRef(null);

    // Stores the particle data
    const particles = useRef([]);

    // Stores mouse position and interaction radius
    const mouse = useRef({ x: 0, y: 0, radius: 5000 });

    // Holding the color 
    const colorRef = useRef(pixleColor);
    colorRef.current = pixleColor;

    // Is disturbed
    const isDisturbed = useRef(false);
    isDisturbed.current = disturbed;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Function to resize canvas to fit the window
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            // Reinitialize particles on resize
            initializeParticles();
        };

        // Function to create and store particles
        const initializeParticles = () => {
            particles.current = [];
            const gap = 10; // Distance between particles

            for (let x = 0; x < canvas.width; x += gap) {
                for (let y = 0; y < canvas.height; y += gap) {
                    particles.current.push({
                        originX: x, // Original position (for reset effect)
                        originY: y,
                        x,
                        y,
                        vx: 0, // Velocity in X direction
                        vy: 0, // Velocity in Y direction
                    });
                }
            }
        };

        // Function to update and animate particles
        const updateParticles = () => {
            // Clear canvas before drawing new frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p) => {
                // Calculate distance between particle and mouse
                const dx = mouse.current.x - p.x;
                const dy = mouse.current.y - p.y;
                const distance = dx * dx + dy * dy;

                // disturbed logic
                if (isDisturbed.current) {
                    p.vx += (Math.random() - 0.5) * 400;
                    p.vy += (Math.random() - 0.5) * 400;
                    // Apply force if particle is within the mouse radius
                } else if (distance < mouse.current.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (-mouse.current.radius / distance) * 3;
                    p.vx += force * Math.cos(angle) * 5; // Push particle away
                    p.vy += force * Math.sin(angle) * 5;
                }


                // Apply friction to slow down movement
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Move particle with velocity and ease back to original position
                p.x += p.vx + (p.originX - p.x) * 0.9;
                p.y += p.vy + (p.originY - p.y) * 0.9;

                // Draw particle on canvas                
                ctx.fillStyle = colorRef.current;
                const size = colorRef.current == 'red' ? 9.5 : 1.5;
                ctx.fillRect(p.x, p.y, size, size);
            });

            // Request the next animation frame
            requestAnimationFrame(updateParticles);
        };

        // Function to track mouse movement
        const onMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        // Event listeners
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("resize", resizeCanvas);

        // Initialize canvas and start animation
        resizeCanvas();
        updateParticles();

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />;
};

