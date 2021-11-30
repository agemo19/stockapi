import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  media: {
    height: 250,
  },
  cardContent: {
    transition: 'height 0.3s',
    // whiteSpace: 'none',
    // whiteSpace: 'noWrap',
    // whiteSpace: (readMore) => (readMore ? 'none' : 'noWrap'),

    height: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  buttonStats: {
    textTransform: 'none',
    backgroundColor: 'grey',
    color: 'white',
    padding: '0px 10px',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'grey',
    },
  },
  cardActions: {
    justifyContent: 'space-between',
  },
}));

export const Article = ({ article }) => {
  const { stockarticle, stockarticlename, title, image, description } = article;
  const [readMore, setReadMore] = useState(false);
  const descRef = useRef(null);
  const descConRef = useRef(null);
  const classes = useStyles(readMore);

  useEffect(() => {
    const descHeight = descRef.current.getBoundingClientRect().height;
    if (readMore) {
      descConRef.current.style.height = `${descHeight}px`;
    } else {
      descConRef.current.style.height = '20px';
    }
  }, [readMore]);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => setReadMore((state) => !state)}>
        <CardMedia className={classes.media} image={image} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <div ref={descConRef} className={classes.cardContent}>
            <Typography ref={descRef} variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => setReadMore((state) => !state)}>
          {readMore ? 'Read Less' : 'Read More'}
        </Button>
        <Button size="small" color="primary" className={classes.buttonStats}>
          <Link to={`/single/${stockarticle}`} className={classes.buttonStats}>
            {stockarticlename} stats
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};
