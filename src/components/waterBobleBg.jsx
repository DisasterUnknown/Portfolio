import { useEffect, useRef } from "react";

export default function BubbleParticles({
  bubbleColor = "rgba(0, 255, 251, 0.47)",
}) {
  const canvasRef = useRef(null);
  const bubbles = useRef([]);
  const mouse = useRef({ x: null, y: null, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ✅ Mouse movement (desktop)
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    // ✅ Touch movement (mobile)
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    // ✅ Resize canvas & regenerate bubbles
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Optional: Clamp bubbles inside new canvas size
      bubbles.current.forEach(b => {
        if (b.x > canvas.width) b.x = canvas.width - b.radius;
        if (b.y > canvas.height) b.y = canvas.height - b.radius;
      });
    };

    // ✅ Create bubbles dynamically based on screen size
    const initBubbles = () => {
      const screenArea = canvas.width * canvas.height;
      const numBubbles = Math.floor(screenArea / 20000); // adjust density
      bubbles.current = [];
      for (let i = 0; i < numBubbles; i++) {
        bubbles.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * canvas.height,
          radius: Math.random() * 8 + 4,
          speed: Math.random() * 1.5 + 0.5,
          drift: (Math.random() - 0.5) * 1.4,
          vx: 10, // velocity X for repulsion
          vy: 0, // velocity Y for repulsion
        });
      }
    };

    // ✅ Draw + animate bubbles
    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.current.forEach((b) => {
        // Upward floating movement
        b.y -= b.speed;
        b.x += Math.sin(b.y * 0.01) * b.drift;

        // 🖱 Mouse/touch repulsion
        if (mouse.current.x !== null && mouse.current.y !== null) {
          let dx = b.x - mouse.current.x;
          let dy = b.y - mouse.current.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.current.radius) {
            let force = (mouse.current.radius - dist) / mouse.current.radius;
            let angle = Math.atan2(dy, dx);

            // Push bubble away
            b.vx += Math.cos(angle) * force * 2;
            b.vy += Math.sin(angle) * force * 2;
          }
        }

        // Apply velocity (repulsion effect)
        b.x += b.vx;
        b.y += b.vy;

        // Friction - slow down over time
        b.vx *= 0.9;
        b.vy *= 0.7;

        // Reset bubble if it goes above screen
        if (b.y + b.radius < 0) {
          b.y = canvas.height + b.radius;
          b.x = Math.random() * canvas.width;
          b.vx = 0;
          b.vy = 0;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubbleColor;
        ctx.fill();

        // Soft glow edge
        ctx.strokeStyle = "rgba(255, 255, 255, 0.13)";
        ctx.stroke();
      });

      requestAnimationFrame(drawBubbles);
    };

    // ✅ Init everything
    resizeCanvas();
    initBubbles();
    drawBubbles();

    // ✅ Add all event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      // ✅ Cleanup
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}
