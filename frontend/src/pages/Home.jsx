// import '../styles/Home.css';
// import { Link } from 'react-router-dom';
// import FieldCards from '../components/FieldCards';
// import CarouselComponent from '../components/CarouselComponent';
// import ScrollReveal from 'scrollreveal';
// import { useEffect } from 'react';

// export default function HomePage() {
//   // useEffect(() => {
//   //   ScrollReveal().reveal('.carousel', {
//   //     origin: 'bottom',
//   //     distance: '50px',
//   //     duration: 1000,
//   //     reset: true
//   //   });

//   //   ScrollReveal().reveal('.mission-section', {
//   //     origin: 'bottom',
//   //     distance: '50px',
//   //     duration: 1000,
//   //     reset: true,
//   //     delay: 200
//   //   });

//   //   ScrollReveal().reveal('.frontpage-container', {
//   //     origin: 'bottom',
//   //     distance: '50px',
//   //     duration: 1000,
//   //     reset: true,
//   //     delay: 400
//   //   });

//   //   ScrollReveal().reveal('.quiz-section', {
//   //     origin: 'bottom',
//   //     distance: '50px',
//   //     duration: 1000,
//   //     reset: true,
//   //     delay: 600
//   //   });

//   //   // Add zoom effect to FieldCards
//   //   ScrollReveal().reveal('.field-card', {
//   //     origin: 'bottom',
//   //     distance: '50px',
//   //     scale: 0.85, // Start smaller
//   //     duration: 1000,
//   //     reset: true,
//   //     delay: 800,
//   //     easing: 'ease-in-out', // Optional: Smooth transition
//   //     opacity: 0 // Optional: Start invisible
//   //   });

//   //   // Change background color on scroll
//   //   const handleScroll = () => {
//   //     const scrollTop = window.scrollY;
//   //     const maxHeight = document.body.scrollHeight - window.innerHeight;
//   //     const scrollFraction = scrollTop / maxHeight;


//   //     const startColor = { r: 173, g: 216, b: 230 };
//   //     const endColor = { r: 255, g: 255, b: 255 };

//   //     const r = Math.round(startColor.r + (endColor.r - startColor.r) * scrollFraction);
//   //     const g = Math.round(startColor.g + (endColor.g - startColor.g) * scrollFraction);
//   //     const b = Math.round(startColor.b + (endColor.b - startColor.b) * scrollFraction);

//   //     document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
//   //   };

//   //   window.addEventListener('scroll', handleScroll);

//   //   // Cleanup event listener on component unmount
//   //   return () => {
//   //     window.removeEventListener('scroll', handleScroll);
//   //   };
//   // }, []);

//   return (
//     <>
//       <div className="frontpage">
//         <div className="carousel">
//           <CarouselComponent />
//         </div>
//         <div className="mission-section">
//           <h1 className="title">Find the right path for you!</h1>
//           <p className="mission">
//             Our mission is to empower low-income and lower-middle-class students. We aim to help students discover diverse educational
//             programs that lead to successful careers, ensuring they have the opportunities and resources needed to pursue
//             fulfilling paths that align with their financial realities.
//           </p>
//         </div>
//       </div>
//       <div className="frontpage-container">
//         <FieldCards className="field-card" /> {/* Ensure FieldCards has this class */}
//         <div className="quiz-section">
//           <h3>Don't know what field to choose?</h3>
//           <h4>Take this quiz!</h4>
//           <Link to="/quiz">
//             <button type="submit">Take quiz!</button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }


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
      reset: true
    });

    ScrollReveal().reveal('.mission-section', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      delay: 200
    });

    ScrollReveal().reveal('.frontpage-container', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      delay: 400
    });

    ScrollReveal().reveal('.quiz-section', {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      reset: true,
      delay: 600
    });

    ScrollReveal().reveal('.field-card', {
      origin: 'bottom',
      distance: '50px',
      scale: 0.85,
      duration: 1000,
      reset: true,
      delay: 800,
      easing: 'ease-in-out',
      opacity: 0
    });

    // Background color change on scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(scrollTop / maxHeight, 1); // Keep within [0, 1] range

      // Define start and end colors for the gradient
      const startColor = { r: 173, g: 216, b: 230 }; // Light blue
      const endColor = { r: 255, g: 255, b: 255 };   // White

      // Calculate the RGB values for the current scroll position
      const r = Math.round(startColor.r + (endColor.r - startColor.r) * scrollFraction);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * scrollFraction);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * scrollFraction);

      // Set the background color with a smooth transition
      document.body.style.transition = 'background-color 0.2s ease';
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="frontpage">
        <div className="carousel">
          <CarouselComponent />
        </div>
        <div className="mission-section">
          <h1 className="title">Find the right path for you!</h1>
          <p className="mission">
            Our mission is to empower low-income and lower-middle-class students. We aim to help students discover diverse educational
            programs that lead to successful careers, ensuring they have the opportunities and resources needed to pursue
            fulfilling paths that align with their financial realities.
          </p>
        </div>
      </div>
      <div className="frontpage-container">
        <FieldCards className="field-card" />
        <div className="quiz-section">
          <h3>Don't know what field to choose?</h3>
          <h4>Take this quiz!</h4>
          <Link to="/quiz">
            <button type="submit">Take quiz!</button>
          </Link>
        </div>
      </div>
    </>
  );
}
