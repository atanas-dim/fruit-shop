type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  available_stock: number;
};

type Order = {
  id: number;
  customer_id: number;
  created_at: string;
};
