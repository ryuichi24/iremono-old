export interface HttpRequest {
  body: any;
  query: { [key: string]: string };
  params: { [key: string]: string };
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
}
