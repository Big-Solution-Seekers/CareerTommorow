import { useState } from 'react'
import { useCarousel } from '../hooks/useCarousel';

const carouselImages = [
  "https://thumbs.dreamstime.com/b/programmer-working-program-web-developer-coding-computer-screen-code-script-open-windows-coder-engineer-vector-208530984.jpg",
  "https://www.iso.org/files/live/sites/isoorg/files/news/insights/healthcare/Healthcare-management_banner_1020x440.svg",
  "https://media.istockphoto.com/id/1357904539/vector/business-team-brainstorm.jpg?s=612x612&w=0&k=20&c=YDsISgzkmbg18XNZOq5L11PBHjl3MePvoqBNv9Tw7jk=",
];

const CarouselComponent = () => {
  const { handleClickDown, handleClickUp, pic } = useCarousel(carouselImages)
  return (
    <>
      <h1 style={{ textAlign: "center" }}></h1>
      <img src={carouselImages[pic]} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handleClickDown}>{"<"} Prev</button>
        <button onClick={handleClickUp}> Next {">"}</button>
      </div>
    </>
  );
}

export default CarouselComponent