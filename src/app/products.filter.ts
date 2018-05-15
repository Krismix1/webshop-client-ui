import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Product } from './entities/product';

@Pipe({ name: 'filterProducts' })
@Injectable()
export class FilterProducts implements PipeTransform {
  transform(items: Product[], args: string): any {
    if (args && items.length > 0) {
      let itemsFound = items.filter(
        item => item.name && item.name.toLowerCase().includes(args.toLowerCase())
          || item.shortDescription && item.shortDescription.toLowerCase().includes(args.toLowerCase())
      );
      if (itemsFound && itemsFound.length > 0) {
        return itemsFound;
      }
      return [-1]; // to display error message (none found) in view.
    }
    return [];
  }
}
