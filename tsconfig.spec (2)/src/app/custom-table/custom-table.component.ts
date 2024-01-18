import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from '../popup/popup.component';
import { popservice } from '../model/popservice.service';
import { Route, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

export interface TableData {
  id: number;
  name: string;
  mobileNo: string;
  status: string;
  imageUrl: string;
}
export interface PaginationEvent {
  skip: number;
  limit: number;
}
@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
  showBoundaryLinks: boolean = true;
  showDirectionLinks: boolean = true;
  public loading: boolean = false
  @Input() dataSource: any;
  @Input() displayedColumns: string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  paginatedData: any[];
  @Input() limit: any = 10;
  @Input() total: any;
  @Input() pageOptions: any[]
  @Input() needPagination: boolean = false
  @Output() onPage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Output() onPaginating: EventEmitter<any> = new EventEmitter()
  @Output() checkval: EventEmitter<any> = new EventEmitter()
  @Output() onsort: EventEmitter<any> = new EventEmitter()

  constructor(private service: ServiceService,
    private confirmDialogService: popservice,
    private router: Router) { }

  announceSortChange(sort: Sort) {
    this.onsort.emit({ sort: sort })
    console.log("hit")
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  pageChanged(event: PageChangedEvent): void {
    console.log(event, "ngx")
    this.onPage.emit({ skip: (event.page - 1) * event.itemsPerPage, limit: event.itemsPerPage, } as PaginationEvent);
  }

  onPageChange(event: MatPaginator) {
    console.log(event, "event")
    this.onPaginating.emit({ skip: event.pageIndex, limit: event.pageSize, length: event.length })
  }
  checkvalue(event) {
    this.checkval.emit(event)
  }

  showConfirmDialog(): void {
    this.loading = true;
    this.confirmDialogService.showConfirm('Confirm Action', 'Are you sure?').subscribe((result) => {
      this.loading = false;
      if (result) {
        this.loading = false;
        this.router.navigate(['/signal']);
      } else {
        this.router.navigate(['/table']);
      }
    });

  }


}
