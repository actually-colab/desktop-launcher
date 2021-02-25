import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

import './App.global.less';
import store from './redux';
import { KernelPage } from './pages';

/**
 * The entry point for the Client renderer process
 */
const EntryPoint: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={KernelPage} />
    </Switch>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 0, // Allow it to be smaller than the content
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function App() {
  return (
    <div className={css(styles.container)}>
      <Provider store={store}>
        <Router>
          <EntryPoint />
        </Router>
      </Provider>
    </div>
  );
}
