"use client";
import { useEffect, useState } from "react";
import ClientOnly from "@/components/ClientOnly";

function StarsContent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    // Clear existing stars
    starsContainer.innerHTML = "";

    const numberOfStars = 40;
    const stars = [];

    // Generate star data first
    for (let i = 0; i < numberOfStars; i++) {
      stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        shadow: Math.floor(Math.random() * 8) + 2,
        delay: Math.random() * 2,
      });
    }

    // Create stars with consistent data
    stars.forEach((starData) => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = starData.left + "%";
      star.style.top = starData.top + "%";
      star.style.width = starData.size + "px";
      star.style.height = starData.size + "px";
      star.style.position = "absolute";
      star.style.background = "white";
      star.style.borderRadius = "50%";
      star.style.opacity = starData.opacity.toString();
      star.style.boxShadow = `0 0 ${starData.shadow}px #fff`;
      star.style.animation = `twinkle 2s infinite alternate`;
      star.style.animationDelay = starData.delay + "s";
      starsContainer.appendChild(star);
    });
  }, [isClient]);

  // Return empty div during SSR to prevent hydration mismatch
  if (!isClient) {
    return <div id="stars" className="fixed inset-0 z-0 pointer-events-none" />;
  }

  return <div id="stars" className="fixed inset-0 z-0 pointer-events-none" />;
}

export default function Stars() {
  return (
    <ClientOnly>
      <StarsContent />
    </ClientOnly>
  );
}
