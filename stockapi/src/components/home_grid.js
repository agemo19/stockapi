import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticle } from '../actions';
import { Article } from './article';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MostWorst from './mostWorst';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      margin: '20px 20px',
      [theme.breakpoints.down('xs')]: {
        margin: '0px 0px',
      },
    },
    gridContainer: {
      margin: '0px auto',
      maxWidth: 1200,
      [theme.breakpoints.down('xs')]: {
        margin: '0px 0px',
      },
      justifyContent: 'center',
    },
    gridItem: {
      flexBasis: '600px',
      marginBottom: '5px',
      padding: '2px',
      [theme.breakpoints.down('xs')]: {
        padding: '0px',
      },
    },
    card: {
      flexGrow: 1,
      maxWidth: 1196,
      margin: '0px auto',
    },
  };
});

const Home = ({ stocks, isLoading, articles, dispatch }) => {
  // console.log(stocks);
  const classes = useStyles();
  useEffect(() => {
    if (articles.length === 0) {
      dispatch(loadArticle());
    }
  }, [dispatch, articles]);

  const mostWorst = () => {
    // console.log(stocks);
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
    const peList = [...sorted.slice(0, 5), ...sorted.slice(5, 10)];
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
        <h6>kraunasi</h6>
      ) : (
        <Grid container className={classes.gridContainer}>
          {articles.map((article) => {
            return (
              <Grid key={article.id} item xs={12} sm={6} className={classes.gridItem}>
                <Article article={article} />
              </Grid>
            );
          })}
        </Grid>
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

/* <Link to={`/single/${stock.id}`}>{stock.stock}</Link> */
