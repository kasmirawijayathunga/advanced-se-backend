import db from "../config/db";

const getRoutes = async () => {
    return await db.route.findMany({
        where: {
            disabled: false
        },
        select: {
            id: true,
            label: true
        }
    })
};

const getShopTypes = async () => {
    return await db.shoptypes.findMany({
        where: {
            disabled: false
        },
        select: {
            id: true,
            label: true
        }
    })
};

const getCustomers = async () => {
    return await db.customer.findMany({
        where: {
            disabled: false
        },
        select: {
            id: true,
            name: true
        }
    })
};

export default {
    getRoutes,
    getShopTypes,
    getCustomers
}