import React from 'react';
import { useRouter } from 'next/router';

const CommunityMemberPage = () => {
  const router = useRouter()
  const { user } = router.query;

  return <h1>{user}'s Cards</h1>;
}

export default CommunityMemberPage;