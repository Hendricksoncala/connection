1. ✅

- *Recuperar todas las líneas de productos con sus descripciones:**
- 

```sql
SELECT productLine, productDescription FROM products;
```

```sql
   
   

2. ✅

- *Encontrar todos los empleados que trabajan en la oficina de 'San Francisco':**

```sql
SELECT employees.firstName FROM employees inner join offices on offices.officeCode = employees.officeCode and offices.city = 'San Francisco';
```

```sql
   
   ```

3. ✅

- *Listar todas las órdenes que tienen un estado de 'Enviado':**

```sql
SELECT orderNumber,status FROM orders WHERE status = 'Shipped';
```

```sql
   
   ```

4. ✅

- *Obtener los detalles de todos los pagos realizados por el cliente con el número de cliente 103:**
- 

```sql
SELECT * FROM payments WHERE customerNumber = '103'; 
```

```sql
   
   ```

5. ✅

- *Recuperar todos los clientes de 'USA' que tienen un límite de crédito superior a 50000:**
- 

```sql
SELECT * FROM customers WHERE country = 'USA' and creditLimit >= '50000';
```

```sql
   
   ```

**### Consultas de múltiples tablas**

1. ✅

- *Listar todos los productos junto con las descripciones de sus líneas de productos:**
- 

```sql
SELECT p.productName, p.productDescription, pl.textDescription AS productLineDescription
FROM products p
JOIN productlines pl ON p.productLine = pl.productLine;
```

```sql
   
   ```

2. ✅

- *Obtener los nombres y direcciones de correo electrónico de los empleados que reportan al empleado con el número de empleado 1143:**
- 

```sql
SELECT employees.firstName,employees.email FROM employees WHERE reportsTo = '1143';
```

```sql
   
   ```

3.✅

- *Encontrar todas las órdenes realizadas por clientes de 'Francia':**
- 

```sql
          SELECT o.orderNumber, o.orderDate, c.customerName 
          FROM orders o
          JOIN customers c ON o.customerNumber = c.customerNumber
          WHERE c.country = 'France'
```

```sql
   
   ```

4.✅

- *Listar el monto total de los pagos recibidos de cada cliente:**
- 

```sql
 SELECT amount FROM payments;
```

```sql
   
   ```

5.✅

- *Recuperar los detalles de las órdenes, incluyendo los nombres de los productos, para todas las órdenes realizadas por el cliente con el número de cliente 101:** NO EXISTE

```sql
SELECT c.customerName, o.fecha, do.producto_nombre, do.cantidad, do.precio_unitario
FROM customers c
INNER JOIN orders o ON c.id = o.cliente_id
INNER JOIN order_details do ON o.id = do.orden_id
WHERE c.numero_cliente = 101;
```

```sql
   

   ```

**## Parte 2/2**

**### Consultas de una sola tabla**

1.✅

- *Obtener el promedio del límite de crédito de todos los clientes:**

```sql
SELECT customerNumber, customerName, AVG(creditLimit)
FROM customers 
GROUP BY customerNumber, customerName;
```

```
   
   ```

2.✅

- *Calcular el total de productos en stock:**

```sql
SELECT productLine, COUNT(productLine)
FROM products
GROUP BY productLine;
```

```
   
   ```

3.✅

- *Encontrar el precio medio de compra de todos los productos:**

```sql
--POR SI QUIERE DE CADA PRODUCTO:
SELECT productLine, buyPrice   FROM products GROUP BY productLine, buyPrice;

--POR SI QUIERE DE PRODUCTOS MEDIA EN GENERAL MEDI DEL PRODUCTO:
 SELECT productName, AVG(buyPrice) AS average_buy_price FROM productsGROUP BY productName ORDER BY average_buy_price DESC;
```

4.✅

- *Contar la cantidad de oficinas en cada país:**

```sql

