import React from 'react';
import { useAppSelector } from '@/store/redux-hooks';
import { clientEncryptionKeySelector } from '@/store/auth/auth-slice';
import { UnlockedCryptoFolders } from './UnlockedCryptoFolders';
import { LockedCryptoFolders } from './LockedCryptoFolders';

export const CryptoFolders = () => {
  const encryptionKey = useAppSelector(clientEncryptionKeySelector);
  return <>{encryptionKey ? <UnlockedCryptoFolders /> : <LockedCryptoFolders />}</>;
};
