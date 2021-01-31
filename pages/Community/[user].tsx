import React from 'react'
import CollectionView from '../../components/CollectionView/CollectionView'
import { useRouter } from 'next/router'

const CommunityMemberPage = () => {
  const router = useRouter()
  const { user, email } = router.query
  return <CollectionView email={email} />
}

export default CommunityMemberPage
