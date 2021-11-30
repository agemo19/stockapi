import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { Article } from './article';
import { makeStyles } from '@material-ui/core/styles';
import MostWorst from './mostWorst';
import Card from '@material-ui/core/Card';
import Masonry from 'react-masonry-css';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      textAlign: 'center',
      margin: '20px 20px',
      [theme.breakpoints.down('xs')]: {
        margin: '5px 0px',
      },
    },
    gridContainer: {
      display: 'flex',
      margin: '0px auto',
      // maxWidth: 1300,
      [theme.breakpoints.down('xs')]: {
        margin: '0px 0px',
      },
      maxWidth: 1200,
      justifyContent: 'center',
    },
    gridItem: {
      flexBasis: '600px',
      padding: '2px',
      [theme.breakpoints.down('xs')]: {
        marginBottom: '5px',
        padding: '0px',
      },
    },
    card: {
      flexGrow: 1,
      maxWidth: 1196,
      margin: '5px auto',
      [theme.breakpoints.down('xs')]: {
        borderRadius: 0,
      },
    },
    loader: {
      display: 'flex',
      height: '50vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const Home = ({ stocks, isLoading, articles, dispatch }) => {
  const classes = useStyles();
  useEffect(() => {
    if (articles.length === 0) {
      dispatch(loadArticle());
    }
  }, [dispatch, articles]);

  const breakpoints = {
    default: 2,
    660: 1,
  };

  const mostWorst = () => {
    const pe = stocks.map((stock) => {
      return {
        id: stock.id,
        stock: stock.stock,
        name: stock.name,
        sector: stock.sector,
        pe: parseFloat((parseFloat(stock.price) / parseFloat(stock.earning)).toFixed(1)),
        change: parseFloat(stock.change),
        price: parseFloat(stock.price),
      };
    });
    let sorted = pe.sort((a, b) => (a.pe > b.pe ? 1 : b.pe > a.pe ? -1 : 0));
    let positiveSorted = sorted.filter((a) => (a.pe > 0) & (a.pe < 100000));
    const peList = [...positiveSorted.slice(0, 5), ...positiveSorted.slice(-5)];
    sorted = pe.sort((a, b) => (a.change > b.change ? 1 : b.change > a.change ? -1 : 0));
    const changeList = [...sorted.slice(0, 5), ...sorted.slice(-5)];
    return [peList, changeList];
  };

  if (stocks.length !== 0) {
    mostWorst();
  }
  return (
    <div className={classes.root}>
      {isLoading & (stocks.length !== 0) ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpoints}
          className={classes.gridContainer}
          columnClassName="my-masonry-grid_column"
        >
          {articles.map((article) => {
            return (
              <div key={article.id} className={classes.gridItem}>
                <Article article={article} />
              </div>
            );
          })}
        </Masonry>
      )}
      <div>
        <Card className={classes.card}>
          <MostWorst dataMost={mostWorst()} />
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { stocks: state.stocks, isLoading: state.isLoading, articles: state.articles };
};
export default connect(mapStateToProps)(Home);
