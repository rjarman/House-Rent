export class OwnerInfo {
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
        },
        renterInfo: {
            isChecked: boolean,
            renterInfo: {
                name: string,
                mobile: string,
                officeAddress: string,
                permanentAddress: string
            }
        }
    };
}
