import React, { useContext, useEffect, useState } from 'react'
import { useMergeState } from 'react-hooks-lib'
import PropTypes from 'prop-types'
import Container from '../components/Container'
import ProductItem from '../components/ProductItem'
import styled from 'styled-components'
import Loader from '../components/Loader'
import CommonContext from '../utils/context'
import CustomBreadcrumb, { BreadcrumbItem } from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'

const PageTitle = styled.h1`
    color: ${props => props.theme.black};
`
const PageDescription = styled.p`
    margin-bottom: ${props => props.theme.spacing(3)};
`
const Filters = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: ${props => props.theme.spacing(3)};
`
const FilterItem = styled.button`
    background: ${props => props.isSelected ? props.theme.primary : props.theme.white};
    padding: 8px 16px;
    border: 1px solid ${props => props.isSelected ? props.theme.primary : props.theme.black};
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    color: ${props => props.isSelected ? props.theme.white : props.theme.black};
    margin: ${props => props.theme.spacing(1)};
    transition: all .1s ease;
    font-size: 12px;
	text-transform: uppercase;
	font-weight: 500;

    &:hover {
        border: 1px solid ${props => props.theme.primary};
        color: ${props => props.isSelected ? props.theme.white : props.theme.primary};
    }

    @media(min-width: ${props => props.theme.mdQuery}) {
        margin: 0;
		margin-right: ${props => props.theme.spacing(1)};
	}
`
const ProductsList = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 16px;
    padding: ${props => props.theme.spacing(3)} 0;
    @media(min-width: ${props => props.theme.smQuery}) {
		grid-template-columns: repeat(2, 1fr);
	}
    @media(min-width: ${props => props.theme.mdQuery}) {
		grid-template-columns: repeat(4, 1fr);
	}
`
const Divider = styled.div`
	height: 2px;
	width: 20px;
	margin-bottom: ${props => props.theme.spacing(3)};
	background-color: ${props => props.theme.secondary}
`
const LoaderContainer = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const TotalItems = styled.p`
    font-weight: 600;
    span {
        color: ${props => props.theme.primary}
    }
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

    if (state.error) {
        return <Container><ErrorMessage error={state.error} /></Container>
    }

    return (
        <Container withBg={true}>
            <CustomBreadcrumb>
                <BreadcrumbItem componentClass={Link} theme={theme} to="/">Home</BreadcrumbItem>
                <BreadcrumbItem active theme={theme}>Shop</BreadcrumbItem>
            </CustomBreadcrumb>
            <section>
                <PageTitle theme={theme}>All products</PageTitle>
                <Divider theme={theme} />
                <PageDescription theme={theme}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed ad ex quibusdam laboriosam inventore incidunt necessitatibus aspernatur quidem tempore ullam earum commodi repudiandae rerum, dolorum provident, tempora vitae magnam error!</PageDescription>
            </section>
            {state.isLoading ? <LoaderContainer><Loader /></LoaderContainer> :
                <React.Fragment>
                    <Filters theme={theme}>
                        <div>
                            <FilterItem theme={theme} onClick={(ev => handleSelectCategory(ev, 'all'))} isSelected={state.selectedCategory === 'all'}>Show all</FilterItem>
                            {(state.categories || []).map((category, index) => {
                                return <FilterItem theme={theme} key={index} onClick={(ev => handleSelectCategory(ev, category))} isSelected={state.selectedCategory === category}>{category}</FilterItem>
                            })}
                        </div>
                    </Filters>
                    <TotalItems theme={theme}><span>{state.filteredProducts.length}</span> Products found</TotalItems>
                    <ProductsList theme={theme}>
                        {(state.filteredProducts || []).length > 0 ? state.filteredProducts.map((product, index) => {
                            return <ProductItem product={product} key={index} />
                        }) : 'No products found'}
                    </ProductsList>
                </React.Fragment>
            }
        </Container>
    )
}

Shop.propTypes = {}

export default Shop
