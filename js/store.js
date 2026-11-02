/*
  F.A.B CO LTD — customer store prototype.
  All products, prices and orders are sample data. Nothing is saved:
  refreshing the page resets the demo.
*/

const CATEGORIES = [
  { id: 'profiles', name: 'Profiles', img: 'images/sliding-profile.jpg', blurb: 'Window, door and facade profiles in standard bar lengths.' },
  { id: 'sheets', name: 'Sheets & plates', img: 'images/aluminum-sheet.jpg', blurb: 'Flat sheets and checker plates for cladding and fabrication.' },
  { id: 'tubes', name: 'Tubes & pipes', img: '', blurb: 'Square and round hollow sections for frames and railings.' },
  { id: 'hardware', name: 'Hardware', img: '', blurb: 'Rollers, handles and locks for doors and windows.' },
  { id: 'accessories', name: 'Accessories', img: '', blurb: 'Sealants, corner cleats and fixings.' }
];

// Each product has at least one variant. A product with one variant has no options to choose.
const PRODUCTS = [
  {
    id: 'p1', cat: 'profiles', name: 'Sliding window profile, series 2000', sku: 'PR-2000', img: 'images/sliding-profile.jpg',
    tags: ['best'], weight: '6.6 kg per 6 m bar', unit: 'per 6 m bar', vlabel: 'Finish',
    variants: [
      { name: 'Mill finish', retail: 34, whole: 29 },
      { name: 'Anodized silver', retail: 39, whole: 33 },
      { name: 'Powder-coated white', retail: 42, whole: 36 }
    ],
    specs: [['Alloy', '6063-T5'], ['Length', '6 m'], ['Wall thickness', '1.4 mm']],
    desc: 'Sliding sash and frame profile for residential windows. Fits 6 mm single glazing or 20 mm double glazing.'
  },
  {
    id: 'p2', cat: 'profiles', name: 'Casement window frame 45 mm', sku: 'PR-4500', img: 'images/casement-window.jpg',
    tags: ['top'], weight: '1.2 kg per metre', unit: 'per bar', vlabel: 'Length',
    variants: [
      { name: '3 m', retail: 19, whole: 16 },
      { name: '6 m', retail: 36, whole: 30.5 }
    ],
    specs: [['Alloy', '6063-T5'], ['Wall thickness', '1.6 mm'], ['Finish', 'Mill finish']],
    desc: 'Frame profile for hinged and tilt-and-turn windows, with a groove for a thermal break.'
  },
  {
    id: 'p3', cat: 'sheets', name: 'Aluminum sheet 1.5 mm', sku: 'SH-1500', img: 'images/aluminum-sheet.jpg',
    tags: ['best', 'top'], weight: '4.1 kg per m²', unit: 'per sheet', vlabel: 'Size',
    variants: [
      { name: '1 × 2 m', retail: 58, whole: 49 },
      { name: '1.25 × 2.5 m', retail: 88, whole: 75 }
    ],
    specs: [['Alloy', '1050 H14'], ['Thickness', '1.5 mm'], ['Finish', 'Mill finish']],
    desc: 'Flat sheet for cladding, signage, ducting and general fabrication.'
  },
  {
    id: 'p4', cat: 'sheets', name: 'Checker plate 3 mm', sku: 'SH-3000', img: '',
    tags: ['new'], weight: '28 kg per sheet', unit: 'per sheet', vlabel: '',
    variants: [{ name: 'Standard', retail: 135, whole: 115 }],
    specs: [['Size', '1.25 × 2.5 m'], ['Pattern', 'Five-bar'], ['Alloy', '3003']],
    desc: 'Anti-slip tread plate for steps, ramps, truck floors and loading areas.'
  },
  {
    id: 'p5', cat: 'tubes', name: 'Square tube 40 × 40 × 2 mm', sku: 'TU-4040', img: '',
    tags: ['best'], weight: '0.82 kg per metre', unit: 'per length', vlabel: 'Length',
    variants: [
      { name: '3 m', retail: 14, whole: 12 },
      { name: '6 m', retail: 26, whole: 22 }
    ],
    specs: [['Alloy', '6063-T5'], ['Wall thickness', '2 mm'], ['Finish', 'Mill finish']],
    desc: 'Square hollow section for frames, gates, shelving and furniture.'
  },
  {
    id: 'p6', cat: 'tubes', name: 'Round tube Ø50 × 2 mm', sku: 'TU-5020', img: '',
    tags: [], weight: '0.81 kg per metre', unit: 'per 6 m length', vlabel: '',
    variants: [{ name: 'Standard', retail: 29, whole: 24.5 }],
    specs: [['Length', '6 m'], ['Finish', 'Anodized silver'], ['Alloy', '6063-T5']],
    desc: 'Round tube for handrails, balustrades and supports.'
  },
  {
    id: 'p7', cat: 'hardware', name: 'Sliding door rollers (pair)', sku: 'HW-0110', img: '',
    tags: ['top'], weight: '0.3 kg', unit: 'per pair', vlabel: 'Wheel',
    variants: [
      { name: 'Nylon', retail: 11, whole: 8.5 },
      { name: 'Steel bearing', retail: 15, whole: 12.5 }
    ],
    specs: [['Fits', 'Series 2000 track'], ['Load', 'Up to 80 kg per pair']],
    desc: 'Replacement roller pair for sliding doors and large sliding windows.'
  },
  {
    id: 'p8', cat: 'hardware', name: 'Door handle set, matte black', sku: 'HW-0230', img: '',
    tags: ['new'], weight: '0.6 kg', unit: 'per set', vlabel: '',
    variants: [{ name: 'Standard', retail: 24, whole: 19 }],
    specs: [['Spindle', '8 mm'], ['Finish', 'Matte black powder coat'], ['Includes', 'Screws and rosettes']],
    desc: 'Lever handle set for aluminum hinged doors, with handles for both sides.'
  },
  {
    id: 'p9', cat: 'accessories', name: 'Silicone sealant, clear 300 ml', sku: 'AC-0300', img: '',
    tags: ['best'], weight: '0.35 kg', unit: 'per tube', vlabel: '',
    variants: [{ name: 'Standard', retail: 6, whole: 4.75 }],
    specs: [['Type', 'Neutral cure'], ['Colour', 'Clear'], ['Volume', '300 ml']],
    desc: 'Weatherproof sealant for glazing and frame joints, safe on aluminum.'
  },
  {
    id: 'p10', cat: 'accessories', name: 'Corner cleats for 45 mm frame (10 pcs)', sku: 'AC-0045', img: '',
    tags: [], weight: '0.5 kg', unit: 'per pack', vlabel: '',
    variants: [{ name: 'Standard', retail: 9, whole: 7 }],
    specs: [['Fits', 'Casement window frame 45 mm'], ['Quantity', '10 pieces']],
    desc: 'Crimping corner cleats for strong, square frame corners.'
  }
];

