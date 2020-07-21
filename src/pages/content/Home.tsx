import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { Carousel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNews,
  selectNews,
  selectNewsPendingStatus,
} from '../../redux/slices/newsSlice';
import { isMobile } from 'react-device-detect';
import CreateNews from '../../components/shared/CreateNews';
import { userLoggedInState } from '../../redux/slices/userSlice';
import { News } from '../../models/Shared';
import DeleteNewsConfirm from '../../components/shared/ConfirmDeleteNews';

const Home = () => {
  // global dispatch
  const dispatch = useDispatch();

  // selectors
  const news = useSelector(selectNews);
  const newsPending = useSelector(selectNewsPendingStatus);
  const isUserLoggedIn = useSelector(userLoggedInState);

  // local state
  const [showCreateNewsModal, setShowCreateNewsModal] = useState<boolean>(
    false,
  );
  const [showDeleteNewsModal, setShowDeleteNewsModal] = useState<boolean>(
    false,
  );
  const [currentNews, setCurrentNews] = useState<string>('');

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleDeleteConfirm = (news: News) => {
    setCurrentNews(news.id);
    setShowDeleteNewsModal(true);
  };

  return (
    <div id={'home_container'} className={'main_home'}>
      <CreateNews
        show={showCreateNewsModal}
        onHide={(e) => setShowCreateNewsModal(false)}
      />
      <DeleteNewsConfirm
        newsId={currentNews}
        show={showDeleteNewsModal}
        onHide={(e) => setShowDeleteNewsModal(false)}
      />
      <div className='branding'>
        {/* <h1>Tienda CoolCovers</h1> */}
        <img src={Logo} alt='' />
      </div>
      {!newsPending && !news.length ? (
        <div className={'d-flex flex-column align-items-center '}>
          <i className='fas fa-battery-empty fa-3x'></i>
          <span className='mt-1 mb-2'>No hay novedades!</span>
          {isUserLoggedIn && (
            <Button
              variant={'dark'}
              className={'mx-2'}
              onClick={(e) => setShowCreateNewsModal(true)}>
              Agregar
            </Button>
          )}
        </div>
      ) : (
        <div className='home_carousel'>
          {newsPending ? (
            <div
              className={
                'd-flex flex-column justify-content-center align-items-center'
              }>
              <i className='fas fa-spin fa-spinner fa-2x'></i>
              <span>Cargando novedades . . .</span>
            </div>
          ) : (
            <Carousel interval={7000}>
              {news.map((element, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className='d-block w-100'
                    src={isMobile ? element.img_mobile : element.img_desktop}
                    alt='First slide'
                  />
                  {isUserLoggedIn && (
                    <Carousel.Caption>
                      <Button
                        variant={'dark'}
                        className={'mx-2'}
                        onClick={(e) => setShowCreateNewsModal(true)}>
                        Agregar
                      </Button>
                      <Button
                        onClick={(e) => handleDeleteConfirm(element)}
                        className={'mx-2'}
                        variant={'danger'}>
                        Eliminar
                      </Button>
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
