import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';

import { Ng6UdmMockService } from 'ng6-udm-mock';
import { UdmComment } from 'ng6-udm-mock';

export class UdmCommentDataSource extends DataSource<UdmComment> {
    private commentsSubject = new BehaviorSubject<UdmComment[]>([]);

    comments: UdmComment[];

    constructor(private paginator: MatPaginator, private sort: MatSort, private sv: Ng6UdmMockService) {
        super();
    }

    loadComments() {
        this.sv.getAllComments()
            .subscribe(dt => {
                this.commentsSubject.next(dt);
                this.comments = dt;
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<UdmComment[]> {
        const dataMutations = [
            this.commentsSubject.asObservable(),
            this.paginator.page,
            this.sort.sortChange
        ];
        this.paginator.length = this.comments.length;
        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getCommentsSortedData([...this.comments]));
          }));
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.commentsSubject.complete();
    }

    private getPagedData(comments: UdmComment[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return comments.splice(startIndex, this.paginator.pageSize);
    }

    private getCommentsSortedData(comments: UdmComment[]) {
        if (!this.sort.active || this.sort.direction === '') {
          return comments;
        }

        return comments.sort((a, b) => {
          const isAsc = this.sort.direction === 'asc';
          switch (this.sort.active) {
            case 'id': return compare(+a.id, +b.id, isAsc);
            case 'postId': return compare(+a.postId, +b.postId, isAsc);
            case 'name': return compare(a.name, b.name, isAsc);
            case 'email': return compare(a.email, b.email, isAsc);
            case 'body': return compare(a.body, b.body, isAsc);
            default: return 0;
          }
        });
      }
}

function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
