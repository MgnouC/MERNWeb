import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'
import imageLogo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as UserService from  '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHook'


const SignInPage = () => {
  const [isShowPassword,  setIsShowPassword] = useState(false)
  const [ email,  setEmail ] = useState('')
  const [ password,   setPassword ] = useState('')
  //const mutationKey = ['posts']
  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const {data,  error, isLoading, mutate} = mutation

  console.log('mutation',mutation)

  const handleSignIn  = () => {
    mutation.mutate ({ email, password })
    console.log('sign-in', email, password)
  }
  const handleNavigateLogin = () => {
    navigate('/sign-up');  
  }
  const handleOnChangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnChangePassword = (value) => {
    setPassword(value);
  }

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
            <p>Đăng nhập hoặc Tạo tài khoản</p>
            <InputForm style ={{ marginBottom : '10px'}} placeholder = "tentui@gmail.com" handleOnChange={(handleOnChangeEmail)}/>
            <div style={{position: 'relative'}}>
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
                cursor: 'pointer'
              }}
                >{
                  isShowPassword ? (
                  <span class="show-pass">Hiện</span>
                ) :  (
                  <span class="show-pass">Ẩn</span>
                )
              }
              </span>
              <InputForm placeholder = 'passla123nha' type = {isShowPassword ? "text" : "password"} handleOnChange={(handleOnChangePassword)}/>

            </div>
            {data?.status ===  200 && <p style={{color: 'green'}}>Đăng nhập thành công</p>}
            <ButtonComponent
                disable = {!email.length || !password.length  }
                onClick={handleSignIn}
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
            <p>Chưa có tài khoản? <WrapperTextLight   onClick = {handleNavigateLogin} >Tạo tài khoản</WrapperTextLight></p>
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

export default SignInPage