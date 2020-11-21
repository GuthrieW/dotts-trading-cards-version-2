import { Container } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import Head from 'next/head';
import React, { useState } from 'react';

import classes from '../styles/Home.module.css';
import styles from '../styles/Home.module.css';
import useStyles from './index.styles';
import Link from 'next/link';
import DefaultLayout from '../layouts/DefaultLayout';

const index = () => {
  const customClass = useStyles();

  return (
    <>
      <Container className={classes.container}>
        <Head>
          <title>Dotts Trading Cards API</title>
          <link rel='icon' href='/favicon.ico' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <div className={customClass.main}>
          <h1>Dotts Trading Cards API</h1>
          <p>hello world</p>
        </div>
      </Container>
    </>
  );
};

index.Layout = DefaultLayout;

export default index;
