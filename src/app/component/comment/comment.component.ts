import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CommentService} from '../../service/comment.service';
import {Strategy} from '../../model/strategy';
import {Comment} from '../../model/comment';
import {StrategyService} from '../../service/strategy.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() strategy: Strategy;
  id: number;

  ELEMENT_DATA: Comment[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userEmail', 'commentScore', 'commentDescription', 'commentCreationDate'];
  commentListSource = new MatTableDataSource<Comment>();

  constructor(private commentService: CommentService,
              private strategyService: StrategyService,
              private route: ActivatedRoute) {
    this.commentService.listen().subscribe((m: any) => {
      this.getAllComments();
    });
    this.commentListSource = new MatTableDataSource<Comment>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.strategy = new Strategy();
    this.id = this.route.snapshot.params.id;
    this.strategyService.getStrategy(this.id).subscribe(data => {
      this.strategy = data;
    }, error => console.log(error));

    this.getAllComments();
  }

  ngAfterViewInit(): void {
    this.commentListSource.paginator = this.paginator;
    this.commentListSource.sort = this.sort;
  }

  getAllComments(): void {
    const resp = this.commentService.getAllCommentsByStrategyId(this.id);
    resp.subscribe(report => this.commentListSource.data = report as Comment[]);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.commentListSource.filter = filterValue.trim().toLowerCase();

    if (this.commentListSource.paginator) {
      this.commentListSource.paginator.firstPage();
    }
  }

}
