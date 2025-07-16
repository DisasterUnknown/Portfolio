import { useEffect, useRef } from "react";

export default function BubbleParticles({ bubbleColor = "rgba(0, 255, 251, 0.47)" }) {
  const canvasRef = useRef(null);
  const bubbles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles(); // Recreate bubbles after resize
    };

    // Create bubbles
    const initBubbles = () => {
      const numBubbles = 80; // total bubble count
      bubbles.current = [];
      for (let i = 0; i < numBubbles; i++) {
        bubbles.current.push({
          x: Math.random() * canvas.width, // random X
          y: canvas.height + Math.random() * canvas.height, // start below screen
          radius: Math.random() * 8 + 4, // bubble size
          speed: Math.random() * 1.5 + 0.5, // rising speed
          drift: (Math.random() - 0.5) * 0.4, // small horizontal drifting
        });
      }
    };

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.current.forEach((b) => {
        // Move bubble upwards
        b.y -= b.speed;
        b.x += Math.sin(b.y * 0.01) * b.drift; // slight oscillation

        // If bubble goes above screen, reset it to bottom
        if (b.y + b.radius < 0) {
          b.y = canvas.height + b.radius;
          b.x = Math.random() * canvas.width;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubbleColor;
        ctx.fill();

        // Add a soft glowing edge
        ctx.strokeStyle = "rgba(255, 255, 255, 0.13)";
        ctx.stroke();
      });

      requestAnimationFrame(drawBubbles);
    };

    // Init
    resizeCanvas();
    drawBubbles();

    // Event listeners
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [bubbleColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // stay behind other content
      }}
    />
  );
}
