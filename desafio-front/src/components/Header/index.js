import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Content, StyledLink } from './styles';

import { signOut } from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content history={history.location.pathname}>
        <nav>
          <StyledLink history={history.location.pathname} to="/operations">
            OPERATIONS
          </StyledLink>          
        </nav>

        <aside>
          <strong>{user && user.name}</strong>
          <button type="button" onClick={() => dispatch(signOut())}>
            Exit
          </button>
        </aside>
      </Content>
    </Container>
  );
}
