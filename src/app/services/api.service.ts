import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private _httpClient: HttpClient) { }
  /**
     * GET one
     * @param id
     * @param path
     */
  getOne(id: string, path: string) {
    const url = environment.host + path + '/' + id;
    return this._httpClient.get<any>(url);
  }
  /**
      * GET 
      * @param path
      */
  get(path: string) {
    const url = environment.host + path;
    return this._httpClient.get<any>(url);
  }
}
