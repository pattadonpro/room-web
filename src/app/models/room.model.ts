export class RoomModel {
  constructor(public _id: string,
              public title: string,
              public price: number,
              public priceType: string,
              public description: string,
              public imageUrl: string,
              public createdAt: Date,
              public updatedAt: Date) {
  }
}
