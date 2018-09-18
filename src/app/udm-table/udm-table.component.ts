import { Ng6UdmMockService } from 'ng6-udm-mock';
import { UdmCommentDataSource } from './udm-comment-datasource';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-udm-table',
  templateUrl: './udm-table.component.html',
  styleUrls: ['./udm-table.component.css']
})
export class UdmTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  commentDataSource: UdmCommentDataSource;

  displayedColumns = ['id', 'postId', 'name', 'email', 'body'];
  // displayedColumns = ['id', 'postId', 'name', 'email'];

  constructor(private sv: Ng6UdmMockService) {

  }

  ngOnInit() {
    this.sv.setBaseUrl(environment.udmMockBaseUrl);
    this.commentDataSource = new UdmCommentDataSource(this.paginator, this.sort, this.sv);
    this.commentDataSource.loadComments();
  }

  private loadComments() {
    this.commentDataSource.loadComments();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadComments())
      )
      .subscribe();
  }

}
