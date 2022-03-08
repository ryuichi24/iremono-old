import React from 'react';
import { ImageViewer } from './ImageViewer';
import { checkViewer, VIEWERS } from '@/utils/viewer-checker';
import { VideoViewer } from './VideoViewer';
import { DefaultViewer } from './DefaultViewer';
import { useAppSelector } from '@/store/redux-hooks';
import { selectedViewerItemSelector } from '@/store/selected/selected-slice';

export const Viewer = () => {
  const selectedViewerItem = useAppSelector(selectedViewerItemSelector);

  if (checkViewer(selectedViewerItem?.fileExtension) === VIEWERS.IMAGE)
    return <ImageViewer file={selectedViewerItem} />;

  if (checkViewer(selectedViewerItem?.fileExtension) === VIEWERS.VIDEO)
    return <VideoViewer file={selectedViewerItem} />;

  if (checkViewer(selectedViewerItem?.fileExtension) === VIEWERS.PDF)
    return <DefaultViewer file={selectedViewerItem} />;

  if (checkViewer(selectedViewerItem?.fileExtension) === VIEWERS.DEFAULT)
    return <DefaultViewer file={selectedViewerItem} />;

  return <></>;
};
