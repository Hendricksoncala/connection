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
    getEmployeesReportingTo,
    getTotalEmployees
} from "./module/employees.js"

import {

    getAllShippedOrders,
    getAllOrdersFromFrance
} from "./module/orders.js"

import {

    getAllPaymentsByCustomer,
    getTotalPaymentsByCustomer,
    getTotalPayments,
} from "./module/payments.js"

import {

    getOfficeCountByCountry,

} from "./module/offices.js"

import {
    getAverageQuantityOrderedByProduct
} from "./module/ordendetails.js"
console.log(await getAverageQuantityOrderedByProduct())
