// import { HouseData } from './houseData';

export interface AuthData {
  userName: string;
  email: string;
  image: string;
}

export interface HouseOwnersData {
  id: any;
  email: string;
  ownerInfo: [OwnerInfo];
}

export interface Login {
  email: string;
  password: string;
}

export interface OwnerInfo {
  personal: {
    ownerName: string;
    mobile1: string;
    mobile2: string;
  };
  details: {
    imagePath: [];
    houseInfo: {
      emptyRoom: string;
      roomDetails: string;
      price: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    renterInfo: {
      isChecked: boolean;
      renterInfo: {
        name: string;
        mobile: string;
        officeAddress: string;
        permanentAddress: string;
      };
    };
  };
}

export interface Register {
  userName: string;
  email: string;
  password: string;
  imagePath: string;
  image: any;
}
