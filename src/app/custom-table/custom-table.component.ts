import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';
import { PopupComponent } from '../popup/popup.component';
import { popservice } from '../model/popservice.service';
import { Route, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface TableData {
  id: number;
  name: string;
  mobileNo: string;
  status: string;
  imageUrl: string;
}
@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
  public loading: boolean = false
  @Input() dataSource: any;
  @Input() displayedColumns: string[];

  @Input() isChecked: boolean = false; // Input to set the checkbox state
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() checkedChange = new EventEmitter<boolean>(); // Output to emit changes
  paginatedData: any[];
  @Input() limit: any = 10;
  @Input() total: any;
  @Input() pageOptions: any[]
  @Input() needPagination: boolean = false
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @Output() pageChanged = new EventEmitter<number>();
  @ViewChild(MatSort) sort: MatSort;
  @Output() onPaginating: EventEmitter<any> = new EventEmitter()
  @Output() checkval: EventEmitter<any> = new EventEmitter()
  @Output() onsort: EventEmitter<any> = new EventEmitter()
  currentPage = 1;
  constructor(private service: ServiceService,
    private toastr: ToastrService, private confirmDialogService: popservice,
    private router: Router, private _liveAnnouncer: LiveAnnouncer) { }

  announceSortChange(sort: Sort) {
    this.onsort.emit({ sort: sort })
    console.log("hit")


  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
    this.checkedChange.emit(this.isChecked);
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
        // User clicked OK, perform the action
        this.router.navigate(['/signal']);
      } else {
        // User clicked Cancel, do nothing or handle accordingly
        this.router.navigate(['/table']);
      }

      //  this.router.navigate(['/signal']);
    });

  }


}
