const videoFileExtensions = [
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

const imageFileExtensions = ['png', 'jpg', 'jpeg', 'svg', 'gif', 'bmp', 'tiff'];

const isImage = (fileExtension: string) => imageFileExtensions.includes(fileExtension);

const isVideo = (fileExtension: string) => videoFileExtensions.includes(fileExtension);

export const fileTypeChecker = Object.freeze({ isImage, isVideo });
