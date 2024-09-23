import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import Item from 'antd/es/list/Item'
import { WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import  Slide1  from '../../assets/images/Slide1.webp'
import  Slide2  from '../../assets/images/Slide2.webp'
import  Slide3  from '../../assets/images/Slide3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'

const HomePage = () => {
  const arr = ['TV',  'Laptop', 'Phone', 'Tablet', 'Headphone']
  return (
    <>
    <div  style ={{ padding:  '0px 120px' }}>
      <WrapperTypeProduct style  = {{ backgroundColor : "ffffff"}}>
        {arr.map((Item) => {
          return (
            <TypeProduct name = {Item} key={Item}/>
            )
        })}
      </WrapperTypeProduct>
      <div id = "container" style  = {{ backgroundColor : "efefef", padding:  '0px 120px', height: 'auto'}}>
        <SliderComponent arrImages ={[Slide1,Slide2,Slide3]}/>
        <div>
          <CardComponent style =  {{ margin: '20px 0px', display : 'flex', alignItem:  'center', justifyContent: 'space-between', gap: '20px'}}/>
        </div>
      </div>
    </div>

    </>
  )
}

export default HomePage
