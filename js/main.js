import { 
    getAllProductsDescription, 
    getAllProductsWithLineDescriptions,
    getProductStockByLine,
    getAverageBuyPriceByProduct,
} from "./module/product.js"

import {


    getOrderDetailsByCustomer,
    getCustomersFromUSAWithHighCreditLimit,
    getAverageCreditLimit
} from "./module/customers.js"

import {


    getAllEmployeesToWorkInSanFrancisco,
    getEmployeesReportingTo
} from "./module/employees.js"

import {

    getAllShippedOrders,
    getAllOrdersFromFrance
} from "./module/orders.js"

import {

    getAllPaymentsByCustomer,
    getTotalPaymentsByCustomer
} from "./module/payments.js"

console.log(await getAverageBuyPriceByProduct())
