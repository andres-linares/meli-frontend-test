import { Price } from "@meli/backend/src/types/item";

const formatPrice = (price: Price): string => {
  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatter = new Intl.NumberFormat("es-AR", formatOptions);

  return formatter.format(price.amount);
};

export default formatPrice;
