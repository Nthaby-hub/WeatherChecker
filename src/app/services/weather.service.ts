import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeather() {
    return this.http.get(
      `${environment.endpoint}/data/2.5/weather?q=Cape Town,za&APPID=${environment.weatherApi}`
    );
  }

  getForecast() {
    return this.http.get(
      `${environment.endpoint}/data/2.5/forecast?q=Cape Town,za&cnt=7&APPID=${environment.weatherApi}`,
    );
  }

}
