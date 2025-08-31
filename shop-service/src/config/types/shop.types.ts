export interface Shop {
    id?: string,
    name: string,
    address: string,
    longitude: string,
    latitude: string,
    createdAt: Date,
    email: string,

    phone1: string,
    phone1_whatsapp: boolean,
    phone1_call: boolean,
    phone1_message: boolean,
    phone2?: string,
    phone2_whatsapp?: boolean,
    phone2_call?: boolean,
    phone2_message?: boolean,
    phone3?: string,
    phone3_whatsapp?: boolean,
    phone3_call?: boolean,
    phone3_message?: boolean,

    customer_id: string,
    route_id: string,
    user_id: string,
    type_id: string,

    removedImg?: string
}