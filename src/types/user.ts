export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
  picture: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUsers {
  total: number;
  users: IUser[];
  userDetail: IUser;
}

export interface ITableData {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  picture: string;
  action: number;
}
