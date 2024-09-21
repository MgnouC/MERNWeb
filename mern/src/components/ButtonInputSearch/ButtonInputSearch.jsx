import React from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtonInputSearch = (props) => {
    const {
        size, 
        placeholder, 
        textButton, 
        bordered, 
        backgroundColorInput ='#ededed',
        backgroundColorButton ='rgb(12, 103, 255)',
        colorButton ='#ededed'
    } = props
    return (
        <div style={{display :'flex', background : '#ededed'}}>
            <InputComponent
                size = {size} 
                placeholder={placeholder}
                bordered={bordered}
                style={{backgroundColor: backgroundColorInput}}
                />
            <ButtonComponent
                size = {size} 
                styleButton={{background: backgroundColorButton, border: !bordered &&'none' }} 
                icon = {<SearchOutlined color={colorButton} style={{color: '#ededed'}}/>}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
                />
        </div>
    )
}

export default ButtonInputSearch