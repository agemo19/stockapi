import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Select from 'react-select';
import { loadSingle } from '../actions';
import InputIcon from '@material-ui/icons/Input';
import IconButton from '@material-ui/core/IconButton';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: 460,
  },
  paper: {
    width: 170,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  select: {
    maxWidth: 248,
  },
  paperMain: {
    width: 460,
    borderRadius: '0px 4px 4px 4px',
    position: 'fixed',
    backgroundColor: 'white',
    zIndex: 10,
    top: 100,
    right: (showFilter) => (showFilter ? 0 : -460),
    transition: 'right 0.3s',
  },
  inputIcon: {
    position: 'absolute',
    left: (showFilter) => (showFilter ? 0 : -35),
    top: (showFilter) => (showFilter ? -35 : 0),
    borderRadius: (showFilter) => (showFilter ? '4px 4px 0px 0px' : '0px 4px 4px 0px'),
    transform: (showFilter) => (showFilter ? 'rotate(0deg)' : 'rotate(180deg)'),
    boxShadow: '1px -1px 1px -1px rgba(0,0,0,0.2)',
  },
  iconButton: {
    padding: 0,
    borderRadius: (showFilter) => (showFilter ? '4px 4px 0px 0px' : '0px 4px 4px 0px'),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function Filter({ list, isLoading, singleName, compareName, indicatorlist, indicatorlistSelected, dispatch }) {
  let stockName1;
  let stockName2;
  if (singleName) {
    stockName1 = { value: singleName, label: singleName };
  }
  if (compareName) {
    stockName2 = { value: compareName, label: compareName };
  }
  const [checked, setChecked] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(false);
  const classes = useStyles(showFilter);

  useEffect(() => {
    if (!stockName1 | !stockName2) {
      setShowFilter(true);
    }
  }, [stockName1, stockName2]);
  const left = indicatorlist;
  const right = indicatorlistSelected;

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    dispatch({ type: 'ALL_RIGHT' });
  };

  const handleCheckedRight = () => {
    setChecked(not(checked, leftChecked));
    dispatch({ type: 'RIGHT', payload: leftChecked });
  };

  const handleCheckedLeft = () => {
    setChecked(not(checked, rightChecked));
    dispatch({ type: 'LEFT', payload: rightChecked });
  };

  const handleAllLeft = () => {
    dispatch({ type: 'ALL_LEFT' });
  };

  const optionsItem = (inputText) => {
    return list.map((i) => {
      return { value: i.id, label: i.name };
    });
  };
  const clicked1 = (a) => {
    dispatch(loadSingle(a.value, 1));
  };
  const clicked2 = (a) => {
    dispatch(loadSingle(a.value, 2));
  };

  const inputCSS = (id) => {
    return {
      control: (styles) => {
        return {
          ...styles,
          border: id ? '2px solid #3f51b5' : '2px solid red',
          boxShadow: '',
          '&:hover': id ?? { borderColor: 'red', backgroundColor: 'inherit' },
        };
      },
      input: (styles) => {
        return { ...styles, padding: id ? `0 0 0 ${id.value.length * 10 + 20}px` : '' };
      },
      placeholder: (styles) => {
        return { ...styles, color: 'red' };
      },
      singleValue: (styles) => {
        return { ...styles, backgroundColor: 'grey', color: 'white', borderRadius: '4px', padding: '0px 8px' };
      },
    };
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value}`} />
              {/* <ListItemText id={labelId} primary={`List item ${value + 1}`} /> */}
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Paper className={classes.paperMain}>
      <Paper elevation={1} className={classes.inputIcon}>
        <IconButton className={classes.iconButton} onClick={() => setShowFilter((a) => !a)}>
          <InputIcon fontSize={'large'} color={'primary'} />
        </IconButton>
      </Paper>
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={6} className={classes.select}>
          <Select
            options={optionsItem()}
            onChange={clicked1}
            value={stockName1}
            placeholder={'Select first stock..'}
            styles={inputCSS(stockName1)}
            isClearable={false}
          />
        </Grid>
        <Grid item xs={6} className={classes.select}>
          <Select
            options={optionsItem()}
            onChange={clicked2}
            value={stockName2}
            placeholder={'Select second stock..'}
            styles={inputCSS(stockName2)}
            isClearable={false}
          />
        </Grid>
        <Grid item> possible indicators{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>selected indicators{customList(right)}</Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    list: state.stocks,
    singleName: state.single.stock,
    compareName: state.compare.stock,
    indicatorlist: state.indicatorlist,
    indicatorlistSelected: state.indicatorlistSelected,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(Filter);
