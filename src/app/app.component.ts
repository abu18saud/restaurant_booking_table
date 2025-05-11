import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { CommonModule, formatDate } from '@angular/common';
import { Status } from './status.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PipesModule } from './pipes.module';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, MatProgressBarModule, MatChipsModule, MatTooltipModule, MatMenuModule, MatButtonModule, PipesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'restaurant_booking_table';
  searchText: string = '';
  public items: any[] | null;
  public _items: any[] | null;
  loading: boolean = true;
  activeStatusFilters: Set<number> = new Set<number>();

  progress() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  }

  refresh() {
    this.appService.getItems().subscribe(res => {
      this.items = res;
      this._items = res;
    });
  }

  constructor(private appService: AppService
  ) {
    this.refresh();
    this.progress();
  }

  updateItem(data: any, status: any) {
    data.status = Number(status);
    this.appService.updateItem(data);
    // this.refresh();
  }

  get filteredItems(): any[] {
    return this._items.filter((item: any) => {
      console.log(item);
      let statusMatch = this.activeStatusFilters.size === 0 || this.activeStatusFilters.has(item.status);
      return statusMatch;
    });
  }

  formatDate(date: string, formate: string, lang: string = 'ar'): any {
    return formatDate(date, formate, lang === 'ar' ? 'ar-SA' : 'en-US');
  }

  // إضافة يوم واحد
  addOneDay(date: any): Date {
    let newDate = new Date();
    try {
      newDate = new Date(date.getTime()); // Clone the date object
      newDate.setDate(newDate.getDate() + 1);
    } catch {
    }

    return newDate;
  }

  getFilterDate(data: any) {
    this.progress();
    const value = data.target.value;

    if (value === 'today') {
      this.searchText = this.formatDate(new Date().toString(), 'yyyy-MM-dd', 'en');
    } else if (value === 'tomorrow') {
      this.searchText = this.formatDate(this.addOneDay(new Date()).toString(), 'yyyy-MM-dd', 'en');
    } else {

    }
  }

  toggleStatusFilter(data: any) {
    const value = data.target.value;
    let status = new Status();
    if (this.activeStatusFilters.has(Number(value))) {
      status = this.getStatus(value);
      this.activeStatusFilters.delete(Number(value));
      this.progress();
    } else {
      this.activeStatusFilters.add(Number(value));
      this.progress();
    }

    console.log(this.filteredItems);

    this.items = this.filteredItems;
  }

  clearAllFilters() {
    this.activeStatusFilters.clear();
    this.items = this._items;
  }

  convertUtcToRiyadh(utcDate: Date): Date {
    const localTime = new Date(utcDate);
    const utcTime = Date.UTC(
      localTime.getUTCFullYear(),
      localTime.getUTCMonth(),
      localTime.getUTCDate(),
      localTime.getUTCHours(),
      localTime.getUTCMinutes(),
      localTime.getUTCSeconds()
    );
    const riyadhTime = new Date(utcTime + 3 * 60 * 60 * 1000); // Add 3 hours in milliseconds
    return riyadhTime;
  }

  getStatus(number: any): Status {
    const status: Status = new Status();
    status.number = number;

    switch (Number(number)) {
      case 1:
        status.name = "Booked";
        status.cssClass = "status-badge status-confirmed";
        return status;
      case 2:
        status.name = "Arrived";
        status.cssClass = "status-badge status-confirmed";
        return status;
      case 4:
        status.name = "Seated";
        status.cssClass = "status-badge status-confirmed";
        return status;
      case 5:
        status.name = "Completed";
        status.cssClass = "status-badge status-confirmed";
        return status;
      case 6:
        status.name = "Canceled by Owner";
        status.cssClass = "status-badge status-cancelled";
        return status;
      case 7:
        status.name = "No Show";
        status.cssClass = "status-badge status-cancelled";
        return status;
      case 9:
        status.name = "Canceled by Customer";
        status.cssClass = "status-badge status-cancelled";
        return status;
      default:
        status.name = "Error";
        status.cssClass = "status-badge status-cancelled";
        return status;
    }
  }
}
