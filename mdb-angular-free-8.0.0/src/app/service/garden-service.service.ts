import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GardenServiceService{

  constructor(private http: HttpClient) { }

  getTempData(): Observable<any[]> {
    /*https://api.thingspeak.com/channels/814936/fields/1.json?results=2*/
    return this.http
    .get('https://api.thingspeak.com/channels/814936/fields/1.json?results=15')
    .pipe(map(responseData => {
      const filterArr = [];
      const tempArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          filterArr.push({ ...responseData[key], id: key });
        }
      }
      tempArray.push(filterArr[1]);
      return tempArray[0];
    }));
  }
}
