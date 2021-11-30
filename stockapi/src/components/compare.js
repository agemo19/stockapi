import React from 'react';
import { connect } from 'react-redux';
// import { loadSingle } from '../actions';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WarningIcon from '@material-ui/icons/Warning';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StarIcon from '@material-ui/icons/Star';
import ChartLine from './chartline';
import Filter from './filter';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 380,
    maxWidth: 1000,
    margin: '15px auto',
    [theme.breakpoints.down('sm')]: {
      margin: '15px 5px',
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      margin: '3px 0px 5px 0px',
    },
  },
  gridTop: {
    backgroundColor: '#e7e7e7',
    textAlign: 'center',
    marginBottom: 0,
  },
  typographyTop: {},
  typographyMidTop: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: '10px',
    marginTop: '10px',
  },
  typographyMidMid: {
    marginLeft: '5%',
    position: 'relative',
  },
  iconS: {
    color: 'green',
    position: 'absolute',
    top: '5px',
    left: '60%',
  },
  iconD: {
    position: 'absolute',
    top: '5px',
    left: '60%',
  },
  span: {
    position: 'absolute',
    right: '40%',
  },

  starIcon: {
    color: 'yellow',
    position: 'absolute',
    bottom: '0px',
    left: '4%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  gridBottom: {
    textAlign: 'center',
  },
  selection: {
    textAlign: 'center',
  },
  loader: {
    display: 'flex',
    height: '50vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Compare({ isLoading, single, indicatorlistSelected, compare }) {
  const classes = useStyles();

  const change = (indicator = 'Revenue', stock) => {
    let x;
    if (stock === 1) {
      x = (
        ((single.stockdata.income[indicator][single.stockdata.income[indicator].length - 1] -
          single.stockdata.income[indicator][single.stockdata.income[indicator].length - 5]) /
          single.stockdata.income[indicator][single.stockdata.income[indicator].length - 5]) *
        100
      ).toFixed(1);
    } else {
      x = (
        ((compare.stockdata.income[indicator][compare.stockdata.income[indicator].length - 1] -
          compare.stockdata.income[indicator][compare.stockdata.income[indicator].length - 5]) /
          compare.stockdata.income[indicator][compare.stockdata.income[indicator].length - 5]) *
        100
      ).toFixed(1);
    }
    return parseFloat(x);
  };

  const star = (indicator) => {
    let stockStar;
    let stock1 = change(indicator, 1);
    let stock2 = change(indicator, 2);
    if (stock1 > stock2) {
      stockStar = 1;
    } else {
      stockStar = 0;
    }
    return stockStar;
  };

  if ((Object.keys(single).length > 0) & (Object.keys(compare).length > 0)) {
    (() => {
      single.stockdata.income = { ...single.stockdata.income, ...single.stockdata.balance };
      delete single.stockdata.balance;
      compare.stockdata.income = { ...compare.stockdata.income, ...compare.stockdata.balance };
      delete compare.stockdata.balance;
    })();
  }

  const dataChart = (indicator) => {
    let name1 = single.stock;
    let period1 = single.stockdata.period;
    let data1 = single.stockdata.income[indicator];
    let name2 = compare.stock;
    let period2 = compare.stockdata.period;
    let data2 = compare.stockdata.income[indicator];
    let list = [];
    if (period1[period1.length - 1] >= period2[period2.length - 1]) {
      list = period1.map((i1, index1) => {
        let index2 = period2.findIndex((i2) => i2 === i1);
        return {
          period: (i1 / 100).toString().replace('.', '-'),
          [`${name1}`]: data1[index1],
          [`${name2}`]: index2 >= 0 ? data2[index2] : 0,
        };
      });
    } else {
      list = period2.map((i1, index1) => {
        let index2 = period1.findIndex((i2) => i2 === i1);
        return {
          period: (i1 / 100).toString().replace('.', '-'),
          [`${name2}`]: data2[index1],
          [`${name1}`]: index2 >= 0 ? data1[index2] : 0,
        };
      });
    }
    list.map((i, index) => {
      if (i[`${name1}`] === 0) {
        delete list[index][`${name1}`];
      }
      if (i[`${name2}`] === 0) {
        delete list[index][`${name2}`];
      }
      return i;
    });
    return [list, name1, name2];
  };

  if ((Object.keys(single).length === 0) | (Object.keys(compare).length === 0) | isLoading)
    return (
      <div className={classes.selection}>
        {Object.keys(single).length + Object.keys(compare).length === 0 ? (
          <Typography variant="h5">Please choose two stocks</Typography>
        ) : (Object.keys(single).length === 0) | (Object.keys(compare).length === 0) ? (
          <Typography variant="h5">Please choose one more stock</Typography>
        ) : (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
        <Filter />
      </div>
    );

  return (
    <>
      <Filter />
      {indicatorlistSelected.map((indicator, index) => {
        return (
          <Card key={index} className={classes.card}>
            <Grid container spacing={0} className={classes.grid}>
              <Grid item xs={12} className={classes.gridTop}>
                <Typography className={classes.typographyTop} color="textSecondary">
                  {indicator}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper square elevation={1} className={classes.paper}>
                  <Typography noWrap variant="h5" className={classes.typographyMidTop}>
                    {star(indicator) === 1 && <StarIcon className={classes.starIcon} fontSize="large" />}
                    {single.name}
                  </Typography>
                  <Typography noWrap variant="body2" className={classes.typographyMidMid} color="textSecondary">
                    last period:
                    <span className={classes.span}>
                      {(single.stockdata.period[single.stockdata.period.length - 1] / 100).toString().replace('.', '-')}
                    </span>
                  </Typography>
                  <Typography noWrap variant="h6" className={classes.typographyMidMid} color="textSecondary">
                    last quarter:
                    <span className={classes.span}>
                      {single.stockdata.income[`${indicator}`][single.stockdata.income[`${indicator}`].length - 1]} $
                    </span>
                  </Typography>
                  <Typography noWrap variant="h6" className={classes.typographyMidMid} color="textSecondary">
                    from last year:
                    <span className={classes.span}>{change(indicator, 1)}%</span>
                    {change(indicator, 1) < 0 ? (
                      <WarningIcon className={classes.iconD} color="secondary" />
                    ) : (
                      <TrendingUpIcon className={classes.iconS} />
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper square elevation={1} className={classes.paper}>
                  <Typography noWrap variant="h5" className={classes.typographyMidTop}>
                    {star(indicator) === 0 && <StarIcon className={classes.starIcon} fontSize="large" />}
                    {compare.name}
                  </Typography>
                  <Typography noWrap variant="body2" className={classes.typographyMidMid} color="textSecondary">
                    last period:
                    <span className={classes.span}>
                      {(compare.stockdata.period[compare.stockdata.period.length - 1] / 100)
                        .toString()
                        .replace('.', '-')}
                    </span>
                  </Typography>
                  <Typography noWrap variant="h6" className={classes.typographyMidMid} color="textSecondary">
                    last quarter:
                    <span className={classes.span}>
                      {compare.stockdata.income[`${indicator}`][compare.stockdata.income[`${indicator}`].length - 1]} $
                    </span>
                  </Typography>
                  <Typography noWrap variant="h6" className={classes.typographyMidMid} color="textSecondary">
                    from last year:
                    <span className={classes.span}>{change(indicator, 2)}%</span>
                    {change(indicator, 2) < 0 ? (
                      <WarningIcon className={classes.iconD} color="secondary" />
                    ) : (
                      <TrendingUpIcon className={classes.iconS} />
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} className={classes.gridBottom}>
                <ChartLine dataChart={dataChart(indicator)} />
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    single: state.single,
    compare: state.compare,
    indicatorlistSelected: state.indicatorlistSelected,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(Compare);