SELECT country, COUNT(officeCode) AS number_of_offices
FROM offices
GROUP BY country;
```

```
   
   ```

5.✅

- *Calcular el total de pagos recibidos:**

```sql
SELECT FORMAT(SUM(amount), 2) AS total_payments
FROM payments;
```

```
   
   ```

6.✅

- *Obtener la cantidad total de empleados:**

```sql
SELECT employeeNumber, firstName, lastName 
FROM employees;
```

```
   
   ```

7.✅

- *Calcular la cantidad media de productos pedidos en las órdenes:**

```sql
SELECT productCode, AVG(quantityOrdered) AS average_quantity_ordered
FROM orderdetails
GROUP BY productCode;
```

```
   
   ```

8.✅

- *Encontrar el precio total de todos los productos:**

```sql
SELECT SUM(buyPrice) AS total_price FROM products; 
```

```
   
   ```

9.✅

- *Calcular el promedio del precio sugerido (MSRP) de los productos:**

```sql
SELECT  AVG(MSRP) AS MSRP_promedio
FROM products;

```

```
   
   ```

10.✅

- *Contar la cantidad de empleados por título de trabajo:**

```sql
SELECT jobTitle, COUNT(jobTitle) AS number_of_employees
FROM employees
GROUP BY jobTitle;
```

```

database= railway

1.✅

- *Calcular el total de pagos recibidos por cada cliente:

```sql
SELECT c.customerName, SUM(p.amount) AS total_payments FROM customers c JOIN payments p ON c.customerNumber = p.customerNumber GROUP BY c.customerNumber;
```

```
   
   ```

2.✅

- *Obtener el promedio del límite de crédito de los clientes por país:**

```sql
SELECT c.country, AVG(c.creditLimit) AS average_credit FROM customers c GROUP BY c.country;
```

3.✅

- *Calcular el total de órdenes realizadas por cada cliente:**

```sql
SELECT o.customerNumber, COUNT(o.orderNumber) AS total_orders FROM orders o JOIN customers c ON o.customerNumber = c.customerNumber GROUP BY o.customerNumber;
```

4.✅

- *Encontrar la cantidad total de productos pedidos por cada cliente:**

```sql
SELECT c.customerName, o.orderNumber, SUM(od.quantityOrdered) AS quantity_total
FROM orderdetails od
JOIN orders o ON od.orderNumber = o.orderNumber
JOIN customers c ON o.customerNumber = c.customerNumber
GROUP BY c.customerName, o.orderNumber;

```

- ✅*Calcular el total de ventas (cantidad ordenada por precio cada uno) por cada cliente:**

```sql
SELECT c.customerName, SUM(od.quantityOrdered * od.priceEach) AS total_sales
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
GROUP BY c.customerName;
```

6.✅

- *Obtener el promedio de la cantidad de productos en stock por línea de productos:**

```sql
SELECT p.productLine, AVG(p.quantityInStock) AS average_stock
FROM products p
JOIN productlines pl ON p.productLine = pl.productLine
GROUP BY p.productLine;
```

```
   
   ```

7.✅

- *Calcular el total de pagos recibidos por cada país:**

```sql
SELECT c.country, SUM(p.amount) AS total_payments
FROM customers c
JOIN payments p ON c.customerNumber = p.customerNumber
GROUP BY c.country;
```

```
   
   ```

8.

- *Encontrar el promedio de ventas (cantidad ordenada por precio cada uno) por cada empleado:** FALTA ARREGLAR************************************************************

```sql
SELECT employeeNumber, firstName, lastName, AVG(total_sales) AS avg_sales
FROM (
  SELECT e.employeeNumber, e.firstName, e.lastName, SUM(od.quantityOrdered * od.priceEach) AS total_sales
  FROM employees e
SELECT * FROM tripbookingdetails;  JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
  JOIN orders o ON c.customerNumber = o.customerNumber
  JOIN orderdetails od ON o.orderNumber = od.orderNumber
  WHERE o.status = 'shipped' 
  GROUP BY e.employeeNumber, e.firstName, e.lastName, o.orderNumber 
) AS employee_sales
GROUP BY employeeNumber, firstName, lastName;

```

```
   
   ```

9.✅

- *Calcular el total de órdenes gestionadas por cada empleado:**

