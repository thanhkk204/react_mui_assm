
import { useEffect, useState } from 'react';
import Product from '../components/Product'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../index.css';
// import required modules
import { Pagination , Navigation} from 'swiper/modules';
import { ProductType } from '../constants/type';
import { Box, CircularProgress } from '@mui/material';
export default function ProductList() {
  const [products, setProducts] = useState<ProductType[] >([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    console.log('product list')
        const fetchData = async ()=>{
          try {
            setLoading(true)
            const res = await fetch('http://localhost:5000/product',{
              method: "GET",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            })
            const data = await res.json() as ProductType[]
            setProducts(data)
            setLoading(false)
          } catch (error) {
            console.log(error)
              alert('there are something wrong')
            setLoading(false)
          }
        }
        fetchData()
  },[])
  
  return (
    <>
       <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        
      >
       {
      loading && (<Box sx={{width: '100%' ,display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress />
      </Box>)
    }
        {
          products && (
            products.map(item=>(
              <SwiperSlide key={item._id}><Product product={item} /></SwiperSlide>
            ))
          )
        }
      </Swiper>
    </>
  )
}
