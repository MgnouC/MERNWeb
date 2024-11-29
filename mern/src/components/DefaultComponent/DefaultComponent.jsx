import React, { Children } from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponet'
const DefaultComponent = ({children}) => {
  return (
    <div>
      <HeaderComponent/>
      {children}
      <FooterComponent />
    </div>
  )
}

export default DefaultComponent
