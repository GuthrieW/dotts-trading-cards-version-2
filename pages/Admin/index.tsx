import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants'
import axios from 'axios'
import ProcessorView from './ProcessorView'
import SubmitterView from './SubmitterView'
import PackIssuerView from './PackIssuerView'

function AdminPage() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isProcessor, setIsProcessor] = useState(false)
  const [isSubmitter, setIsSubmitter] = useState(false)
  const [isPackIssuer, setIsPackIssuer] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/users/singleUser/dottsUserId`,
        data: {
          userId: localStorage.getItem('dottsUserId'),
        },
      })
      console.log(user)

      setCurrentUser(user.data)
      setIsAdmin(user.data.isAdmin)
      setIsProcessor(user.data.isProcessor)
      setIsSubmitter(user.data.isSubmitter)
      setIsPackIssuer(user.data.isPackIssuer)
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>Admin Page</h1>

      {!currentUser && <h1>Loading...</h1>}
      {currentUser && (isAdmin || isProcessor) && <ProcessorView />}
      {currentUser && (isAdmin || isSubmitter) && <SubmitterView />}
      {currentUser && (isAdmin || isPackIssuer) && <PackIssuerView />}
    </>
  )
}

export default AdminPage
