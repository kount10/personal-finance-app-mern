import React, { useEffect, useState } from 'react';

const images = [
  // Unsplash royalty-free images (links as backgrounds)
  'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526304640581-cf6ec1a4b7e4?q=80&w=1600&auto=format&fit=crop'
];

export default function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app-bg-slideshow" aria-hidden="true">
      {images.map((url, i) => (
        <div
          key={url}
          className={`bg-slide ${i === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${url})` }}
        />
      ))}
    </div>
  );
}



