import React from 'react';
import { useSelectedStore } from '@/store/selected/use-selected-store';
import { ImageViewer } from './ImageViewer';
import { checkViewer, VIEWERS } from '@/utils/viewer-checker';
import { VideoViewer } from './VideoViewer';

export const Viewer = () => {
  const { selectedViewerItem } = useSelectedStore();

  if (checkViewer(selectedViewerItem?.fileExtension) === VIEWERS.IMAGE)
    return <ImageViewer file={selectedViewerItem} />;

  if (checkViewer(selectedViewerItem?.fileExtension) === VIEWERS.VIDEO)
    return <VideoViewer file={selectedViewerItem} />;

  return <div>Default</div>;
};
