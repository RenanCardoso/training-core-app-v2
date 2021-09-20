import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #eeeeee;
  elevation: 3;
  flex-direction: row;
  border-radius: 3px;
  margin: 10px;
  padding: 10px;
`;

export const TreinoImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  align-self: center;
`;

export const InfoContainer = styled.View`
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 65px;
`;

export const TreinoName = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;
