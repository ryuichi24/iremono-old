import { Transform, TransformCallback } from 'stream';

interface SkipStreamOptions {
  skipLength: number;
}

export class SkipStream extends Transform {
  protected skipLength: number = 0;

  constructor({ skipLength }: SkipStreamOptions) {
    super();
    this.skipLength = skipLength;
  }

  override _transform = (chunk: any, encoding: BufferEncoding, callback: TransformCallback) => {
    if (this.skipLength === 0) this.push(chunk);
    else if (this.skipLength > chunk.length) {
      this.skipLength -= chunk.length;
    } else {
      if (this.skipLength !== chunk.length) this.push(chunk.slice(this.skipLength));
      this.skipLength = 0;
    }
    callback();
  };
}
