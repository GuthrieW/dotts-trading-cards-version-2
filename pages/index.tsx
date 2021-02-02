import { Container } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import classes from '../styles/Home.module.css'
import DefaultLayout from '../layouts/DefaultLayout'
import HomePage from './Dashboard'

const index = () => {
  return (
    <>
      <Container className={classes.container}>
        <Head>
          <title>Dotts Trading Cards</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <HomePage />
      </Container>
    </>
  )
}

index.Layout = DefaultLayout

export default index
