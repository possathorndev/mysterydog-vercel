import { Address } from '@/lib/api/utils/common';

export const formatAddressToString = (obj: Address) => {
  if (!obj) return '-';

  return [obj.address1, obj.address2, obj.subDistrict, obj.district, obj.city, obj.country, obj.postcode]
    .filter(Boolean)
    .join(', ');
};
