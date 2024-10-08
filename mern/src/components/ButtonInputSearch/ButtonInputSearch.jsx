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
        variant, 
        backgroundColorInput ='#ededed',
        backgroundColorButton ='#ededed',
        colorButton ='#EC8313'
    } = props
    return (
        <div style={{display :'flex', background : '#EC8313'}}>
            <InputComponent
                size = {size} 
                placeholder={placeholder}
                variant={variant}
                style={{backgroundColor: backgroundColorInput}}
                />
            <ButtonComponent
                size = {size} 
                styleButton={{background: backgroundColorButton, border: !variant &&'none' ,borderRadius: '0px'}} 
                icon = {<SearchOutlined color={colorButton} style={{color: '#EC8313'}}/>}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
                />
        </div>
    )
}

export default ButtonInputSearch