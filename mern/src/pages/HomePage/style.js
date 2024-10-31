import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  backgroundcolor: "ffffff";
  padding: 0px 120px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;
export const WrapperButtonMore = styled(ButtonComponent)`
  border-radius: 0px 20px 20px 0px;
  &:hover {
    color: #fff;
    background-color: rgb(250, 79, 49);
    span {
      color: #fff;
    }
  }
  width: 100%;
`;
export const WrapperProducts = styled.div`
  margin-top: 30px;
  display: flex;
  align-item: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;
