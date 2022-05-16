import { Injectable } from "@angular/core";
import { Camera } from "../models/Camera";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ChartCell } from "../models/ChartCell";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private httpclient: HttpClient) {}

  baseUrl: string = "http://localhost:8080/";
  url: string = this.baseUrl + "cameras";

  getCameras(): Observable<Camera[]> {
    return this.httpclient.get<Camera[]>(this.url);
  }

  createCamera(camera: Camera): Observable<any> {
    const body = JSON.stringify(camera);
    return this.httpclient.post<Camera>(this.url, body, {
      headers: {
        'Content-Type': 'application/json' 
      }
    });
  }

  editCamera(camera: Camera): Observable<any> {
    const body = JSON.stringify(camera);
    return this.httpclient.put(this.url+`/${camera.id}`, body, {
      responseType: 'text',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  deleteCamera(id: string): Observable<any> {
    return this.httpclient.delete(this.url + `/${id}`, { responseType: 'text' });
  }

  getChartData() : Observable<ChartCell[]> {
    // http://localhost:8080/chart
    return this.httpclient.get<ChartCell[]>(this.baseUrl + 'chart');
  }
}
