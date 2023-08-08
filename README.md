### Live Site Link: https://digital-cow-hut-ass-3-sable.vercel.app

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/64d1c87247f1ba5edb7ecd89 ( GET Single )
- api/v1/users/64d1c87247f1ba5edb7ecd89 (PATCH)
- api/v1/users/64d1c87247f1ba5edb7ecd89 (DELETE)

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/64cdf5858e46ee628900721a ( GET Single )
- api/v1/cows/64cdf5858e46ee628900721a (PATCH)
- api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE)

#### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
