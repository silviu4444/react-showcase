export function removeCountryFromAddress(address: string, country: string): string {
  const escapedCountry = country.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`,?\\s*${escapedCountry}$`);
  return address.replace(regex, '');
}