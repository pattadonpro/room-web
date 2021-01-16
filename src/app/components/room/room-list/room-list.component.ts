import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {RoomModel} from '../../../models/room.model';
import {PriceTypeEnum} from '../../../enums/price-type-enum';
import {FormBuilder} from '@angular/forms';
import {RoomService} from '../../../services/room.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {
  titleLimit = 60;
  searchForm: any;
  priceType = Object.keys(PriceTypeEnum);
  totalRoom: number;
  rooms: RoomModel[];
  searchCriteria: any;
  page: number;
  pageIndex: number;
  size: number;
  sortOptions = [
    { key: 'NEWEST',
      value: 'createdAt,desc'
    },
    { key: 'OLDEST',
      value: 'createdAt,asc'
    },
    { key: 'HIGHEST_PRICE',
      value: 'price,desc'
    },
    { key: 'LOWEST_PRICE',
      value: 'price,asc'
    }
  ];
  sort: string;
  routeData: any;

  constructor(private formBuilder: FormBuilder,
              private roomService: RoomService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeData = this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchCriteria = params;
      this.page = params.page ? params.page : 0;
      this.size = params.size ? params.size : 12;
      this.sort = params.sort ? params.sort : 'createdAt,desc';
      this.searchForm = this.formBuilder.group({
        title: params.title,
        priceType: params.priceType,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice
      });
      this.pageIndex = this.page;
      this.loadAll();
    });
  }

  loadAll() {
    this.spinner.show();
    this.roomService.query(this.buildQueryParams()).subscribe((res: HttpResponse<RoomModel[]>) => {
      this.rooms = res.body;
      this.totalRoom = Number(res.headers.get('X-Total-Count'));
      console.log(res.headers)
      console.log(res.headers)
      this.spinner.hide();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  private buildQueryParams() {
    const query = {};
    if (this.searchCriteria.title) {
      query['title'] = this.searchCriteria.title;
    }
    if (this.searchCriteria.priceType && this.searchCriteria.priceType !== 'ALL') {
      query['priceType'] = this.searchCriteria.priceType;
    }
    if (this.searchCriteria.minPrice) {
      query['minPrice'] = this.searchCriteria.minPrice;
    }
    if (this.searchCriteria.maxPrice) {
      query['maxPrice'] = this.searchCriteria.maxPrice;
    }
    query['page'] = this.page;
    query['size'] = this.size;
    query['sort'] = this.sort;
    return query;
  }

  onSearch() {
    this.searchCriteria = this.searchForm.value;
    this.page = 0;
    this.transition();
  }

  transition() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([], {
      queryParams: {
        title: this.searchCriteria.title,
        priceType: this.searchCriteria.priceType,
        minPrice: this.searchCriteria.minPrice,
        maxPrice: this.searchCriteria.maxPrice,
        page: this.page,
        size: this.size,
        sort: this.sort
      }
    });
  }

  onPage(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.transition();
  }

  onSort() {
    this.page = 0;
    this.transition();
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  onClear() {
    this.searchCriteria = {};
    this.page = 0;
    this.transition();
  }
}
