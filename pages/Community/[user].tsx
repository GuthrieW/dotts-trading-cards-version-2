import React from 'react'
import CollectionView from '../../components/CollectionView/CollectionView'
import { useRouter } from 'next/router'

const CommunityMemberPage = () => {
  const router = useRouter()
  const { user, providerAccountId } = router.query
  return <CollectionView providerAccountId={providerAccountId} />
}

export default CommunityMemberPage
