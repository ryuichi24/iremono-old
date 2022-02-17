import { Readable } from 'stream';
export interface HttpRequest {
  body: any;
  query: { [key: string]: string };
  params: { [key: string]: string };
  cookies: { [key: string]: string };
  ip?: string;
  ips?: string[];
  method: string;
  path: string;
  fullPath: string;
  host: string;
  baseUrl: string;
  user: any;
  uploadedFile: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
  readableStream: Readable | null;
  headers: { [key: string]: string };
  hasHeaders: boolean;
}
