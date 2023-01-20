import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  withontentOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  getWeather() {
    return this.http.get(
      `${environment.endpoint}/data/2.5/weather?q=Cape Town,za&APPID=${environment.weatherApi}`,
      this.withontentOptions
    );
  }

  getForecast() {
    return this.http.get(
      `${environment.endpoint}/data/2.5/forecast?q=Cape Town,za&cnt=7&APPID=${environment.weatherApi}`,
      this.withontentOptions
    );
  }

}
