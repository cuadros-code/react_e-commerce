import { Typography, Button, CircularProgress } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  root: {

    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh'

  },
}));

const DetailProduct = ({ getProductById, handleAddToCard }) => {

  const classes = useStyles();
  const [product, setProduct] = useState(null)
  const params = useParams()
  const history = useHistory()

  const getProduct = async () => {
    try {
      const response = await getProductById(params.id)
      setProduct(response)

    } catch (error) {
      history.push('/')
    }
  }

  useEffect(() => {
    getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!product) {
    return (
      <div className={classes.root}>
        <Loading color="secondary" />
      </div>
    )
  }


  return (
    <Container>
      <ImgProduct src={product?.media?.source} alt="" />

      <Description>
        <Typography>{product?.name}</Typography>
        <Typography dangerouslySetInnerHTML={{ __html: product?.description }} variant="body2" color="textSecondary" component="p" />
      </Description>

      <OpcionsProduct>
        <Button
          type="button"
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => handleAddToCard(product?.id, 1)}
        >
          Add to list
        </Button>
      </OpcionsProduct>
    </Container>
  )
}

export default DetailProduct

const Container = styled.div`
  padding: 100px 70px;
  display: grid;
  grid-template-columns: 1fr 2fr 0.8fr;
  @media (max-width: 890px) {
    padding: 100px 0px;
    grid-auto-flow: dense;
    grid-template-columns: 1fr ;
  }
  
`
const Loading = styled(CircularProgress)`
  margin-top: 4.5rem;
`
const Description = styled.div`
  padding-left: 1.5rem;
  @media (max-width: 500px) {
   padding-left: 0;
   grid-row: 3;
  }
`
const OpcionsProduct = styled.div`
  direction: rtl;
  @media (max-width: 890px) {
  grid-row: 2;
  padding: 1rem 0 1rem 0;
  margin: auto;
  }
`
const ImgProduct = styled.img`
  height: 350px; 
  object-fit: cover;
  @media (max-width: 890px) {
    grid-row: 1;
    height: 300px; 
     margin: auto;
  }
`
