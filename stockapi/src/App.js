import React, { useEffect } from 'react';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Single from './components/single';
import Compare from './components/compare';
import { loadData } from './actions';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { Provider } from 'react-redux';

const initialState = {
  stocks: [],
  single: {},
  compare: {},
  articles: [],
  indicatorlist: [],
  indicatorlistSelected: [],
  // indicatorlistSelected: ['Revenue', 'EBIT'],
  isLoading: true,
  err: null,
};
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  useEffect(() => {
    store.dispatch(loadData());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/compare" component={Compare} />
            <Route path="/single/:id" component={Single} />
          </Switch>
          <Footer />
        </React.StrictMode>
      </Router>
    </Provider>
  );
}

export default App;
