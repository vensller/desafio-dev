import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

// Query pages
import OperationsList from '../pages/OperationsList';

// Register pages
import OperationsRegister from '../pages/OperationsRegister';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/operations" exact component={OperationsList} isPrivate />
      <Route
        path="/operations/register"
        component={OperationsRegister}
        isPrivate
      />

    </Switch>
  );
}