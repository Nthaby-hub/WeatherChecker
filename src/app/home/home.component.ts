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
  Math: any;
  country: any;

  selected: any;
  time: number = 0;
  interval: any;

  timerInterval: any;

  constructor(
    private weatherService: WeatherService
  ) {
    this.Math = Math;
  }

  ngOnInit(): void {

    this.selected = "celsius";

    //get recent weather
      this.weatherService
        .getWeather().subscribe((response: any) => {

          if(response) {
            this.today = response;
            //convert time to sast
            this.dt = this.today.dt*1000;

            //convert temperature to metrics
            this.temp = Math.round((this.today.main.temp-273.15)*100)/100;
            this.feels = Math.round((this.today.main.feels_like-273.15)*100)/100

            console.log(this.today)
            this.country = this.today.sys.country
          }
        },
        (error) => {
          this.networkNotif();
        });

        //subscribe to forecast weather
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
          this.reloadPage();
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

  ngOnChanges(changes: SimpleChanges) {
    //check when the temp changes
    if (changes['temp']) {
      //set current and previous values of temperature
      const currentTemperature = changes['temp'].currentValue;
      const previousTemperature = changes['temp'].previousValue;

      //notifies the user when previousTemperature leaves the 12-25 range
      if(previousTemperature >= 15 && previousTemperature <= 25) {
        if(currentTemperature < 15 || currentTemperature > 25) {
          this.weatherNotif();
        }
      }
    }
  }

  //use third party library for notifications
  networkNotif() {
    Swal.fire({
      html: 'Something went wrong. Reloading in a few seconds',
      timer: 10000,
      timerProgressBar: true,
      allowOutsideClick: false,
      confirmButtonText: 'Reload now',
      willClose: () => {
        clearInterval(this.timerInterval)
      }
    }).then((result) => {
      if (result.dismiss) {
        this.reloadPage();
      } else
      if (result.isConfirmed) {
        this.reloadPage();
      }
    })
  }

  //use third party library for notifications
  weatherNotif() {
    Swal.fire({
      position: 'top-end',
      html: 'The temperature is now '+this.temp,
      timer: 10000,
      timerProgressBar: true,
      allowOutsideClick: false,
      confirmButtonText: 'ok',
      didOpen: () => {
        Swal.showLoading
        const b = Swal.getHtmlContainer()?.querySelector('b')
        this.timerInterval = setInterval(() => {
        }, 10000)
      },
      willClose: () => {
        clearInterval(this.timerInterval)
      }
    })
  }

}
