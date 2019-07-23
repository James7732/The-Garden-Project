import { Component, OnInit, LOCALE_ID, ɵConsole } from '@angular/core';
import { GardenServiceService } from '../service/garden-service.service';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  private allData = [];
  private timeStamps = [];

  constructor(private channelData: GardenServiceService,
              private datepipe: DatePipe) { }

  public chartType = 'line';

  public tempArr = [];

  public chartDatasets: Array<any> = [
    { data: [28, 19, 12, 45, 46, 32, 80], label: 'Temperature' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'];

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

  }

  updateGraph() {
    this.channelData.getTempData().subscribe((data) => {
      this.allData = data;
      for (const i in data) {
        this.tempArr.push(data[i].field1);
        // this.timeStamps.push(this.datepipe.transform(data[i].created_at, 'short', 'GMT+2', 'en-US').toString());
      }
      console.log(this.tempArr);

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
