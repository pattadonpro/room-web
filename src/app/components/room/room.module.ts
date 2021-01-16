import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoomRoutingModule} from './room-routing.module';
import {RoomListComponent} from './room-list/room-list.component';
import {SharedModule} from '../../shared/shared.module';
import { RoomDetailComponent } from './room-detail/room-detail.component';

@NgModule({
  declarations: [RoomListComponent, RoomDetailComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule
  ]
})
export class RoomModule { }
