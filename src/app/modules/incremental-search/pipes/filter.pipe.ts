import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], args: string, accessor: (any) => string): any {
    console.log('got this items, ', items)
    return items ? items.filter(item => accessor(item).toLowerCase().includes(args.toLowerCase())) : [];
  }

}
