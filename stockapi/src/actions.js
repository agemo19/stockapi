import axios from 'axios';

export const loadData = () => (dispatch, getState) => {
  if (!getState().isLoading) {
    dispatch({ type: 'DATA_LOADING' });
  }
  axios
    // .get('/api/stocks/')
    .get('http://127.0.0.1:8000/api/stocks/')
    .then((res) => {
      dispatch({
        type: 'DATA_LOADED',
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'DATA_ERROR',
        payload: err,
      });
    });
};

export const loadSingle = (x, loadType) => (dispatch, getState) => {
  if (!getState().isLoading) {
    dispatch({ type: 'DATA_LOADING' });
  }
  axios
    // .get(`/api/stock/${x}/`)
    .get(`http://127.0.0.1:8000/api/stock/${x}/`)
    .then((res) => {
      dispatch({
        type: 'SINGLE_LOADED',
        payload: res.data,
        loadType,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'SINGLE_ERROR',
        payload: err,
      });
    });
};

export const loadArticle = () => (dispatch, getState) => {
  if (!getState().isLoading) {
    dispatch({ type: 'DATA_LOADING' });
  }
  axios
    // .get('/api/articles/')
    .get('http://127.0.0.1:8000/api/articles/')
    .then((res) => {
      dispatch({
        type: 'ARTICLE_LOADED',
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: 'ARTICLE_ERROR',
        payload: err,
      });
    });
};
