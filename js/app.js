import { state } from './state.js';
import { loadAllData } from './dataService.js';
import {
  getDashboardStats,
  getFilterOptions,
  getOrderDetail,
  getVisibleOrders,
  findCustomerById
} from './selectors.js';
import { hideError, renderFilters, renderOrderDetail, renderOrders, renderStats, showError } from './view.js';

const modalElement = document.getElementById('orderDetailModal');
const modal = new bootstrap.Modal(modalElement);

function bindEvents() {
  document.getElementById('searchInput').addEventListener('input', (event) => {
    state.search = event.target.value;
    render();
  });

  document.getElementById('statusFilter').addEventListener('change', (event) => {
    state.selectedStatus = event.target.value;
    render();
  });

  document.getElementById('categoryFilter').addEventListener('change', (event) => {
    state.selectedCategory = event.target.value;
    render();
  });

  document.getElementById('ordersTableBody').addEventListener('click', (event) => {
    const button = event.target.closest('[data-order-id]');
    if (!button) {
      return;
    }

    const orderId = Number(button.dataset.orderId);
    const order = state.orders.find((item) => Number(item.id) === orderId);
    const enrichedOrder = getOrderDetail(
      getVisibleOrders({
        customers: state.customers,
        products: state.products,
        orders: state.orders,
        search: state.search,
        selectedStatus: state.selectedStatus,
        selectedCategory: state.selectedCategory
      }).find((item) => Number(item.id) === orderId) || order
    );

    renderOrderDetail(enrichedOrder);
    modal.show();
  });
}

function render() {
  const visibleOrders = getVisibleOrders({
    customers: state.customers,
    products: state.products,
    orders: state.orders,
    search: state.search,
    selectedStatus: state.selectedStatus,
    selectedCategory: state.selectedCategory
  });

  const { statuses, categories } = getFilterOptions({
    products: state.products,
    orders: state.orders
  });

  renderStats(getDashboardStats(state));
  renderFilters(statuses, categories, state.selectedStatus, state.selectedCategory);
  renderOrders(visibleOrders);
}

async function initApp() {
  try {
    hideError();
    const data = await loadAllData();
    state.customers = data.customers;
    state.products = data.products;
    state.orders = data.orders;

    bindEvents();
    render();
  } catch (error) {
    console.error(error);
    showError(error.message || 'Erreur lors du chargement des données.');
  }
}

initApp();
