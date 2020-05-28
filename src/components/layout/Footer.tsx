import React from 'react';

const Footer = () => {
  const goToPage = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer className='main_footer'>
      <div>&nbsp;</div>
      <div className='d-flex'>&copy; CoolCovers {new Date().getFullYear()}</div>
      <div className='d-flex'>
        <i
          className='fab fa-instagram footer_button'
          onClick={(e) =>
            goToPage('https://www.instagram.com/tiendacoolcovers/')
          }
        ></i>
      </div>
    </footer>
  );
};

export default Footer;
