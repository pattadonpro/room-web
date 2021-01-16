import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../../../services/room.service';
import {RoomModel} from '../../../models/room.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  room: RoomModel;

  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }

  load(id: string) {
    this.spinner.show();
    this.roomService.find(id).subscribe((res: HttpResponse<RoomModel>) => {
        this.room = res.body;
        this.spinner.hide();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.spinner.hide();
      });
  }

  displayPrice(price: number) {
    return {value: price};
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
