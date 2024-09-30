import React, { useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo.png'
import { Image } from 'antd'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'

const SignUpPage = () => {
  const [isShowPassword,  setIsShowPassword] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#efefef', height: '100vh'}}>
      <div>
        <div style={{
          fontFamily: 'san-serif',
          display: 'flex',
          width: '500x', height: '415px',
          background:  'white',
          borderRadius: '20px',
        }}>
          <WrapperContainerLeft>
            <h1>Xin chào,</h1>
            <p>Tạo liền cái tài khoản còn đi mua sắm thôi</p>

            <InputForm  placeholder = "tentui@gmail.com" />
            <div style={{position: 'relative'}}>
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
              }}
                >{
                  isShowPassword ? (
                  <span class="show-pass">Hiện</span>
                ) :  (
                  <span class="show-pass">Ẩn</span>
                )
              }
              </span>
              <InputForm placeholder = 'passla123nha' type = {isShowPassword ? "text" : "password"} />
            </div>
            <div style={{position: 'relative'}}>
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
              }}
                >{
                  isShowPassword ? (
                    <span class="show-pass">Hiện</span>
                ) :  (
                    <span class="show-pass">Ẩn</span>
                )
              }
              </span>
              <InputForm placeholder = 'bamlannuachochac'type = {isShowPassword ? "text" : "password"}/>
            </div>
            
            <ButtonComponent
                border= {false}
                size = {40} 
                styleButton={{
                    padding  : '0 20px',
                    background: '#ee4d2d',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius:  '2px',
                    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, .09)',
                    margin: '26px 0px 10px'
                  }} 
                textButton={'Đăng nhập'} 
                styleTextButton={{color: '#fff', fontSize: '14px'}}>
            </ButtonComponent>
            <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
            <p>Có tài khoản rồi hả? <WrapperTextLight>Nhập liền đi</WrapperTextLight></p>
            </WrapperContainerLeft>
          <WrapperContainerRight>
                <Image src = {imageLogo} preview = {false} alt = "image-logo" height='203px' weight = '203px'/>
                <h4>Mua tùm lum thứ tại SELLSOME</h4>
          </WrapperContainerRight>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage