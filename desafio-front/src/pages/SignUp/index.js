import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import { InputRow, InputGroup } from '../../global/styles';

import { signUpRequest } from '../../store/modules/auth/actions';


export default function SignUp() {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signUpRequest(user, name, password));
  }

  return (
    <Container>
      <form>
        <InputRow>
          <InputGroup>
            <strong>NAME</strong>
            <input 
              name="name" 
              type="text" 
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </InputRow>
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
          Sign UP
        </button>
        <Link to="/">Back to login</Link>
      </form>
    </Container>
  );
}
