import { 
    getAllProductsDescription, 
    getAllProductsWithLineDescriptions,
    getProductStockByLine,
    getAverageBuyPriceByProduct,
    getTotalProductPrice,
    getAverageMSRP
} from "./module/product.js"

import {


    getOrderDetailsByCustomer,
    getCustomersFromUSAWithHighCreditLimit,
    getAverageCreditLimit,
    getTotalPaymentsByTheCustomer,
    getAverageCreditLimitByCountry,
    getTotalSalesByCustomer

} from "./module/customers.js"

import {


    getAllEmployeesToWorkInSanFrancisco,
    getEmployeesReportingTo,
    getTotalEmployees,
    getEmployeeCountByJobTitle
} from "./module/employees.js"

import {

    getAllShippedOrders,
    getAllOrdersFromFrance,
    getTotalOrdersByCustomer
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
    getAverageQuantityOrderedByProduct,
    getTotalProductsOrderedByCustomer

} from "./module/ordendetails.js"

console.log(await getTotalSalesByCustomer())
