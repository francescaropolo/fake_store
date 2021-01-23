import React, { useContext, useEffect, useState } from 'react'
import { useMergeState } from 'react-hooks-lib'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import ProductItem from '../components/ProductItem'
import styled from 'styled-components'
import Loader from '../components/Loader'
import CommonContext from '../utils/context'

const Intro = styled.section``
const PageTitle = styled.h1``
const PageDescription = styled.p``
const Filters = styled.section`
    display: flex;
    align-items: center;
    padding-bottom: ${props => props.theme.spacing(3)};
`
const FilterText = styled.span`
    margin-right: ${props => props.theme.spacing(1)};
`
const FiltersContainer = styled.div``
const FilterItem = styled.button`
    background: ${props => props.isSelected ? props.theme.primary : props.theme.white};
    padding: 8px 16px;
    border: 1px solid ${props => props.isSelected ? props.theme.primary : props.theme.black};
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    color: ${props => props.isSelected ? props.theme.white : props.theme.black};
    margin-right: ${props => props.theme.spacing(1)};
    transition: all .1s ease;

    &:hover {
        border: 1px solid ${props => props.theme.primary};
    }
`
const ProductsList = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
`

const Shop = props => {
    const context = useContext(CommonContext);
    const { theme } = context;
    const { state, set } = useMergeState({
        filteredProducts: null,
        products: [],
        isLoading: true,
        categories: [],
        selectedCategory: 'all',
        error: null
    })

    useEffect(() => {
        getCategories();
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                set({
                    products: json,
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

    const getCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => {
                set({
                    categories: json,
                })
            })
            .catch(error => {
                set({
                    error: error,
                })
            })
    }

    const handleSelectCategory = (ev, category) => {
        set({ selectedCategory: category })
    }

    useEffect(() => {
        updateProducts();
    }, [state.selectedCategory, state.products])

    const updateProducts = () => {
        let updatedProducts = [];
        const oldProducts = [...state.products];

        if (state.selectedCategory === 'all') {
            updatedProducts = oldProducts
        } else {
            for (let x = 0; x < oldProducts.length; x++) {
                if (oldProducts[x].category === state.selectedCategory) {
                    updatedProducts.push(oldProducts[x])
                }
            }
        }
        
        set({ filteredProducts: updatedProducts })

    }

    return (
        <Container>
            <Intro>
                <PageTitle theme={theme}>All products</PageTitle>
                <PageDescription theme={theme}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed ad ex quibusdam laboriosam inventore incidunt necessitatibus aspernatur quidem tempore ullam earum commodi repudiandae rerum, dolorum provident, tempora vitae magnam error!</PageDescription>
            </Intro>
            {state.isLoading ? <Loader /> :
                <React.Fragment>
                    <Filters theme={theme}>
                        <FilterText theme={theme}>Filter :</FilterText>
                        <FiltersContainer>
                            <FilterItem theme={theme} onClick={(ev => handleSelectCategory(ev, 'all'))} isSelected={state.selectedCategory === 'all'}>Show all</FilterItem>
                            {(state.categories || []).map((category, index) => {
                                return <FilterItem theme={theme} key={index} onClick={(ev => handleSelectCategory(ev, category))} isSelected={state.selectedCategory === category}>{category}</FilterItem>
                            })}
                        </FiltersContainer>
                    </Filters>
                    <ProductsList>
                        {(state.filteredProducts || []).length > 0 ? state.filteredProducts.map((product, index) => {
                            return <ProductItem product={product} key={index} />
                        }) : 'No products found'}
                    </ProductsList>
                </React.Fragment>
            }
        </Container>
    )
}

Shop.propTypes = {

}

export default Shop
