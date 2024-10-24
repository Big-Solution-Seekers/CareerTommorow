import { useState } from "react"


export const useCarousel = (carouselImages) => {

  const [pic, setNextPic] = useState(0)

  const handleClickUp = () => setNextPic(prevIdx => (prevIdx + 1) % carouselImages.length)

  const handleClickDown = () => setNextPic(prevIdx => (prevIdx - 1 + carouselImages.length) % carouselImages.length)

  return { handleClickDown, handleClickUp, pic }
}
