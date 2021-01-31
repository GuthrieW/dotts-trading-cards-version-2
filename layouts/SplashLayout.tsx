// const darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// })
import React from 'react'
import { Card, CardContent } from '@material-ui/core'

const SplashLayout = ({ children }) => {
  return (
    <Card>
      <CardContent>
        <div
          style={{
            display: 'inline-block',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

export default SplashLayout
