import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestService {

  data = [];

  constructor(
    private _http: Http
  ) {}

  get(url: string) {
    return this._http.get(url, this.header())
      .map((response: Response) => response.json());
  }

  post(url: string, data: any = {}, useToken: boolean = true) {
    return this._http.post(url, JSON.stringify(data), this.header(useToken))
      .map((response: Response) => response.json());
  }

  patch(url: string, data: any = {}) {
    return this._http.patch(url, JSON.stringify(data), this.header())
      .map((response: Response) => response.json());
  }

  delete(url: string) {
    return this._http.delete(url, this.header())
      .map((response: Response) => response.json());
  }

  private header(useToken: boolean = true) {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (useToken) {
      // let token = this.jwt.getToken();
      // headers.append('Authorization', 'Bearer' + token);
    }
    return new RequestOptions({
      headers: headers
    });
  }
}
