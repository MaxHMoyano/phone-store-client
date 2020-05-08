import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectData, fetchArticles } from '../../redux/slices/articlesSlice';

export function Articles() {
  // const articles = useSelector(selectData);
  const dispatch = useDispatch();

  const [articles, setArticles] = useState([
    {
      price: 100,
      image: 'https://bit.ly/2yDLKbt',
      name: 'ITEM 2',
      description: 'KAREN',
      id: 'BFSN39N4BRsWV4vnyQJ2',
    },
    {
      price: 100,
      image:
        'https://s5.eestatic.com/2015/10/03/actualidad/Actualidad_68753203_129196255_1024x576.jpg',
      name: 'TEST',
      description: 'jojojo',
      id: 'HpjSdJtdHG5cla18MqN4',
    },
    {
      price: 100,
      image: 'https://bit.ly/2yDLKbt',
      name: 'ITEM 1',
      description: 'KAREN',
      id: 'MOYQoJeael8HG3U9g4wf',
    },
    {
      price: 100,
      image: 'https://bit.ly/2yDLKbt',
      name: 'ITEM 1',
      description: 'KAREN',
      id: 'VNFchIsYeVwkimOJ5eMT',
    },
    {
      name: 'ITEM 1',
      description: 'KAREN',
      price: 100,
      image: 'https://bit.ly/2yDLKbt',
      id: 'nO5VWMlE2SfLL63uZlhb',
    },
  ]);

  useEffect(() => {
    // dispatch(fetchArticles());
  }, [dispatch]);

  return <Fragment></Fragment>;
}
