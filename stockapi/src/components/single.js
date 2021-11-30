import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadSingle } from '../actions';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Chart from './chart';
import Tablestock from './tablestock';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 380,
    maxWidth: 500,
    margin: '0px 5px 0px 0px',
    [theme.breakpoints.down('md')]: {
      margin: '5px auto',
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  card: {
    flexGrow: 1,
    maxWidth: 1400,
    margin: '0px auto',
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  industry: {
    textIndent: '25px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    marginBottom: '15px',
  },
  div: {
    display: 'flex',
    maxWidth: 1400,
    margin: '5px auto',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  price: {
    margin: '10px',
    textAlign: 'right',
    alignItems: 'end',
  },
  iconS: {
    color: 'green',
    position: 'relative',
    top: '5px',
    left: '10px',
  },
  iconD: {
    position: 'relative',
    top: '5px',
    left: '10px',
  },
  loader: {
    display: 'flex',
    height: '50vh',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
}));

const Single = ({ stocks, isLoading, single, err, dispatch }) => {
  const classes = useStyles();
  const { id } = useParams();
  useEffect(() => {
    dispatch(loadSingle(id, 0));
  }, [dispatch, id]);
  const pe = () => {
    if (single.stockdata.period.length > 0) {
      let peRatio = single.price / single.stockdata.income['EPS'][single.stockdata.income['EPS'].length - 1];
      return peRatio.toFixed(1);
    }
  };

  const dataChart = () => {
    let data = [];
    if (single.stockdata.period.length > 0) {
      single.stockdata.period.forEach((a, b) => {
        const x = {
          period: (a / 100).toString().replace('.', '-'),
          income: single.stockdata.income['Revenue'][b],
          profit: single.stockdata.income['Net Income'][b],
        };
        data.push(x);
      });
      return data;
    }
  };

  if (err) {
    return (
      <div className={classes.loader}>
        <div className={classes.loader}>Stock does not exist</div>
      </div>
    );
  }
  if ((Object.keys(single).length === 0) | isLoading) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  } else if (!single.stockdata.hasOwnProperty('balance')) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className={classes.div}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h6" className={classes.title} color="textSecondary" gutterBottom>
              {single.stock}: {single.name}
            </Typography>
            <Typography variant="body2" noWrap className={classes.industry}>
              location: {single.location}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {single.sector}:
            </Typography>
            <Typography variant="body2" noWrap className={classes.industry}>
              {single.industry}
            </Typography>
            <Typography variant="h4" className={classes.price}>
              <span> ${single.price}</span>
              {(pe() > 60) | (pe() < 0) ? (
                <WarningIcon fontSize="large" className={classes.iconD} color="secondary" />
              ) : (
                <CheckCircleIcon fontSize="large" className={classes.iconS} />
              )}
            </Typography>
            <Typography variant="h6" className={classes.price} color="textSecondary">
              PE ratio: {pe()}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <Chart data={dataChart()} />
        </Card>
      </div>
      <Card className={classes.card}>
        <Tablestock stockdata={single.stockdata} />
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return { single: state.single, isLoading: state.isLoading, err: state.err };
};

export default connect(mapStateToProps)(Single);
