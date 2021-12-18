import Image from "next/image";
import styles from "./Product.module.sass";

const Product = ({ product }) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: product.price.currency,
  });
  const formattedPrice = formatter.format(product.price.amount);

  return (
    <li className={styles.product}>
      <Image src={product.picture} height={180} width={180} alt="" />

      <div className="{styles['product__content']}">
        <div>
          <strong>{formattedPrice}</strong>
          {product.free_shipping && (
            <Image src="/icons/ic_shipping.png" height={10} width={10} alt="Envio gratis" />
          )}
        </div>

        <h6>{product.title}</h6>
      </div>
    </li>
  );
};

export default Product;
