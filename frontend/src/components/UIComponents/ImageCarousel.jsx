import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const ImageCarousel = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows:false
  };

  return (
    <div>
      <Slider {...settings} className='h-full'>
        {images.map((image, index) => (
          <div key={index} className=' bg-cover w-full p-3 h-full '>
            <img src={image} alt={`Image ${index}`} className='bg-cover w-full rounded-xl h-full' />
          </div>
        ))}
      </Slider>
    </div>
  );
};


