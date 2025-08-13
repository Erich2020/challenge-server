export interface IBooking {
  _id?: string;
  user: string;
  occurrence: string;
  isExec?: Boolean;
  isActive?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
