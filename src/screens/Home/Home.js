import { Typography } from '@material-ui/core'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import banner from '../../assets/banner.png'
import Products from '../../components/Products/Products'
import { ContextCart } from '../../context/Cart/StateCart'
import { ContextProduct } from '../../context/Product/StateProduct'

const Home = () => {

  const { state: { lastProducts }, getLastProduct } = useContext(ContextProduct)

  useEffect(() => {
    getLastProduct(3)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <BannerImg src={banner} />
      <Typography
        variant="h4"

      >
        Latest Products
      </Typography>
      <Products
        products={lastProducts}
      />

    </Container>
  )
}

export default Home

const BannerImg = styled.img`
    width: 90%;
    margin-bottom: 2rem;
  @media (max-width: 500px){
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

`
const Container = styled.div`
  margin-top: 90px;
  padding: 0 10px 0 10px;
  text-align: center;
  @media (max-width: 500px){
    margin-top: 70px;
  }
`