// @ts-nocheck
import React from "react";
// import Carousel from "./Craousel";
import Carousel from "./Carousel";
import carouselStyle from "./carouselArrow.module.scss";
import "./Carousel/assets/styles.scss";
export interface CarouselListProps {
  showItems: number;
  slideItems: number;
  children;
}

export default function CarouselList(props: CarouselListProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: props.showItems,
      slidesToSlide: !!props.slideItems ? props.slideItems : 3, // optional, default to 1.
      partialVisibilityGutter: 40,
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={false}
      autoPlay={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={"desktop"}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      customDot={<div />}
      renderButtonGroupOutside={true}
      //customRightArrow={<CustomRightArrow />}
      // customButtonGroup={<CustomButtonGroup />}
    >
      {props.children}
    </Carousel>
  );
}
