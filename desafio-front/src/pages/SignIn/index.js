import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
            <strong>USER</strong>
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
            <strong>PASSWORD</strong>
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
          {loading ? 'Loading...' : 'Login'}
        </button>
        <Link to="/sign">Create account</Link>
      </form>
    </Container>
  );
}
