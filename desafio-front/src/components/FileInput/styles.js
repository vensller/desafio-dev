import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  text-align: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }

    p {
      padding: 10px;
      background: #eee;
      font-size: 16px;
    }
  }
`;
