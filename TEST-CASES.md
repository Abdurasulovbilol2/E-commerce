# Test Cases

## 1. UI test cases

### TC-UI-01: Successful login

- Given the user is on the login page
- When valid credentials are entered
- Then the inventory page is displayed

### TC-UI-02: Invalid login

- Given the user enters an invalid username or password
- When the login button is clicked
- Then an error message is displayed and the user remains on the login page

### TC-UI-03: Product list loads

- Given the user is logged in
- When the inventory page loads
- Then six products are visible

### TC-UI-04: Product sorting by name

- Given the inventory page is loaded
- When sorting is changed to name A-Z
- Then product names are in alphabetical order

### TC-UI-05: Product sorting by price

- Given the inventory page is loaded
- When sorting is changed to price low-to-high
- Then product prices are in ascending order

### TC-UI-06: Add product to cart

- Given a user is viewing products
- When a product is added to the cart
- Then the cart badge updates to the expected count

### TC-UI-07: Remove product from cart

- Given a product is in the cart
- When it is removed
- Then the item count and item list update correctly

### TC-UI-08: Checkout validation required field

- Given the user is on the checkout form
- When required information is missing
- Then a validation message is shown

### TC-UI-09: Successful order placement

- Given valid checkout data is entered
- When the order is submitted
- Then the order completion page is displayed

## 2. API test cases

### TC-API-01: GET single resource

- Given a valid resource ID
- When a GET request is sent
- Then a 200 response and expected payload structure are returned

### TC-API-02: GET by user

- Given a valid user ID
- When a GET request is sent
- Then a list of matching posts is returned

### TC-API-03: POST create resource

- Given valid payload data
- When a POST request is sent
- Then a 201 response and created resource are returned

### TC-API-04: PUT replace resource

- Given valid replacement data
- When a PUT request is sent
- Then the resource reflects the replacement payload

### TC-API-05: PATCH partial update

- Given a partial change request
- When PATCH is used
- Then only the provided fields are updated

### TC-API-06: DELETE resource

- Given an existing resource ID
- When DELETE is called
- Then the server returns a successful delete response

### TC-API-07: Missing resource 404

- Given a non-existent resource ID
- When GET is called
- Then a 404 response is received
