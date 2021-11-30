import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import CompareIcon from '@material-ui/icons/Compare';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#e1e1e1',
  },

  toolbar: {
    display: 'flex',
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 40,
  },
  typography: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: 0,
      margin: 0,
    },
  },
  link: {
    padding: 20,
    fontSize: 15,
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
    '&:hover': {
      color: '#a59595',
    },
  },
  linkActive: {
    padding: 20,
    fontSize: 15,
    borderBottom: '2px solid blue',
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    },
    '&:hover': {
      color: '#a59595',
    },
  },
  searchIcon: {
    display: 'none',
    margin: '18px',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexGrow: 1,
    },
  },
  search: {
    cursor: 'pointer', //neveikia
    margin: '8px 8px',
    maxWidth: '500px',
    flexGrow: 4,
    marginBottom: '5px',
    position: 'flex',
    transition: 'top 0.3s',
    zIndex: 20,
    '&:hover': {
      cursor: 'pointer', //neveikia
    },
    [theme.breakpoints.down('xs')]: {
      zIndex: 20,
      margin: '10px 12% 10px 10px',
      position: 'fixed',
      // position: 'absolute',
      minWidth: '73%',
      top: (search) => (search ? 0 : -50),
    },
  },
  button: {
    borderRadius: 0,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));
// multiple classes
//className={`${classes.toolbar} ${classes.toolbarSide1}`}

function Header({ list, dispatch }) {
  let history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState(false);
  const classes = useStyles(search);

  const optionsItem = async (inputText, callback) => {
    let res = list.filter((i) => i.stock.includes(inputText.toUpperCase()));
    callback(res.map((i) => ({ label: `${i.stock} - ${i.name}`, value: i.id })));
  };

  const onChange = (x, y) => {
    dispatch({ type: 'DATA_LOADING' });
    history.push(`/single/${x[0].value}`);
    showSearchClose();
  };

  const showSearchButton = () => {
    setSearch((prev) => !prev);
  };
  const showSearchClose = () => {
    setSearch(false);
  };

  // closeEventHandler
  let domNode = useRef();
  let domNodeS = useRef();
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target) & !domNodeS.current.contains(event.target)) {
        setSearch(false);
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return (
    <>
      {/* CssBaseline pasalina browserio css(padding ir pan) */}
      <CssBaseline />
      <AppBar position="static" color="default" elevation={1} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.typography}>
            <Button component="div" color="inherit" className={classes.button}>
              <Link
                component={NavLink}
                to="/"
                underline="none"
                color="textPrimary"
                className={location.pathname === '/' ? classes.linkActive : classes.link}
              >
                Home
              </Link>
            </Button>
            <Button component="div" color="inherit" className={classes.button}>
              <Link
                component={NavLink}
                to="/compare"
                underline="none"
                color="textPrimary"
                className={location.pathname === '/compare' ? classes.linkActive : classes.link}
              >
                Comparison
              </Link>
            </Button>
            <IconButton color="inherit" size="small">
              <Link component={NavLink} to="/">
                <HomeIcon className={classes.searchIcon} color="action" />
              </Link>
            </IconButton>
            <IconButton color="inherit" size="small">
              <Link component={NavLink} to="/compare">
                <CompareIcon className={classes.searchIcon} color="action" />
              </Link>
            </IconButton>
            <IconButton ref={domNodeS} color="inherit" size="small" onClick={showSearchButton}>
              <SearchIcon className={classes.searchIcon} color="action" />
            </IconButton>
          </Typography>
          <div ref={domNode} className={classes.search}>
            <AsyncSelect
              className={classes.asyncSelect}
              isMulti
              // value={[{ label: 'pvz' }]}
              value={[]}
              onChange={onChange}
              placeholder={'Search'}
              loadOptions={optionsItem}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

const mapStateToProps = (state) => {
  return { list: state.stocks };
};

export default connect(mapStateToProps)(Header);
// export default Header;
