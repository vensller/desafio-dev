import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';
import { InputRow, InputGroup } from '../../global/styles';

import { signInRequest } from '../../store/modules/auth/actions';


export default function SignIn() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(user, password));
  }

  return (
    <Container>
      <form>
        <InputRow>
          <InputGroup>
            <strong>SEU USUÁRIO</strong>
            <input
              id="signin"
              name="user"
              type="text"
              placeholder="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </InputGroup>
        </InputRow>
        <InputRow>
          <InputGroup>
            <strong>SUA SENHA</strong>
            <input 
              name="password" 
              type="password" 
              placeholder="*********" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </InputRow>

        <button type="button" onClick={handleSubmit}>
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </form>
    </Container>
  );
}
