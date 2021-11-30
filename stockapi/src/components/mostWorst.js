import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1200,
  },
  appBar: {
    backgroundColor: '#e7e7e7',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  tableCellStock: {
    width: '100px',
    color: '#3f51b5',
  },
  TableHead: {
    borderBottom: '2px solid #adafba',
  },
  tableCellRed: {
    color: 'red',
    fontWeight: 700,
  },
  tableCellGreen: {
    color: 'green',
  },
  buttonStats: {
    textTransform: 'none',
    textDecoration: 'none',
  },
  tableCellName: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const MostWorst = ({ dataMost }) => {
  const [pe, change] = dataMost;
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={1} className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} indicatorColor={'primary'} centered variant={'fullWidth'}>
          <Tab label="high-cost/ low-cost" />
          <Tab label="Biggest changes" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TableContainer className={classes.tableContainer}>
          {/* <AutoSizer> */}
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead className={classes.TableHead}>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell className={classes.tableCellName}></TableCell>
                <TableCell>Sector</TableCell>
                <TableCell align="right">PE ratio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pe.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left" className={classes.tableCellStock}>
                      <Button size="small" color="primary" className={classes.buttonStats}>
                        <Link to={`/single/${data.id}`} className={classes.buttonStats}>
                          {data.stock}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellName}>
                      {data.name}
                    </TableCell>
                    <TableCell align="left">{data.sector}</TableCell>
                    <TableCell align="right" className={index > 4 ? classes.tableCellRed : classes.tableCellGreen}>
                      {data.pe}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {/* </AutoSizer> */}
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead className={classes.TableHead}>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell className={classes.tableCellName}></TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {change.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="left" className={classes.tableCellStock}>
                      <Button size="small" color="primary" className={classes.buttonStats}>
                        <Link to={`/single/${data.id}`} className={classes.buttonStats}>
                          {data.stock}
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellName}>
                      {data.name}
                    </TableCell>
                    <TableCell align="right">{data.price}</TableCell>

                    <TableCell align="right" className={index > 4 ? classes.tableCellGreen : classes.tableCellRed}>
                      {data.change}%
                    </TableCell>
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

export default MostWorst;
