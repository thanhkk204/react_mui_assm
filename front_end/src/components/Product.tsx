import { Box, Paper, Rating, Stack, Typography } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../constants/type';
import { useCart } from '../context/CartProvider';

type Props = {
  product: ProductType
}

export default function Product({product}: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const router = useNavigate()
  const {addProductToCart} = useCart()

  const handleShowDetail = ()=>{
    router('/productDetail/'+product._id)
  }
  const handleSetFavorite = (e: any)=>{
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }
  const addToCart = (product: ProductType)=>{
    addProductToCart({
      product_id: product._id,
      quantity: 1,
    })
  }
  return (
    <>
     {
      product && ( <Box 
        onClick={()=>handleShowDetail()}
        sx={{
         position: 'relative',
         borderRadius: '10px',
         overflow: 'hidden',
         boxShadow: theme=> theme.shadows[8],
         transition: theme=> theme.transitions.create(['transform'], {
           duration: theme.transitions.duration.shorter,
           easing: theme.transitions.easing.easeIn
         }) ,
         '&:hover': {
           transform: 'scale(0.95)',
         },
         '&:hover .hover-button': {
             opacity: 1,
             transform: 'scale(1)',
           },
       }}>
         <Paper
          elevation={24}
          sx={{
           width: '100%',
           height: '100%',
           
         }}>
           <Box
           sx={{
             minWidth: '100%',
             maxHeigh: '364px',
             overflow: 'hidden',
             cursor: 'pointer'
           }}
           >
             <img style={{objectFit: 'contain', width: '100%'}} src={product.image} alt="" />
           </Box>
           <Stack 
           sx={{
             px: 2,
             py: 1
           }}
           >
             <Typography variant='body2'>{product.title}</Typography>
             <Box><Rating name="read-only" size="small" value={5} readOnly /></Box>
              <Box sx={{
               width: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
              }}>
               <Box
               sx={{
                 display: 'flex',
                 alignItems: 'center',
                 gap: 1
                }}>
               <Typography variant='body1' sx={{color: theme=>theme.palette.error.light}}>
                 ${product.price} 
               </Typography>
               <Typography variant='caption' sx={{textDecoration: 'line-through', color: theme => theme.palette.grey[500]}}>
                 $455 
               </Typography>
               </Box>
               <Box 
               component={'button'}
               sx={{
                 px: 1,
                 py: 0.5,
                 border: theme=> `1px solid ${theme.palette.error.light}`,
                 backgroundColor: 'transparent',
                 color: theme=> theme.palette.error.light,
                 borderRadius: '3px',
                 cursor: 'pointer'
               }}
               >
                 +
               </Box>
              </Box>
           </Stack>
         </Paper>
         {/* Sale */}
         <Typography 
         sx={{
           position:'absolute',
           top: '10px',
           left: '10px',
           px: 1.9,
           py: 0.5,
           borderRadius: '50px',
           bgcolor: theme=> theme.palette.error.light,
           color: 'white',
           fontSize: '12px'
         }}
         >
           -25% off
         </Typography>
         {/* Cart and favorit */}
         <Box
         className='hover-button'
         sx={{
           position:'absolute',
           top: '5px',
           right: '3px',
           py: 0.5,
           borderRadius: '50px',
           color: 'white',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           gap: '0.4rem',
           transition: theme=> theme.transitions.create(['opacity', 'transform'], {
             duration: theme.transitions.duration.standard,
             easing: theme.transitions.easing.easeInOut,
           }),
           transform: 'scale(0)',
           opacity: 1,
         }}
         >
           <Box 
           onClick={(e)=>handleSetFavorite(e)}
           component={'button'}
           fontSize={'15px'}
           sx={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'white'}}
           >
         { !isFavorite ? <FavoriteBorderIcon  /> : <FavoriteIcon sx={{color: theme=> theme.palette.error.light}}/>}
           </Box>
           <Box 
           component={'button'}
           onClick={(e)=>{e.stopPropagation(), addToCart(product)}}
           fontSize={'15px'}
           sx={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: 'white'}}
           >
           <AddShoppingCartIcon/>
           </Box>
         </Box>
       </Box>)
     }
    </>
  )
}
