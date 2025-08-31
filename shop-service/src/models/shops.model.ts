import db from "../config/db";
import { Shop } from "../config/types/shop.types";
import { UploadFile } from "../config/types/upload.types";

interface ShopUpdatePayload {
    name?: string;
    address?: string;
    longitude?: string;
    lattitude?: string;
    createdAt?: Date;
    email?: string;
    Shop_Phone?: {
        update?: {
            phone1?: string;
            phone1_whatsapp?: boolean;
            phone1_call?: boolean;
            phone1_message?: boolean;

            phone2?: string;
            phone2_whatsapp?: boolean;
            phone2_call?: boolean;
            phone2_message?: boolean;

            phone3?: string;
            phone3_whatsapp?: boolean;
            phone3_call?: boolean;
            phone3_message?: boolean;
        };
    };
    [key: string]: any;
}

const getShops = async () => {
    return await db.shops.findMany({
        where: {
            disabled: false
        },
        select: {
            id: true,
            name: true,
            address:true,
            longitude: true,
            lattitude: true,
            createdAt: true,
            email: true,
            Shops_Phone: {
                select: {
                    phone1: true,
                    phone1_whatsapp: true,
                    phone1_call: true,
                    phone1_message: true,
                    phone2: true,
                    phone2_whatsapp: true,
                    phone2_call: true,
                    phone2_message: true,
                    phone3: true,
                    phone3_whatsapp: true,
                    phone3_call: true,
                    phone3_message: true,
                }
            },
            Customer : {
                select: {
                    id: true,
                    name: true
                }
            },
            Route: {
                select: {
                    id: true,
                    label: true
                }
            },
            User: {
                select: {
                    id: true,
                    name: true
                }
            },
            Shoptypes: {
                select: {
                    id: true,
                    label: true
                }
            },
            Shops_Updates: {
                orderBy: {
                    timestamp: "desc"
                },
                take: 1,
                select: {
                    timestamp: true,
                    User: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            Shops_Images: {
                select: {
                    img1: true,
                    img2: true,
                    img3: true,
                    img4: true,
                    img5: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
};

const getShop = async (id: string) => {
    return await db.shops.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            address:true,
            longitude: true,
            lattitude: true,
            createdAt: true,
            email: true,
            Shops_Phone: {
                select: {
                    phone1: true,
                    phone1_whatsapp: true,
                    phone1_call: true,
                    phone1_message: true,
                    phone2: true,
                    phone2_whatsapp: true,
                    phone2_call: true,
                    phone2_message: true,
                    phone3: true,
                    phone3_whatsapp: true,
                    phone3_call: true,
                    phone3_message: true,
                }
            },
            Customer : {
                select: {
                    id: true,
                    name: true
                }
            },
            Route: {
                select: {
                    id: true,
                    label: true
                }
            },
            User: {
                select: {
                    id: true,
                    name: true
                }
            },
            Shops_Updates: {
                orderBy: {
                    timestamp: "desc"
                },
                take: 1,
                select: {
                    timestamp: true,
                    User: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            Shops_Images: {
                select: {
                    img1: true,
                    img2: true,
                    img3: true,
                    img4: true,
                    img5: true
                }
            }
        }
    })
};

const addShop = async (data:Shop, user:string, files: UploadFile) => {
    //Shop_Phone data
    let phoneData:{
        [key: string]: any;
    } = {
        phone1: data.phone1,
        phone1_whatsapp: data.phone1_whatsapp,
        phone1_call: data.phone1_call,
        phone1_message: data.phone1_message,
    }

    if(data.phone2){
        phoneData = {
            ...phoneData,
            phone2: data.phone2,
            phone2_whatsapp: data.phone2_whatsapp,
            phone2_call: data.phone2_call,
            phone2_message: data.phone2_message,
        }
    }
    if(data.phone3){
        phoneData = {
            ...phoneData,
            phone3: data.phone3,
            phone3_whatsapp: data.phone3_whatsapp,
            phone3_call: data.phone3_call,
            phone3_message: data.phone3_message
        }
    }

    const parsedFiles = files ? await Promise.all(Object.values(files).map(file => {
        //@ts-expect-error
        return { [`${file[0]?.fieldname}`]: file[0]?.filename }
    })) : [];

    //Shop_Images data
    let imageData = {
        img1: parsedFiles[0]?.img1 ?? undefined,
        img2: parsedFiles[1]?.img2 ?? undefined,
        img3: parsedFiles[2]?.img3 ?? undefined,
        img4: parsedFiles[3]?.img4 ?? undefined,
        img5: parsedFiles[4]?.img5 ?? undefined
    }

    return await db.shops.create({
        data: {
            name: data.name,
            address: data.address,
            longitude: data.longitude,
            lattitude: data.latitude,
            createdAt: data.createdAt,
            email: data.email,
            Shops_Phone: {
                create: phoneData
            },
            Shops_Images: {
                create: imageData
            },
            Customer: {
                connect: {
                    id: data.customer_id
                }
            },
            Route: {
                connect: {
                    id: data.route_id
                }
            },
            User: {
                connect: {
                    id: user
                }
            },
            Shoptypes: {
                connect: {
                    id: data.type_id
                }
            }
        },
        select: {
            id: true
        }
    })
};

const patchShop = async (id: string, data:Shop, user:string, files: UploadFile) => {
    let shopUpdatePayload: ShopUpdatePayload  = {
        name: data.name,
        address: data.address,
        longitude: data.longitude,
        lattitude: data.latitude,
        createdAt: data.createdAt,
        email: data.email,
        Shops_Phone: {
            update: {
                phone1: data.phone1,
                phone1_whatsapp: data.phone1_whatsapp,
                phone1_call: data.phone1_call,
                phone1_message: data.phone1_message,

                phone2: data.phone2,
                phone2_whatsapp: data.phone2_whatsapp,
                phone2_call: data.phone2_call,
                phone2_message: data.phone2_message,

                phone3: data.phone3,
                phone3_whatsapp: data.phone3_whatsapp,
                phone3_call: data.phone3_call,
                phone3_message: data.phone3_message
            }
        },
        Shops_Updates: {
            create: {
                userId: user
            }
        }
    };

    if(data.customer_id){
        shopUpdatePayload.Customer = {
            connect: {
                id: data.customer_id
            }
        }
    }

    if(data.route_id){
        shopUpdatePayload.Route = {
            connect: {
                id: data.route_id
            }
        }
    }

    if(data.type_id){
        shopUpdatePayload.Shoptypes = {
            connect: {
                id: data.type_id
            }
        }
    }

    if(files || data.removedImg){
        //Shop_Images data
        let imageData:{
            img1?: string | null,
            img2?: string | null,
            img3?: string | null,
            img4?: string | null,
            img5?: string | null
        } = {}

        Object.values(files).forEach((file:any) => {
            imageData = {
                ...imageData,
                [`${file[0]?.fieldname}`]: file[0]?.filename
            }
        });

        if(data.removedImg){
            const removedImg = JSON.parse(data.removedImg);
            if(removedImg.img1){ imageData.img1 = null }
            if(removedImg.img2){ imageData.img2 = null }
            if(removedImg.img3){ imageData.img3 = null }
            if(removedImg.img4){ imageData.img4 = null }
            if(removedImg.img5){ imageData.img5 = null }
        }

        shopUpdatePayload.Shops_Images = {
            upsert: {
                where: { id: id },
                create: imageData,
                update: imageData
            }
        }

    }

    return await db.shops.update({
        where: {
            id: id
        },
        data: shopUpdatePayload,
        select: {
            id: true
        }
    })
};

const deleteShop = async (id: string) => {
    return await db.shops.update({
        where: {
            id: id
        },
        data: {
            disabled: true
        }
    })
};

export default {
    get: getShop,
    getAll: getShops,
    create: addShop,
    update: patchShop,
    delete: deleteShop
}
