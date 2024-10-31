import '../styles/Home.css';
import { Link } from 'react-router-dom';
import FieldCards from '../components/FieldCards';
import CarouselComponent from '../components/CarouselComponent';
import ScrollReveal from 'scrollreveal';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // ScrollReveal animations
    ScrollReveal().reveal('.carousel', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
    });

    ScrollReveal().reveal('.mission-section', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      delay: 200,
    });

    ScrollReveal().reveal('.frontpage-container', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      delay: 400,
    });

    // Reveal each field card with a staggered delay
    document.querySelectorAll('.field-card').forEach((card, index) => {
      ScrollReveal().reveal(card, {
        origin: 'bottom',
        distance: '50px',
        scale: 0.85,
        duration: 1000,
        reset: true,
        delay: 800 + index * 200, // Stagger each card by 200ms
        easing: 'ease-in-out',
        opacity: 0,
      });
    });

    // Background color change on scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(scrollTop / maxHeight, 1);

      const startColor = { r: 172, g: 208, b: 230 };
      const endColor = { r: 95, g: 135, b: 161  };

     

      const r = Math.round(startColor.r + (endColor.r - startColor.r) * scrollFraction);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * scrollFraction);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * scrollFraction);

      document.body.style.transition = 'background-color 0.2s ease';
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="title-div">
        <h1 style={{ fontSize: '120px'}}>Career Tomorrow!</h1>
        <h2 style={{ alignItems: 'center' }}>A website made for scholars</h2>
      </div>

      <div className="frontpage">
        <div className="carousel">
          <CarouselComponent />
        </div>
        <div className="mission-section">
          <h1 className="title">Find the right path for you!</h1>
          <p className="mission">
            Our mission is to empower low-income and lower-middle-class students. We aim to help students discover
            diverse educational programs that lead to successful careers, ensuring they have the opportunities and
            resources needed to pursue fulfilling paths that align with their financial realities.
          </p>
          <></>
        </div>
      </div>

      <div className="frontpage-container">
        <h2>Let The Discovery Begin!</h2>
        <FieldCards className="field-card" /> {/* Ensure FieldCards has this class */}
      </div>
      <div className="quiz-section">
        <h2>Don't know what field to choose?</h2>
        <h4>Take this quiz!</h4>
        <Link to="/quiz">
          <button type="submit">Take quiz!</button>
        </Link>
      </div>
    </>
  );
}
