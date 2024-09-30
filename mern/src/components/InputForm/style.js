import { Input } from "antd";
import styled from "styled-components";

export const WrapperInputStyle = styled(Input)`
    border-top:none;
    border-right:none;
    border-left:none;
    outline: none;
    &:focus{
        background:rgb(255, 238, 231);
    }
    

`