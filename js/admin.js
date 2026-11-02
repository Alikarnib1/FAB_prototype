/*
  F.A.B CO LTD — admin panel prototype.
  Sample data only. Nothing is saved: refreshing the page resets the demo.
*/

const CATEGORY_NAMES = {
  profiles: 'Profiles',
  sheets: 'Sheets & plates',
  tubes: 'Tubes & pipes',
  hardware: 'Hardware',
  accessories: 'Accessories'
};

const STATUS_STYLES = {
  pending: { label: 'Waiting', css: 'status-amber' },
  approved: { label: 'Approved', css: 'status-green' },
  suspended: { label: 'Suspended', css: 'status-gray' },
  rejected: { label: 'Rejected', css: 'status-red' }
};

const ORDER_STATUS = {
  new: { label: 'New', css: 'status-blue', action: 'Start preparing', next: 'processing' },
  processing: { label: 'Preparing', css: 'status-amber', action: 'Mark completed', next: 'done' },
  done: { label: 'Completed', css: 'status-green', action: '', next: null }
};

function emptyProductForm() {
  return { name: '', cat: 'profiles', weight: '', retail: '', whole: '', variants: '', desc: '', tags: [], photos: [] };
}

function admin() {
  return {
    tab: 'customers',
    custFilter: 'pending',
    notice: '',
    confirmId: null,
    productQuery: '',
    showForm: false,
    form: emptyProductForm(),
    catNames: CATEGORY_NAMES,

    customers: [
      { id: 1, business: 'Sample Workshop A', type: 'Aluminum workshop', city: 'Beirut', contact: 'Contact person A', email: 'workshop.a@example.com', phone: '[PHONE]', date: 'Nov 1, 2026', status: 'pending', orders: 0 },
      { id: 2, business: 'Sample Contractor B', type: 'Building contractor', city: 'Tripoli', contact: 'Contact person B', email: 'contractor.b@example.com', phone: '[PHONE]', date: 'Oct 31, 2026', status: 'pending', orders: 0 },
      { id: 3, business: 'Sample Glass & Frames C', type: 'Glass and frames shop', city: 'Saida', contact: 'Contact person C', email: 'frames.c@example.com', phone: '[PHONE]', date: 'Oct 30, 2026', status: 'pending', orders: 0 },
      { id: 4, business: 'Sample Builders D', type: 'Building contractor', city: 'Jounieh', contact: 'Contact person D', email: 'builders.d@example.com', phone: '[PHONE]', date: 'Sep 12, 2026', status: 'approved', orders: 7 },
      { id: 5, business: 'Sample Fabrication E', type: 'Aluminum workshop', city: 'Zahle', contact: 'Contact person E', email: 'fabrication.e@example.com', phone: '[PHONE]', date: 'Aug 3, 2026', status: 'approved', orders: 12 },
      { id: 6, business: 'Sample Kitchens F', type: 'Kitchen and furniture maker', city: 'Byblos', contact: 'Contact person F', email: 'kitchens.f@example.com', phone: '[PHONE]', date: 'Jul 19, 2026', status: 'approved', orders: 3 },
      { id: 7, business: 'Sample Trading G', type: 'Other', city: 'Tyre', contact: 'Contact person G', email: 'trading.g@example.com', phone: '[PHONE]', date: 'Oct 2, 2026', status: 'rejected', orders: 0 },
      { id: 8, business: 'Sample Doors H', type: 'Aluminum workshop', city: 'Aley', contact: 'Contact person H', email: 'doors.h@example.com', phone: '[PHONE]', date: 'May 5, 2026', status: 'suspended', orders: 2 }
    ],

    products: [
      { id: 'p1', name: 'Sliding window profile, series 2000', sku: 'PR-2000', cat: 'profiles', img: 'images/sliding-profile.jpg', tags: ['best'], retail: 34, whole: 29, variants: 3, visible: true },
      { id: 'p2', name: 'Casement window frame 45 mm', sku: 'PR-4500', cat: 'profiles', img: 'images/casement-window.jpg', tags: ['top'], retail: 19, whole: 16, variants: 2, visible: true },
      { id: 'p3', name: 'Aluminum sheet 1.5 mm', sku: 'SH-1500', cat: 'sheets', img: 'images/aluminum-sheet.jpg', tags: ['best', 'top'], retail: 58, whole: 49, variants: 2, visible: true },
      { id: 'p4', name: 'Checker plate 3 mm', sku: 'SH-3000', cat: 'sheets', img: '', tags: ['new'], retail: 135, whole: 115, variants: 0, visible: true },
      { id: 'p5', name: 'Square tube 40 × 40 × 2 mm', sku: 'TU-4040', cat: 'tubes', img: '', tags: ['best'], retail: 14, whole: 12, variants: 2, visible: true },
      { id: 'p6', name: 'Round tube Ø50 × 2 mm', sku: 'TU-5020', cat: 'tubes', img: '', tags: [], retail: 29, whole: 24.5, variants: 0, visible: true },
      { id: 'p7', name: 'Sliding door rollers (pair)', sku: 'HW-0110', cat: 'hardware', img: '', tags: ['top'], retail: 11, whole: 8.5, variants: 2, visible: true },
      { id: 'p8', name: 'Door handle set, matte black', sku: 'HW-0230', cat: 'hardware', img: '', tags: ['new'], retail: 24, whole: 19, variants: 0, visible: true },
      { id: 'p9', name: 'Silicone sealant, clear 300 ml', sku: 'AC-0300', cat: 'accessories', img: '', tags: ['best'], retail: 6, whole: 4.75, variants: 0, visible: true },
      { id: 'p10', name: 'Corner cleats for 45 mm frame (10 pcs)', sku: 'AC-0045', cat: 'accessories', img: '', tags: [], retail: 9, whole: 7, variants: 0, visible: false }
    ],

    orders: [
      { num: '#1042', customer: 'Sample Builders D', type: 'Wholesale', delivery: 'Delivery', date: 'Nov 1, 2026', items: '14 items', total: 1284, status: 'new' },
      { num: '#1041', customer: 'Guest customer', type: 'Regular', delivery: 'Pickup', date: 'Nov 1, 2026', items: '3 items', total: 96, status: 'new' },
      { num: '#1040', customer: 'Sample Fabrication E', type: 'Wholesale', delivery: 'Delivery', date: 'Oct 31, 2026', items: '22 items', total: 2310.5, status: 'processing' },
      { num: '#1039', customer: 'Guest customer', type: 'Regular', delivery: 'Pickup', date: 'Oct 30, 2026', items: '1 item', total: 58, status: 'done' }
    ],

    money,
    tagLabel,

    switchTab(id) {
      this.tab = id;
      this.notice = '';
      this.confirmId = null;
    },
    get tabs() {
      return [
        { id: 'customers', label: 'Wholesale customers', badge: this.pending.length },
        { id: 'products', label: 'Products', badge: 0 },
        { id: 'orders', label: 'Orders', badge: this.newOrders }
      ];
    },

    // ----- Wholesale customers -----
    get pending() { return this.customers.filter((c) => c.status === 'pending'); },
    get approved() { return this.customers.filter((c) => c.status === 'approved'); },
    get inactive() { return this.customers.filter((c) => c.status === 'suspended' || c.status === 'rejected'); },
    get custFilters() {
      return [
        { id: 'pending', label: 'Waiting for approval (' + this.pending.length + ')' },
        { id: 'approved', label: 'Approved (' + this.approved.length + ')' },
        { id: 'inactive', label: 'Suspended and rejected (' + this.inactive.length + ')' }
      ];
    },
    get shownCustomers() {
      if (this.custFilter === 'pending') return this.pending;
      if (this.custFilter === 'approved') return this.approved;
      return this.inactive;
    },
    statusLabel(c) { return STATUS_STYLES[c.status].label; },
    statusCss(c) { return STATUS_STYLES[c.status].css; },
    dateLabel(c) { return (c.status === 'pending' || c.status === 'rejected' ? 'Applied ' : 'Customer since ') + c.date; },
    ordersLabel(c) { return c.orders > 0 ? c.orders + (c.orders === 1 ? ' order' : ' orders') : 'No orders yet'; },
    approve(c) {
      c.status = 'approved';
      this.notice = c.business + ' is approved. They will see wholesale prices next time they sign in.';
    },
    reject(c) {
      c.status = 'rejected';
      this.notice = c.business + ' was rejected. Their account stays at regular prices.';
    },
    suspend(c) {
      c.status = 'suspended';
      this.notice = c.business + ' is suspended and will see regular prices.';
    },

    // ----- Products -----
    get visibleCount() { return this.products.filter((p) => p.visible).length; },
    get shownProducts() {
      const q = this.productQuery.trim().toLowerCase();
      if (!q) return this.products;
      return this.products.filter((p) => (p.name + ' ' + p.sku).toLowerCase().includes(q));
    },
    priceLabel(p, field) { return (p.variants > 0 ? 'From ' : '') + money(p[field]); },
    variantsLabel(p) { return p.variants > 0 ? p.variants + ' options' : 'No options'; },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    resetForm() {
      this.form.photos.forEach((url) => URL.revokeObjectURL(url));
      this.form = emptyProductForm();
    },
    onPhotos(event) {
      this.form.photos.forEach((url) => URL.revokeObjectURL(url));
      this.form.photos = Array.from(event.target.files).slice(0, 4).map((file) => URL.createObjectURL(file));
    },
    saveProduct() {
      const f = this.form;
      const variantCount = f.variants.split(',').map((v) => v.trim()).filter(Boolean).length;
      const product = {
        id: 'n' + Date.now(),
        name: f.name.trim(),
        sku: 'NEW-' + String(this.products.length + 1).padStart(4, '0'),
        cat: f.cat,
        img: f.photos[0] || '',
        tags: f.tags.slice(),
        retail: Number(f.retail),
        whole: Number(f.whole),
        variants: variantCount,
        visible: true
      };
      this.products.unshift(product);
      this.notice = product.name + ' was added to the store.';
      // Keep the photo URLs alive for the new product, then clear the form.
      this.form = emptyProductForm();
      this.showForm = false;
    },
    deleteProduct(p) {
      this.products = this.products.filter((x) => x.id !== p.id);
      this.confirmId = null;
      this.notice = p.name + ' was deleted.';
    },

    // ----- Orders -----
    get newOrders() { return this.orders.filter((o) => o.status === 'new').length; },
    orderStatus(o) { return ORDER_STATUS[o.status]; },
    advance(o) {
      const next = ORDER_STATUS[o.status].next;
      if (next) o.status = next;
    }
  };
}