```sql
SELECT e.employeeNumber, e.firstName, e.lastName, COUNT(o.orderNumber) AS total_orders
FROM employees e
JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
JOIN orders o ON c.customerNumber = o.customerNumber
WHERE o.status = 'Shipped'  
GROUP BY e.employeeNumber, e.firstName, e.lastName;

```

```
   
   ```

10.✅

- *Obtener la cantidad total de productos vendidos por cada línea de productos:**

```sql

SELECT p.productLine, SUM(od.quantityOrdered) AS total_products_sales
FROM products p
JOIN orderdetails od ON p.productCode = od.productCode
GROUP BY p.productLine; 
```

```
    
    ```

11.✅

- *Encontrar el promedio de la cantidad de productos ordenados por cada cliente:**

```sql
SELECT c.customerNumber, c.customerName, AVG(od.quantityOrdered) AS average_quantity_ordered
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
GROUP BY c.customerNumber, c.customerName;
```

```
    
    ```

12.✅

- *Calcular el total de ventas realizadas en cada país:**

```sql
SELECT c.country, SUM(od.quantityOrdered * priceEach) AS total_sales
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
WHERE o.status = 'Shipped'
GROUP BY c.country;

```

```
    
    ```

13.✅

- *Obtener el promedio del precio de compra de los productos por línea de productos:**

```sql
SELECT productLine, AVG(buyPrice) AS total_products_sales
FROM products 
GROUP BY productLine; 
```

```
    
    ```

14.✅

- *Encontrar la cantidad total de productos vendidos por cada vendedor:**

```sql
SELECT e.employeeNumber, e.firstName, e.lastName, SUM(od.quantityOrdered) AS total_products_sold
FROM employees e
JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
WHERE o.status = 'Shipped'
GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

```
    
    ```

15.✅

- *Calcular el total de pagos recibidos por cada vendedor:**

```sql
SELECT e.employeeNumber, e.firstName, e.lastName, SUM(p.amount) AS total_payments
FROM employees e
JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
JOIN payments p ON c.customerNumber = p.customerNumber
GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

```
    
    ```

16.✅

- *Obtener el promedio del límite de crédito de los clientes atendidos por cada vendedor:**

```sql
SELECT e.employeeNumber, e.firstName, e.lastName, AVG(c.creditLimit) AS average_credit_limit
FROM employees e
JOIN customers c ON e.employeeNumber = c.salesRepEmployeeNumber
GROUP BY e.employeeNumber, e.firstName, e.lastName;
```

```
    
    ```

17. no sirve

- *Encontrar el total de ventas realizadas por cada oficina:**

```sql
SELECT o.officeCode, SUM(od.quantityOrdered * od.priceEach) AS total_sales
FROM offices o
JOIN customers c ON o.city = c.city 
JOIN orders ord ON c.customerNumber = ord.customerNumber
JOIN orderdetails od ON ord.orderNumber = od.orderNumber
WHERE ord.status = 'Shipped'
GROUP BY o.officeCode;
```

```
    
    ```

18. no sirve en customers

- *Calcular la cantidad media de productos pedidos por cada cliente:**

```sql
SELECT c.customerNumber, c.customerName, AVG(od.quantityOrdered) AS average_quantity_ordered
FROM customers c
JOIN orders o ON c.customerNumber = o.customerNumber
JOIN orderdetails od ON o.orderNumber = od.orderNumber
WHERE o.status = 'Shipped'
GROUP BY c.customerNumber, c.customerName;
```

```
    
    ```

19. no sirve en payments

- *Obtener el total de pagos realizados en cada año:**

```sql
SELECT YEAR(paymentDate) AS year, SUM(amount) AS total_payments
FROM payments
GROUP BY YEAR(paymentDate);
```

```
    
    ```

20. no sirve esta en products

- *Encontrar el promedio del precio de venta (priceEach) de los productos por línea de productos:**

```sql
SELECT p.productLine, AVG(od.priceEach) AS average_sale_price
FROM products p
JOIN orderdetails od ON p.productCode = od.productCode
GROUP BY p.productLine;
```

```