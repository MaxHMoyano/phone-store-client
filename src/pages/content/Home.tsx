import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { Carousel } from 'react-bootstrap';
import News from '../../assets/news.gif';

const Home = () => {
  const [news] = useState([
    {
      name: '',
      image: News,
    },
    {
      name: '',
      image:
        'https://images.unsplash.com/photo-1527264935190-1401c51b5bbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    },
  ]);

  return (
    <div id={'home_container'} className={'main_home'}>
      <div className='branding'>
        <div>
          <img src={Logo} alt='' />
        </div>
        <div>
          <h1 style={{ fontSize: '3rem' }}>Tienda CoolCovers</h1>
          <p style={{ fontSize: '1.5rem' }}>
            Tienda de accesorios premium, y servicio técnico especializado en
            iPhones
          </p>
        </div>
      </div>
      <div className='home_carousel'>
        <Carousel interval={null}>
          {news.map((element, idx) => (
            <Carousel.Item key={idx}>
              <img
                className='d-block w-100'
                src={element.image}
                alt='First slide'
              />
              <Carousel.Caption>
                <h3>{element.name}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
