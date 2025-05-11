import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://wddkstage.azurewebsites.net/api/test/task/bookings?startDate=2025-01-01&endDate=2025-01-31';
  private putUrl = 'https://wddkstage.azurewebsites.net/api/test/task/bookings';

  constructor(public http: HttpClient) { }

  //Get
  public getItems(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  updateItem(data: any) {
    this.http.put(`${this.putUrl}/${data.id}/${data.status}`, data).subscribe((data: any) => {
      alert('Modified successfully');
      // this.snackBarService.success(this.translateService.instant('SUCCESS.' + this.editWord));      
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
