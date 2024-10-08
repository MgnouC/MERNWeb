import React, { useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo.png'
import { Image } from 'antd'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import * as UserService from  '../../services/UserServices'
import { useMutationHooks } from '../../hooks/useMutationHook'

const SignUpPage = () => {
  const [ isShowPassword,  setIsShowPassword] = useState(false)
  const [ email,  setEmail ] = useState('')
  const [ password,   setPassword ] = useState('')
  const [ confirmPassword,   setConfirmPassword] = useState('')

  const handleSignUp  = () => {
    mutation.mutate ({ email, password, confirmPassword })

  }

  const handleNavigateSignIn =  () => {
    window.location.href = '/sign-in'
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data  } = mutation

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnChangePassword = (value) => {
    setPassword(value);
  }
  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
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
            <p>Tạo liền cái tài khoản còn đi mua sắm thôi</p>

            <InputForm  placeholder = "tentui@gmail.com" value ={email} handleOnChange={(handleOnChangeEmail)} />

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
              <InputForm placeholder = 'passla123nha' type = {isShowPassword ? "text" : "password"}
                 value ={password} handleOnChange={(handleOnChangePassword)} />
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
              <InputForm placeholder = 'bamlannuachochac'type = {isShowPassword ? "text" : "password"}
                value ={confirmPassword} handleOnChange={(handleOnChangeConfirmPassword)}/>
            </div>
            
            {data?.status ===  200 && <p style={{color: 'green'}}>Đăng nhập thành công</p>}
            <ButtonComponent
                onClick = {handleSignUp}
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
                textButton={'Đăng ký ngay'} 
                styleTextButton={{color: '#fff', fontSize: '14px'}}>
            </ButtonComponent>
            <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
            <p>Có tài khoản rồi hả? <WrapperTextLight onClick={handleNavigateSignIn}>Nhập liền đi</WrapperTextLight></p>
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