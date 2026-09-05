// One formatter, created once. Intl.NumberFormat is expensive to construct,
// so you don't want it rebuilt inside a render loop.
const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPence(pence: number): string {
  return gbp.format(pence / 100);
}
