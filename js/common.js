/* Shared helpers for the store and the admin panel. */

const TAG_LABELS = { best: 'Best seller', top: 'Top rated', new: 'New' };

function money(amount) {
  return '$' + Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function tagLabel(tag) {
  return TAG_LABELS[tag] || tag;
}
