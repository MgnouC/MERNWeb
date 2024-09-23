import React from 'react'
import { Checkbox, Rate} from 'antd';
import { WrapperLableText, WrapperTextContent, WrapperTextValue } from './style'

const NavBarComponent = () => {
    const onChange = () => {}
    const renderContent = (type, options) => {
        switch(type){
            case'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    ) 
                        
                    
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex',flexDirection:'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.lable}</Checkbox>
                            )
                        })}
                        <Checkbox value="B">B</Checkbox>
                    </Checkbox.Group>
            )
            case 'star':
                return options.map((option) => {
                        return (
                            <div style ={{display: 'flex'}}>
                            <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />                            
                            <span style={{paddingLeft: '5px'}}> Từ {option} sao</span>
                            </div>
                        )
                })
            case 'price':
                return options.map((option) => {
                        return (
                            <div style ={{display: 'flex'}}>
                            <span style={{padding: '5px',borderRadius: '10px', backgroundColor: '#efefef', width: 'fit-content'}}> {option} </span>
                            </div>
                        )
                    })           
            
            default:
                return {}
        }
    }

    return (
        <div>
          <WrapperLableText>Label</WrapperLableText>
            <WrapperTextContent>
                {renderContent('text', ['TV', 'Laptop', 'Phone', 'Tablet', 'Headphone'])}
            </WrapperTextContent>
            <WrapperTextContent>
                {renderContent('checkbox', [
                    { value: 'a', lable: 'A' },
                    { value: 'b', lable: 'B' }
                ])}
            </WrapperTextContent>

            <WrapperTextContent>
                {renderContent('star', [3, 4, 5 ])}
            </WrapperTextContent>

            <WrapperTextContent>
                {renderContent('price', ['<50000', '>50000' ])}
            </WrapperTextContent>

        </div>
    )
}

export default NavBarComponent