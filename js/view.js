function formatCurrency(value) {
  return `${Number(value).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} MAD`;
}

export function renderStats(stats) {
  const customerCount = document.getElementById('customerCount');
  const productCount = document.getElementById('productCount');
  const orderCount = document.getElementById('orderCount');
  const totalAmount = document.getElementById('totalAmount');

  customerCount.textContent = stats.totalCustomers;
  productCount.textContent = stats.totalProducts;
  orderCount.textContent = stats.totalOrders;
  totalAmount.textContent = formatCurrency(stats.totalAmount);
}

export function renderFilters(statuses, categories, selectedStatus, selectedCategory) {
  const statusFilter = document.getElementById('statusFilter');
  const categoryFilter = document.getElementById('categoryFilter');

  statusFilter.innerHTML = statuses
    .map(
      (status) =>
        `<option value="${status}" ${status === selectedStatus ? 'selected' : ''}>${status}</option>`
    )
    .join('');

  categoryFilter.innerHTML = categories
    .map(
      (category) =>
        `<option value="${category}" ${category === selectedCategory ? 'selected' : ''}>${category}</option>`
    )
    .join('');
}

export function renderOrders(orders) {
  const tbody = document.getElementById('ordersTableBody');

  if (!orders.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">Aucune commande ne correspond à vos filtres.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders
    .map((order) => {
      const statusClass = {
        Livree: 'status-live',
        'En attente': 'status-pending',
        Annulee: 'status-cancelled'
      }[order.status] || 'bg-secondary';

      return `
        <tr>
          <td>#${order.id}</td>
          <td>${order.customer ? order.customer.name : 'Client inconnu'}</td>
          <td>${order.date}</td>
          <td><span class="badge badge-status ${statusClass}">${order.status}</span></td>
          <td>${order.items.length} produit(s)</td>
          <td>${formatCurrency(order.total)}</td>
          <td class="text-center">
            <button class="btn btn-primary btn-sm detail-button" data-order-id="${order.id}">Détail</button>
          </td>
        </tr>
      `;
    })
    .join('');
}

export function renderOrderDetail(order) {
  const modalBody = document.getElementById('orderDetailBody');
  const detailTitle = document.getElementById('orderDetailTitle');

  if (!order) {
    modalBody.innerHTML = '<p class="mb-0">Commande introuvable.</p>';
    detailTitle.textContent = 'Détail de la commande';
    return;
  }

  detailTitle.textContent = `Commande #${order.id}`;
  const productRows = order.items
    .map((item) => {
      const product = item.product;
      const productName = product ? product.name : 'Produit inconnu';
      const unitPrice = product ? product.price : 0;
      return `
        <tr>
          <td>${productName}</td>
          <td>${unitPrice} MAD</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.lineTotal)}</td>
        </tr>
      `;
    })
    .join('');

  modalBody.innerHTML = `
    <div class="mb-4">
      <p class="mb-1"><strong>Client :</strong> ${order.customer ? order.customer.name : 'Client inconnu'}</p>
      <p class="mb-1"><strong>Ville :</strong> ${order.customer ? order.customer.city : 'Ville inconnue'}</p>
      <p class="mb-1"><strong>Date :</strong> ${order.date}</p>
      <p class="mb-1"><strong>Statut :</strong> ${order.status}</p>
    </div>

    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>${productRows}</tbody>
    </table>

    <div class="text-end fw-bold fs-5">Total : ${formatCurrency(order.total)}</div>
  `;
}

export function showError(message) {
  const errorBox = document.getElementById('errorBox');
  errorBox.textContent = message;
  errorBox.classList.remove('d-none');
}

export function hideError() {
  const errorBox = document.getElementById('errorBox');
  errorBox.textContent = '';
  errorBox.classList.add('d-none');
}
