import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import Button from '../../components/buttons/button'
import useRunScript from '../api/v2/_mutations/use-run-script'

const TrophyRoom = () => {
  const { runScript, isLoading, isSuccess, reset } = useRunScript()

  return (
    <>
      <NextSeo title="Trophy Room" />
      <h1>Trophy Room</h1>
      {/* <Button onClick={() => runScript()} isLoading={isLoading}>
        Fix Collections
      </Button> */}
    </>
  )
}

export default TrophyRoom
