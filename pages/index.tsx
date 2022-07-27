import Router from 'next/router'

const index = () => {
  if (typeof window !== 'undefined') {
    Router.push('/dashboard')
  }

  return null
}

export default index
