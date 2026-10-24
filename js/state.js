export const state = {
  customers: [],
  products: [],
  orders: [],
  search: '',
  selectedStatus: 'Tous',
  selectedCategory: 'Toutes',
  error: ''
};

export function resetState() {
  state.customers = [];
  state.products = [];
  state.orders = [];
  state.search = '';
  state.selectedStatus = 'Tous';
  state.selectedCategory = 'Toutes';
  state.error = '';
}