const FILTERS = [
  { id: 'all', label: 'All products' },
  { id: 'best', label: 'Best sellers' },
  { id: 'top', label: 'Top rated' },
  { id: 'new', label: 'New' }
];

// Screens that sign-in returns to afterwards.
const RETURNABLE_SCREENS = ['cart', 'checkout', 'product', 'category', 'search', 'orders'];

const SAMPLE_PAST_ORDER = { num: '#1038', date: 'Oct 21, 2026', items: '6 items', total: '$412.50', status: 'Delivered' };

function store() {
  return {
    cats: CATEGORIES,
    products: PRODUCTS,
    filters: FILTERS,

    screen: 'home',
    catId: 'profiles',
    prodId: 'p1',
    variant: 0,
    photo: 0,
    qty: 1,
    cart: [],
    signedIn: false,
    menuOpen: false,
    query: '',
    term: '',
    filter: 'all',
    authTab: 'login',
    returnTo: 'home',
    delivery: 'delivery',
    payment: 'cod',
    orders: [],
    lastOrder: '',
    toast: '',

    money,
    tagLabel,

    // ----- Lookups -----
    catOf(id) { return this.cats.find((c) => c.id === id); },
    prodOf(id) { return this.products.find((p) => p.id === id); },
    countIn(catId) {
      const n = this.products.filter((p) => p.cat === catId).length;
      return n + (n === 1 ? ' product' : ' products');
    },
    hasVariants(p) { return p.variants.length > 1; },
    unitPrice(v) { return this.signedIn ? v.whole : v.retail; },
    cardPrice(p) {
      const lowest = Math.min(...p.variants.map((v) => this.unitPrice(v)));
      return (this.hasVariants(p) ? 'From ' : '') + money(lowest);
    },
    cardRetail(p) { return money(Math.min(...p.variants.map((v) => v.retail))); },

    // ----- Navigation -----
    go(screen, extra = {}) {
      Object.assign(this, { screen, toast: '', menuOpen: false }, extra);
      window.scrollTo({ top: 0 });
    },
    goHome() { this.go('home', { filter: 'all' }); },
    openCategory(id) { this.go('category', { catId: id }); },
    openProduct(id, variantIndex = 0) { this.go('product', { prodId: id, variant: variantIndex, photo: 0, qty: 1 }); },
    goSignin(tab) {
      const back = RETURNABLE_SCREENS.includes(this.screen) ? this.screen : 'home';
      this.go('signin', { authTab: tab, returnTo: back });
    },
    doSearch() { this.go('search', { term: this.query.trim() }); },

    // ----- Product lists -----
    get isGridScreen() { return ['home', 'category', 'search'].includes(this.screen); },
    get gridProducts() {
      if (this.screen === 'home') {
        return this.filter === 'all' ? this.products : this.products.filter((p) => p.tags.includes(this.filter));
      }
      if (this.screen === 'category') return this.products.filter((p) => p.cat === this.catId);
      if (this.screen === 'search') {
        const t = this.term.toLowerCase();
        return this.products.filter((p) => (p.name + ' ' + this.catOf(p.cat).name + ' ' + p.sku).toLowerCase().includes(t));
      }
      return [];
    },
    get searchSummary() {
      const n = this.gridProducts.length;
      return n + (n === 1 ? ' product matches' : ' products match') + ' "' + this.term + '"';
    },
    get cat() { return this.catOf(this.catId); },

    // ----- Product page -----
    get prod() { return this.prodOf(this.prodId); },
    get variantIndex() { return Math.min(this.variant, this.prod.variants.length - 1); },
    get pv() { return this.prod.variants[this.variantIndex]; },
    get showMainImage() { return !!this.prod.img && this.photo === 0; },

    // ----- Cart -----
    addToCart(pid, variantIndex, quantity) {
      const line = this.cart.find((l) => l.pid === pid && l.vi === variantIndex);
      if (line) line.qty += quantity;
      else this.cart.push({ pid, vi: variantIndex, qty: quantity });
      const p = this.prodOf(pid);
      const option = this.hasVariants(p) ? ' (' + p.variants[variantIndex].name + ')' : '';
      this.toast = quantity + ' × ' + p.name + option + ' added to your cart.';
    },
    setQty(index, quantity) {
      if (quantity <= 0) this.cart.splice(index, 1);
      else this.cart[index].qty = quantity;
    },
    get cartLines() {
      return this.cart.map((l) => {
        const p = this.prodOf(l.pid);
        const v = p.variants[l.vi];
        const unit = this.unitPrice(v);
        return {
          key: l.pid + '-' + l.vi, pid: l.pid, vi: l.vi, name: p.name, img: p.img, qty: l.qty,
          variantText: this.hasVariants(p) ? p.vlabel + ': ' + v.name : '',
          unit: money(unit), total: money(unit * l.qty)
        };
      });
    },
    get cartCount() { return this.cart.reduce((n, l) => n + l.qty, 0); },
    get retailTotal() { return this.cart.reduce((n, l) => n + this.prodOf(l.pid).variants[l.vi].retail * l.qty, 0); },
    get wholesaleTotal() { return this.cart.reduce((n, l) => n + this.prodOf(l.pid).variants[l.vi].whole * l.qty, 0); },
    get total() { return this.signedIn ? this.wholesaleTotal : this.retailTotal; },
    get savings() { return this.retailTotal - this.wholesaleTotal; },

    // ----- Account -----
    signIn() {
      this.signedIn = true;
      this.go(this.returnTo || 'home');
    },
    signOut() {
      this.signedIn = false;
      this.goHome();
    },
    submitApplication() { this.go('applied'); },

    // ----- Orders -----
    placeOrder() {
      if (this.cart.length === 0) { this.go('cart'); return; }
      const num = '#' + (1043 + this.orders.length);
      const n = this.cartCount;
      this.orders.unshift({ num, date: 'Today', items: n === 1 ? '1 item' : n + ' items', total: money(this.total), status: 'Received' });
      this.cart = [];
      this.lastOrder = num;
      this.go('done');
    },
    get orderList() { return this.signedIn ? this.orders.concat([SAMPLE_PAST_ORDER]) : this.orders; }
  };
}
