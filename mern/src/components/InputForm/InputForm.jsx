import React, { useState } from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const {placeholder = 'Nhập chữ vào', ...rests} = props
    const handleOnChangeInput = (e) =>  {
        props.handleOnChange(e.target.value)
        // onChange && onChange(e.target.value)
        // console.log('value',  e.target.value)
    }

    return (
        <>
            <WrapperInputStyle placeholder = {placeholder} valueInput = {props.value}  {...rests} onChange={handleOnChangeInput}/> 

        </>
    )
}

export default InputForm