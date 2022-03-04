import { VIEWERS } from './viewers';

const videoExtensions = [
  'asf',
  'aaf',
  'avchd',
  'flv',
  'avi',
  'drc',
  'mkv',
  'm2v',
  'm4p',
  'm4v',
  'mp2',
  'mng',
  'mov',
  'mpv',
  'mpeg',
  'mp4',
  'mpe',
  'mpg',
  'mxf',
  'ogg',
  'nsv',
  'roq',
  'ogv',
  'qt',
  'rm',
  'yuv',
  'rmvb',
  'svi',
  'webm',
  'vob',
  'wmv',
  '3gp',
  '3g2',
];

const imageExtensions = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'bmp', 'tiff'];

const pdfExtensions = ['pdf'];

export const checkViewer = (extension: string): string | null => {
  if (!extension) return null;
  const lowered = extension.toLocaleLowerCase();
  if (videoExtensions.includes(lowered)) return VIEWERS.VIDEO;
  if (imageExtensions.includes(lowered)) return VIEWERS.IMAGE;
  if (pdfExtensions.includes(lowered)) return VIEWERS.PDF;
  return VIEWERS.DEFAULT;
};
