import { Component, OnInit, LOCALE_ID, ɵConsole } from '@angular/core';
import { GardenServiceService } from '../service/garden-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  timeStamps = [];
  tempData = [];
  chart = [];

  constructor(private channelData: GardenServiceService) { }

  public chartType = 'line';

  public tempArr = [];

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  ngOnInit() {
    this.channelData.getTempData().subscribe(data => {
      const arrTemp = data.feeds.map(res => res.field1);
      const arrTime = data.feeds.map(res => res.created_at);

      const timestamps = [];
      arrTime.forEach((res) => {
        const dataTime = new Date(res);
        timestamps.push(dataTime.toLocaleTimeString('default', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'}));
      });
      this.tempData = arrTemp;
      this.timeStamps = timestamps;
      console.log('one entry: ' + this.timeStamps);
      this.chartLabels = timestamps;
      this.chartDatasets = [
        { data: this.tempData, label: 'Temperature (*C)' }
      ];
    });


    // this.chart = new Chart('canvas', {
    //   type: 'line',
    //   data: {
    //     labels: this.timeStamps,
    //     datasets: [{
    //       data: this.tempData,
    //       borderColor: 'rgba(200, 99, 132, .7)',
    //       borderWidth: 2,
    //       backgroundColor: 'rgba(105, 0, 132, .2)',
    //       fill: true
    //     }]
    //   },
    //   options: {
    //     legend: {
    //       display: true
    //     },
    //     scales: {
    //       xAxes: [{
    //         display: true
    //       }],
    //       yAxes: [{
    //         display: true
    //       }]
    //     }
    //   }
    // });
  }

  updateGraph() {
    this.channelData.getTempData().subscribe((data) => {
      // this.allData = data;
      // for (const i in data) {
      //   this.tempArr.push(data[i].field1);
      //   // this.timeStamps.push(this.datepipe.transform(data[i].created_at, 'short', 'GMT+2', 'en-US').toString());
      // }
      console.log(data);

      // this.allData.forEach((element) => {

      //   // this.tempArr.push( element.field1 );
      //   console.log(element);
      // });
      // this.allData.forEach((element) => {
      //   this.timeStamps.push(this.datepipe.transform(element.created_at, 'short', 'GMT+2', 'en-US').toString());
      // });
    });
  }
  public chartClicked(e: any): void { this.updateGraph(); }
  public chartHovered(e: any): void { }

}
