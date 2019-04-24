import { Component, OnInit } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import * as c3 from 'c3';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  items = [];
  chart_items = [];
  public values;
  public chart_values;

  constructor(
    private http: Http
  ) {

    let data = { id: "data" };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    this.http.post('http://localhost/temp.php', data, options)
    .subscribe(response => {
      let res = response.json();
      console.log(res.values);

      res.values.forEach(element => {
        this.items.push(element);
      });

      console.log(this.items);
    });
   }
   ngAfterViewInit() {

    let data = { id: "data" };

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });


    this.http.post('http://localhost/temp_chart.php', data, options)
    .subscribe(response => {
      let res = response.json();
      console.log(res.values);

      res.chart_values.forEach(element => {
        this.chart_items.push(element);
      });

      console.log(this.chart_items);
    });



    let chart = c3.generate({
    bindto: '#chart',
        data: {
            columns: [
                ['temp', 30, 20, 10, 40, 15, 25],
            ],
        type: 'spline',
        }
    });
}

  
  
  
  
   ngOnInit() {
  }

}
