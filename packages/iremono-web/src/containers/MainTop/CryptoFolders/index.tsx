import React from 'react';
import { LockedCryptoFolders } from './LockedCryptoFolders';
import { UnlockedCryptoFolders } from './UnlockedCryptoFolders';

interface Props {
  clientEncryptionKey?: string;
}

export const CryptoFolders = ({ clientEncryptionKey }: Props) => {
  return <>{clientEncryptionKey ? <UnlockedCryptoFolders /> : <LockedCryptoFolders />}</>;
};
