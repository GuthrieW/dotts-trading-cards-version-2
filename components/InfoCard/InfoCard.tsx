import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './InfoCard.styles';
import Link from 'next/link';

type InfoCardProps = {
  title: string;
  body?: string;
  href?: string;
}

export default function InfoCard({ title, body, href }: InfoCardProps) {
  const classes = useStyles();

  return (
    <Link href={href}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}