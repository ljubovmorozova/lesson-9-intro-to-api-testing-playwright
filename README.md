### Checklist: GET /orders/{id}, PUT /orders/{id}, DELETE /orders/{id}

| #   | Endpoint | Scenario                                              | Test Data                                |
| --- | -------- | ----------------------------------------------------- | ---------------------------------------- |
| 1   | GET      | Fetch order with a valid `orderId`                    | `orderId ∈ {1 … 10}`                     |
| 2   | GET      | Fetch order with invalid `orderId` (boundary values)  | `orderId = 0`, `orderId = 11`            |
| 3   | GET      | Fetch order with missing `orderId`                    | `orderId = null`                         |
| 4   | GET      | Fetch order with incorrect `orderId` format           | `orderId = 'test'`                       |
| 5   | PUT      | Update order with a valid `orderId`                   | `orderId ∈ {1 … 10}` (+ valid body)      |
| 6   | PUT      | Update order with invalid `orderId` (boundary values) | `orderId = 0`, `orderId = 11` (+ body)   |
| 7   | PUT      | Update order with missing `orderId`                   | `orderId = null` (+ body)                |
| 8   | PUT      | Update order with incorrect `orderId` format          | `orderId = 'test'` (+ body)              |
| 9   | PUT      | PUT with invalid `api_key` should receive 401         | header `api_key = '12345'` / non-numeric |
| 10  | DELETE   | Delete order with a valid `orderId`                   | `orderId ∈ {1 … 10}`                     |
| 11  | DELETE   | Delete order with invalid `orderId` (boundary values) | `orderId = 0`, `orderId = 11`            |
| 12  | DELETE   | Delete order with missing `orderId`                   | `orderId = null`                         |
| 13  | DELETE   | Delete order with incorrect `orderId` format          | `orderId = 'test'`                       |
| 14  | DELETE   | DELETE with invalid `api_key` length → 401            | header `api_key = '12345'` (≠ 16 digits) |
