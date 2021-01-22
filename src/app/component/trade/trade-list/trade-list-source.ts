import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';

// TODO: Replace this with your own data model amount
export interface TablesItem {
  pair: string;
  amount: string;
  price: string;
  type: string;
  side: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablesItem[] = [
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'LIMIT',
    side: 'BUY',
  },
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'STOP_LOSS',
    side: 'SELL',
  },
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'TAKE_PROFIT',
    side: 'SELL',
  },
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'LIMIT_MAKER',
    side: 'BUY',
  },
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'LIMIT',
    side: 'SELL',
  },
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'MARKET',
    side: 'SELL',
  },
  {
    pair: '10',
    amount: '10',
    price: '16277',
    type: 'STOP_LOSS',
    side: 'SELL',
  },
];

/**
 * Data source for the Tables view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TradeListSource extends DataSource<TablesItem> {
  data: TablesItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TablesItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // tslint:disable-next-line:amountdef
  private getPagedData(data: TablesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // tslint:disable-next-line:amountdef
  private getSortedData(data: TablesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'pair':
          return compare(a.pair, b.pair, isAsc);
        case 'amount':
          return compare(+a.amount, +b.amount, isAsc);
        case 'price':
          return compare(+a.price, +b.price, isAsc);
        case 'type':
          return compare(+a.type, +b.type, isAsc);
        case 'side':
          return compare(+a.side, +b.side, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// tslint:disable-next-line:amountdef
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
