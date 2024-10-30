import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SearchOutlined } from "@ant-design/icons";
import { searchProduct } from "../../redux/slides/productSlice";



const ButtonInputSearch = (props) => {
    const {
      size,
      placeholder,
      textButton,
      variant,
      backgroundColorInput = '#ededed',
      backgroundColorButton = '#ededed',
      colorButton = '#EC8313',
      onChange, // Nhận hàm onChange từ props
      onClick,  // Nhận hàm onClick từ props
    } = props;
  
    return (
      <div style={{ display: 'flex', background: '#EC8313', padding: '10px', borderRadius: '10px', width: '100%' }}>
        <InputComponent
          size={size}
          placeholder={placeholder}
          variant={variant}
          style={{ backgroundColor: backgroundColorInput, border: !variant && 'none' }}
          onChange={onChange} // Gắn sự kiện onChange cho InputComponent
        />
        <ButtonComponent
          size={size}
          styleButton={{ background: backgroundColorButton, border: !variant && 'none', borderRadius: '0px' }}
          icon={<SearchOutlined style={{ color: '#EC8313' }} />}
          textButton={textButton}
          styleTextButton={{ color: colorButton }}
          onClick={onClick} // Gắn sự kiện onClick cho ButtonComponent
        />
      </div>
    );
  };
  

export default ButtonInputSearch;
