import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
// import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#e7e7e7',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  table: {
    minWidth: 360,
  },
  tabPanel: {
    padding: 0,
  },
  tableContainer: {
    borderRadius: '0px 0px 3px 3px',
  },
  TableCellMD: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  TableCellXS: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  TableHead: {
    borderBottom: '2px solid #adafba',
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Tablestock = ({ stockdata }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const format = () => {
    const { period } = stockdata;
    const x = [0];
    for (let i = 1; i < period.length; i++) {
      if (Math.round(period[i - 1] / 100) !== Math.round(period[i] / 100)) {
        x.push(i);
      }
    }
    x.push(period.length);
    return x;
  };

  const periodLast = () => {
    const { period } = stockdata;
    const x = format();
    const newPeriod = [];
    for (let i = 1; i < x.length; i++) {
      newPeriod.push(period.slice(x[i - 1], x[i]));
    }
    return newPeriod;
  };

  const incomeYear = () => {
    const { income } = stockdata;
    const x = format();

    const newIncome = {};
    Object.keys(income).map((item) => {
      newIncome[item] = [];
      for (let i = 1; i < x.length; i++) {
        let suma = 0;
        for (let y = x[i - 1]; y < x[i]; y++) {
          suma = suma + income[item][y];
        }
        newIncome[item].push(suma.toFixed(2));
      }
      return item;
    });

    const ordered = [
      'Revenue',
      'Goods Cost',
      'Gross Profit',
      'Operating Inc',
      'Interests Inc',
      'Tax',
      'Tax Rate',
      'Net Income',
      'EBIT',
      'EBITDA',
      'EPS',
      'Shares',
    ].reduce((obj, key) => {
      obj[key] = newIncome[key];
      return obj;
    }, {});

    return ordered;
  };

  const newPeriod = () => {
    const newPeriodBalance = [];
    const { period } = stockdata;
    const formatBalance = format();
    formatBalance.shift();
    formatBalance.map((last) => {
      newPeriodBalance.push(period[last - 1]);
      return last;
    });
    return newPeriodBalance;
  };

  const balanceYear = () => {
    const { balance } = stockdata;
    const formatBalance = format();
    formatBalance.shift();

    const newBalance = {};
    Object.keys(balance).map((item) => {
      newBalance[item] = [];
      formatBalance.map((index) => {
        newBalance[item].push(balance[item][index - 1]);
        return index;
      });
      return item;
    });

    const ordered = [
      'Cash',
      'Receivables',
      'Property Plant',
      'Goodwill',
      'Inventories',
      'Total Assets',
      'Current Expense',
      'Long-Term Debt',
      'Liabilities',
      'Stock',
      'Earnings',
      'Total Equity',
    ].reduce((obj, key) => {
      obj[key] = newBalance[key];
      return obj;
    }, {});
    return ordered;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={1} className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} indicatorColor={'primary'}>
          <Tab label="Income" />
          <Tab label="Balance" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead className={classes.TableHead}>
              <TableRow>
                <TableCell>Period</TableCell>
                {periodLast().map((item, index, array) => {
                  if (array.length - index < 4) {
                    return (
                      <TableCell key={index} align="right">
                        {(item[item.length - 1] / 100).toString().replace('.', '-')}
                      </TableCell>
                    );
                  } else if (array.length - index < 7) {
                    return (
                      <TableCell key={index} align="right" className={classes.TableCellXS}>
                        {(item[item.length - 1] / 100).toString().replace('.', '-')}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={index} align="right" className={classes.TableCellMD}>
                        {(item[item.length - 1] / 100).toString().replace('.', '-')}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(incomeYear()).map(([key, value], index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">{key}</TableCell>
                    {value.map((data, index, array) => {
                      if (array.length - index < 4) {
                        return (
                          <TableCell key={index} align="right">
                            {data}
                          </TableCell>
                        );
                      } else if (array.length - index < 7) {
                        return (
                          <TableCell key={index} align="right" className={classes.TableCellXS}>
                            {data}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={index} align="right" className={classes.TableCellMD}>
                            {data}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead className={classes.TableHead}>
              <TableRow>
                <TableCell>Period</TableCell>
                {newPeriod().map((item, index, array) => {
                  if (array.length - index < 4) {
                    return (
                      <TableCell key={index} align="right">
                        {(item / 100).toString().replace('.', '-')}
                      </TableCell>
                    );
                  } else if (array.length - index < 7) {
                    return (
                      <TableCell key={index} align="right" className={classes.TableCellXS}>
                        {(item / 100).toString().replace('.', '-')}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={index} align="right" className={classes.TableCellMD}>
                        {(item / 100).toString().replace('.', '-')}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(balanceYear()).map(([key, value], index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left">{key}</TableCell>
                    {value.map((data, index, array) => {
                      if (array.length - index < 4) {
                        return (
                          <TableCell key={index} align="right">
                            {data}
                          </TableCell>
                        );
                      } else if (array.length - index < 7) {
                        return (
                          <TableCell key={index} align="right" className={classes.TableCellXS}>
                            {data}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={index} align="right" className={classes.TableCellMD}>
                            {data}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default Tablestock;
