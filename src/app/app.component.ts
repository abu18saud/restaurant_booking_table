import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'restaurant_booking_table';
  items: any[] = [];

  constructor(private appService: AppService) {
    this.appService.getItems().subscribe(res => {
      this.items = res;
      console.log(res);
    })
  }
}
