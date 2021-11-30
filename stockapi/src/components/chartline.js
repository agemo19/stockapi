import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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
}));

export default function ChartLine({ dataChart }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, name1, name2] = dataChart;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 25,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" allowDuplicatedCategory={true} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" connectNulls dataKey={name1} stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" connectNulls dataKey={name2} stroke="#82ca9d" />
            {/* <text x="15%" y="1%" dominantBaseline="hanging" fontSize="22" fontWeight="500">
              change from last quarter
            </text> */}
          </LineChart>
        </ResponsiveContainer>
      </Collapse>
    </div>
  );
}

// export default ChartLine;
