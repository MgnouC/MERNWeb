import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import Item from 'antd/es/list/Item'
import { WrapperTypeProduct } from './style'

const HomePage = () => {
  const arr = ['TV',  'Laptop', 'Phone', 'Tablet', 'Headphone']

  return (
    <WrapperTypeProduct style={{ padding:  ' 0px 120px' }}>
      {arr.map((Item) => {
        return (
          <TypeProduct name = {Item} key={Item}/>
          )
      })}
      Home
    </WrapperTypeProduct>
  )
}

export default HomePage
