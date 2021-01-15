import React from 'react';
import { useRouter } from 'next/router';
import CollectionView from '../../components/CollectionView/CollectionView';

const CommunityMemberPage = () => {
  const router = useRouter()
  const { user } = router.query;

  return (
    <CollectionView />
  );
}

export default CommunityMemberPage;