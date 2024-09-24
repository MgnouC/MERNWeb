import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct =styled.div`
    backgroundColor : "ffffff";
    padding:  0px 120px;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #efefef;    
        backgournd: rgb(13, 92, 182);
        span {
            color: #fffff;
        }
    }
    width: 100%;

`
export const WrapperProducts = styled.div`
    margin-top: 30px;
    display : flex; 
    align-item:  center; 
    justify-content: space-between; 
    gap: 20px;
    flex-wrap:  wrap;   
`