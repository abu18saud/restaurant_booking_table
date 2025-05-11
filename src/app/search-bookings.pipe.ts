import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBookings',
  pure: false
})
export class SearchBookingsPipe implements PipeTransform {

  transform(value: any[], args?: string): any[] {
    if (!value || !args) return value;

    const searchText = args.toLowerCase();

  // شاملة للحقول الإلزامية والاختيارية
  const searchFields = [
    'id',
    'orderNumber',
    'bookingDate',
    'status',
    'dinerPeopleCount',
    'customer'
  ];

    return value.filter((data: any) => {
      return searchFields.some(field => {
        const fieldValue = data[field];

        // ✅ التأكد من أن القيمة موجودة وليست null أو undefined
        if (fieldValue !== null && fieldValue !== undefined) {
          return fieldValue.toString().toLowerCase().includes(searchText);
        }

        return false;
      });
    });
  }

}
