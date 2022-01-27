import {HttpParams, HttpParamsOptions} from '@angular/common/http';

export const DEFAULT_PAGEABLE_SIZE = 25;

export class PageRequest {
  readonly page: number;
  readonly size: number;
  readonly sort: Sort;

  constructor(page = 0, size: number = DEFAULT_PAGEABLE_SIZE, sort?: ISort) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  toHttpParams(
    options: HttpParamsOptions = {}
  ): HttpParams {
    let params: HttpParams = new HttpParams(options)
      // Add page & size
      .set('page', `${this.page}`)
      .set('size', `${this.size}`);

    // Add orders
    if (this.sort && this.sort.orders) {
      const groupedSort: { [key in Direction]: string[] } = this.sort.orders.reduce(
        (groupedProperty: any, order: Order) => {
          groupedProperty[order.direction] = groupedProperty[order.direction] || [];
          groupedProperty[order.direction].push(order.property);
          return groupedProperty;
        },
        {} as { [key in Direction]: string[] }
      );

      Object.keys(groupedSort).forEach(direction => {
        params = params.append('sort', `${groupedSort[direction].join(',')},${direction}`);
      });
    }

    return params;
  }
}

export interface Page<T> {
  // the total amount of elements
  totalElements: number;
  // the number of total pages
  totalPages: number;
  // the page content
  content: T[];
  // the number of the current Slice
  number: number;
  // the number of elements currently on this Slice
  numberOfElements: number;
  // the size of the Slice
  size: number;
  // the sorting parameters for the Slice
  sort: Sort;
  // whether the current Slice is the first one
  first: boolean;
  // whether the current Slice is the last one
  last: boolean;
}

export type Direction = 'ASC' | 'DESC';
export type NullHandling = 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';
export const DEFAULT_DIRECTION: Direction = 'ASC';

export class Sort implements ISort {
  readonly orders: Order[];

  constructor(orders: string | string[] | Order[], direction: Direction = DEFAULT_DIRECTION) {
    if (orders) {
      if (typeof orders === 'string') {
        this.orders = [
          {
            property: orders ,
            direction
          }
        ];
      } else if (orders.length > 0) {
        if (typeof orders[0] === 'string') {
          this.orders = (orders as string[]).map(property => {
            return {
              property,
              direction
            };
          });
        } else {
          this.orders = orders as Order[];
        }
      }
    }
  }
}

export interface ISort {
  orders: Order[];
}

export interface Order {
  property: string;
  direction: Direction;
  nullHandlingHint?: NullHandling;
}
