import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMergeState } from 'react-hooks-lib'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import Loader from '../components/Loader'

const Product = props => {
  const {state, set} = useMergeState({
    product: null,
    isLoading: true,
    error: null
  })
  const {id} = useParams();

  useEffect(() => {
    getProductInfo();
  }, [])

  const getProductInfo = () => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => {
        set({
          product: json, 
          isLoading: false
        })
      })
      .catch(error => {
        set({
          error: error,
          isLoading: false
        })
      })
  }
  return (
    <Container>
      {state.isLoading ? <Loader /> :
        <React.Fragment>
          <div>
            Product {state.product ? state.product.title : null}
          </div>
        </React.Fragment>
      }
    </Container>
  )
}

Product.propTypes = {

}

export default Product
