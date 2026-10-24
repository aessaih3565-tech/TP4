export function findCustomerById(customers, customerId) {
  return customers.find((customer) => Number(customer.id) === Number(customerId));
}

export function findProductById(products, productId) {
  return products.find((product) => Number(product.id) === Number(productId));
}

export function getLineTotal(item, products) {
  const product = findProductById(products, item.productId);
  if (!product) {
    return 0;
  }

  return product.price * item.quantity;
}

export function getOrderTotal(order, products) {
  return (order.items || []).reduce((total, item) => {
    return total + getLineTotal(item, products);
  }, 0);
}

export function getVisibleOrders({ customers, products, orders, search, selectedStatus, selectedCategory }) {
  const normalizedSearch = search.trim().toLowerCase();

  return orders
    .filter((order) => {
      const customer = findCustomerById(customers, order.customerId);
      const matchesSearch =
        !normalizedSearch ||
        (customer && customer.name.toLowerCase().includes(normalizedSearch)) ||
        String(order.id).includes(normalizedSearch);

      const matchesStatus = selectedStatus === 'Tous' || order.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'Toutes' ||
        (order.items || []).some((item) => {
          const product = findProductById(products, item.productId);
          return product && product.category === selectedCategory;
        });

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .map((order) => {
      const customer = findCustomerById(customers, order.customerId);
      const items = (order.items || []).map((item) => {
        const product = findProductById(products, item.productId);
        return {
          ...item,
          product,
          lineTotal: getLineTotal(item, products)
        };
      });

      return {
        ...order,
        customer,
        items,
        total: items.reduce((sum, item) => sum + item.lineTotal, 0)
      };
    });
}

export function getOrderDetail(order) {
  if (!order) {
    return null;
  }

  return {
    ...order,
    customerName: order.customer ? order.customer.name : 'Client inconnu',
    city: order.customer ? order.customer.city : 'Ville inconnue'
  };
}

export function getDashboardStats({ customers, products, orders }) {
  const totalCustomers = customers.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, order) => sum + getOrderTotal(order, products), 0);

  return {
    totalCustomers,
    totalProducts,
    totalOrders,
    totalAmount
  };
}

export function getFilterOptions({ products, orders }) {
  const statuses = ['Tous', ...new Set(orders.map((order) => order.status))];
  const categories = ['Toutes', ...new Set(products.map((product) => product.category))];

  return { statuses, categories };
}
