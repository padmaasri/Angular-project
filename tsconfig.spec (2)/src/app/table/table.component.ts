import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from '../service.service';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { popservice } from '../model/popservice.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ICommunication {
  limit?: any;
  skip?: any;
  sortByKey?: any
  sortByType?: any

}

export class PaginationDTO implements ICommunication {
  limit?: any = 10;
  skip?: any = 0
  sortByKey: any;
  sortByType: any
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['check', 'id', 'brand', 'images', 'status', 'Action'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  TableList: any[] = [];
  limit: any;
  public loading = false;
  PaginationDTO: PaginationDTO

  total: any;
  skip: any;
  sortedData: any[];
  title = 'todo';

  todoList = [
    { title: 'install NodeJS' },
    { title: 'install Angular CLI' },
    { title: 'create new app' },
    { title: 'serve app' },
    { title: 'develop app' },
    { title: 'deploy app' },
  ];

  addItem(title: string): void {
    this.todoList.push({ title });
  }

  onSortChanged(event) {
    const data = this.dataSource.filteredData.slice();
    if (!event.sort.active || event.sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = event.sort.direction === 'asc'
      switch (event.sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'brand': return compare(a.brand, b.brand, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedData)
  }



  constructor(private service: ServiceService, private toaster: ToastrService, private confirmDialogService: popservice) {
    this.PaginationDTO = new PaginationDTO()
    this.sortedData = this.dataSource.filteredData.slice();
  }


  tableList() {
    this.loading = true;
    console.log(this.PaginationDTO, "res")
    this.service.getList(this.PaginationDTO).subscribe((res) => {
      this.loading = false;
      console.log(res, "res")
      this.dataSource = new MatTableDataSource(res?.products);
      this.TableList = res.products;
      this.total = res.total
      this.limit = res.limit
      this.skip = res.skip
    })
  }


  ngOnInit() {
    this.tableList()
  }

  pagination(event) {
    console.log("hit")
    console.log(event, 'event')
    this.PaginationDTO.skip = event.skip;
    this.PaginationDTO.limit = event.limit;
    this.tableList();
  }
  page(event) {
    console.log("hit")
    console.log(event, 'eventvalue')
    this.PaginationDTO.skip = event.skip;
    this.PaginationDTO.limit = event.limit;
    this.tableList();
  }
  check(event) {

    this.confirmDialogService.showConfirm('Confirm Action', 'You Want check').subscribe((result) => {
      this.loading = false;
      if (result) {
        this.loading = false;
        // User clicked OK, perform the action
        this.toaster.success("Check All In One Table ")
        // User clicked Cancel, do nothing or handle accordingly
        // this.router.navigate(['/table']);
      }
      //this.toaster.success("Check All In One Table ")
      //  this.router.navigate(['/signal']);
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
