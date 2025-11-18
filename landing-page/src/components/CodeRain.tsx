import { useEffect, useRef } from 'react';

interface CodeLine {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

export const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<CodeLine[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Code snippets to display
    const codeSnippets = [
      'const', 'function', 'return', 'import', 'export', 'async', 'await',
      'React', 'useState', 'useEffect', 'TypeScript', 'interface',
      '{', '}', '(', ')', '=>', '...', '[]', '<>', '/>',
      'map', 'filter', 'reduce', 'forEach', 'props', 'state',
      'component', 'render', 'mount', 'update', 'effect',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'
    ];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize code lines
    const initLines = () => {
      const lineCount = Math.floor(canvas.width / 30);
      linesRef.current = [];

      for (let i = 0; i < lineCount; i++) {
        linesRef.current.push({
          x: i * 30,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          length: Math.random() * 20 + 10,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };
    initLines();

    // Animation loop
    const animate = () => {
      // Dark semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      linesRef.current.forEach((line) => {
        // Draw code text falling down
        for (let i = 0; i < line.length; i++) {
          const yPos = line.y - i * 20;

          if (yPos > 0 && yPos < canvas.height) {
            // Random code snippet
            const text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

            // Gradient from bright to dim
            const alpha = Math.max(0, line.opacity - (i / line.length) * 0.5);

            // Head of the line is brighter
            if (i === 0) {
              ctx.fillStyle = `rgba(100, 255, 218, ${alpha + 0.3})`;
              ctx.font = 'bold 14px "Courier New", monospace';
            } else {
              ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
              ctx.font = '12px "Courier New", monospace';
            }

            ctx.fillText(text, line.x, yPos);
          }
        }

        // Update position
        line.y += line.speed;

        // Reset when line goes off screen
        if (line.y - line.length * 20 > canvas.height) {
          line.y = -line.length * 20;
          line.speed = Math.random() * 2 + 1;
          line.opacity = Math.random() * 0.5 + 0.3;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.15]"
      style={{
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};
