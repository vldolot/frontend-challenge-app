export default function numberWithCommas(num: string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
