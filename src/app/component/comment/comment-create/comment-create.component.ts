import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Comment} from '../../../model/comment';
import {CommentService} from '../../../service/comment.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {Strategy} from '../../../model/strategy';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {StarRatingColor} from '../star-rating/star-rating.component';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  comment: Comment = new Comment();
  @Input() strategy: Strategy;

  isMember: false;
  currentUser: any;

  /* Star rating */
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(private commentService: CommentService,
              private tokenService: TokenStorageService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    /* Authorizations for a profile MEMBER */
    if (this.tokenService.getUser()) {
      this.isMember = this.tokenService.getUser().roles.includes('ROLE_Member');
      this.currentUser = this.tokenService.getUser();
    }
  }

  save(): void {
    this.comment.commentCreationDate = new Date();
    this.comment.commentUpdateDate = new Date();
    this.comment.userEmail = this.currentUser.email;
    this.comment.strategyId = this.strategy.strategyId;
    this.comment.statusId = 1;
    this.comment.commentMemberIp = '2a05:e35:2ea3:e956:c976:46d5:815f:a4d2';
    this.commentService.createComment(this.comment).subscribe(data => {
        console.log(data);
        this.showSuccessToaster('Comment successfully added');
        this.commentService.filter('create click');
      },
      error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  onSubmit(createComment: NgForm): void {
    console.log(createComment);
    this.save();
  }

  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Well done!');
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!');
  }

  /* Star rating -> value assigned to commentScore */
  onRatingChanged(rating): void {
    this.rating = rating;
    this.comment.commentScore = this.rating;
  }
}


