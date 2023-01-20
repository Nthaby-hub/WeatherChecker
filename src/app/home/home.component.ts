import { Component, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  today: any = {};
  forecast: any = {};
  weather: any = [];

  dt: any;
  temp: any;
  feels: any;
  parseFloat: any;
  Math: any;
  country: any;
  timer = 0;

  selected: any;
  display: any;
  time: number = 0;
  interval: any;
  inRange: boolean = true;
  showAlert: boolean = false;
  currentTemperature: number = 0;

  constructor(
    private weatherService: WeatherService
  ) {
    this.Math = Math;
    this.parseFloat = parseFloat;
  }

  ngOnInit(): void {

    this.selected = "celsius";

      this.weatherService
        .getWeather()
        .subscribe((response: any) => {

          if(response) {
            this.today = response;
            this.dt = this.today.dt*1000;
            this.temp = Math.round((this.today.main.temp-273.15)*100)/100;
            this.feels = Math.round((this.today.main.feels_like-273.15)*100)/100

            console.log(this.today)
            this.country = this.today.sys.country
          }
        },
        (error) => {
          // window.location.reload()

          this.interval = setInterval(() => {
            this.time++;
            this.display = this.transform(this.time);

            // alert('Api ERROR'+this.time);

            if(this.time == 15) {
              window.location.reload();
            }
          }, 1000);
        });

      this.weatherService
        .getForecast()
        .subscribe((response: any) => {
          this.forecast = response
          console.log(this.forecast)
          this.weather = this.forecast.list;
          console.log(this.weather)
        })

      this.interval = setInterval(() => {
        this.time++;
        this.transform(this.time);

        if(this.time == 20*60) {
          window.location.reload();
        }
      }, 1000);

  }

  reloadPage() {
    window.location.reload();
  }

  transform(value: number): string {
       const minutes: number = Math.floor(value / 60);
       return minutes + ':' + (value - minutes * 60);
  }

  checkTemperature() {
    if (this.temp < 15 || this.temp > 25) {
      this.showAlert = true;
    } else {
      this.showAlert = false;
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['temp']) {
  //     const currentTemperature = changes['temp'].currentValue;
  //     const previousTemperature = changes.temperature.previousValue;
  //     if (currentTemperature !== previousTemperature) {
  //       // temperature value has changed
  //       this.previousTemperature = previousTemperature;
  //       this.checkTemperature();
  //     }
  //   }
  // }

  notification() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: true,
      timer: 9000
    })
  }

}
