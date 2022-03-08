import { Readable } from 'stream';
export interface HttpRequest {
  body: any;
  query: { [key: string]: string };
  params: { [key: string]: string };
  cookies: { [key: string]: string };
  headers: { [key: string]: string };
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
  streamCaughtErr: Error | null;
  headers: Headers;
  hasHeaders: boolean;
  cookies: Cookie[];
  hasCookies: boolean;
}

export interface Headers {
  [key: string]: string | number;
}

export interface Cookie {
  key: string;
  value: string;
  options: { httpOnly: boolean; maxAge: number; sameSite: 'none' | 'strict' | 'lax'; secure: boolean; path?: string };
}
