import React, { useEffect, useState } from 'react';

import { arrayProductos } from '../../ArrayProductos/data.js';
import ItemDetail from '../ItemDetail';
import './style.css';
import { useParams } from 'react-router';

const ItemDetailContainer = () => {

  const { id } = useParams()
    const [detail, setDetail] = useState({})
    const [loading, setLoading] = useState(true);
   
    const getDetailPromise = new Promise((res,rej) => {
        setTimeout(() => {
          const productoFiltrado = arrayProductos.find(e => e.id === Number(id))
          res(productoFiltrado)
        }, (2000));
    })

    const getDetail = async() =>{
      try {
        const data = await getDetailPromise;
        setDetail(data);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
     }

    useEffect(() => {
      setLoading(true);
      getDetail();
      // eslint-disable-next-line  
    },[id])

  


  return (
    <div className='itemdetail-container'>
      {loading ? 
        (
          <p>Cargando, espere un momento...</p>
        ) : detail ? 
          (
            <ItemDetail item={detail} />  
          ) : 
            (
              <p>No se encuentra disponible</p>
              
            )
        }
    </div>

  )
}

export default ItemDetailContainer