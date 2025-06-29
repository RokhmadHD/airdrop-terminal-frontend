// src/components/layout/HeroCanvas.tsx

"use client";

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Kita tambahkan kecepatan pada sumbu x dan y untuk gerakan yang lebih dinamis
interface Particle {
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  size: number;
}

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const isMobile = window.innerWidth < 768;
    let animationFrameId: number;
    const particles: Particle[] = [];
    // Kurangi jumlah partikel karena menggambar garis lebih berat secara komputasi
    const numParticles = isMobile ? 30 : 70;
    // Jarak maksimum untuk menggambar garis antar partikel
    const maxDistance = 120;

    // Sesuaikan warna berdasarkan tema
    const particleColor = theme === 'dark' ? 'rgba(165, 180, 252, 1)' : 'rgba(99, 102, 241, 1)'; // Indigo-300 / Indigo-500
    // const lineColor = theme === 'dark' ? 'rgba(129, 140, 248, 1)' : 'rgba(79, 70, 229, 1)'; // Indigo-400 / Indigo-600

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Kecepatan acak di sumbu x dan y (-0.5 hingga 0.5)
          vx: Math.random() - 0.5,
          vy: Math.random() - 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const drawLines = () => {
      let p1, p2;
      for (let i = 0; i < particles.length; i++) {
        p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          p2 = particles[j];

          const distanceX = p1.x - p2.x;
          const distanceY = p1.y - p2.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < maxDistance) {
            // Hitung opasitas berdasarkan jarak
            // const opacity = 1 - (distance / maxDistance);

            ctx.beginPath();
            ctx.strokeStyle = 'indigo'//`rgba(${lineColor.slice(5, -1)}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Bersihkan canvas setiap frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Update posisi partikel
        p.x += p.vx;
        p.y += p.vy;

        // Buat partikel memantul di tepi layar
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Gambar partikel
        ctx.beginPath();
        ctx.fillStyle = particleColor;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gambar garis-garis yang menghubungkan partikel
      drawLines();

      animationFrameId = window.requestAnimationFrame(animate);
    };

    // Inisialisasi dan jalankan
    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default HeroCanvas;