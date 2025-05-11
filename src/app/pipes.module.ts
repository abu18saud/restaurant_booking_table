import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBookingsPipe } from './search-bookings.pipe';


@NgModule({
    imports: [
        CommonModule,
        SearchBookingsPipe
    ],
    exports: [
        SearchBookingsPipe
    ]
})
export class PipesModule { }