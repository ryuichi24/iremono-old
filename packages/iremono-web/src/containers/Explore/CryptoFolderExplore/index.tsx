import React from 'react';
import { useAppSelector } from '@/store/redux-hooks';
import { clientEncryptionKeySelector } from '@/store/auth/auth-slice';
import { UnlockedCryptoFolderExplore } from './UnlockedCryptoFolderExplore';
import { LockedCryptoFolderExplore } from './LockedCryptoFolderExplore';

export const CryptoFolderExplore = () => {
  const encryptionKey = useAppSelector(clientEncryptionKeySelector);
  return <>{encryptionKey ? <UnlockedCryptoFolderExplore /> : <LockedCryptoFolderExplore />}</>;
};
