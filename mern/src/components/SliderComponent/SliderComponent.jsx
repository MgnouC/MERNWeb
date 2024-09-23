import { Image } from 'antd';
import React from "react";
import Slider from "react-slick";


const SliderComponent = ({arrImages}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => (
        <div key={index} style={{ padding: '0 120px' }}>
          <img
            src={image}
            alt="slider"
            style={{ width: '100%', height: 'auto', opacity: 1}}
          />
        </div>
      ))}
    </Slider>
  )
}

export default SliderComponent