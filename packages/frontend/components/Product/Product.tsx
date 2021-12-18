import Image from "next/image";
import Link from "next/link";
import styles from "./Product.module.sass";

const Product = ({ product }) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: product.price.currency,
  });
  const formattedPrice = formatter.format(product.price.amount);

  return (
    <li className={styles.product}>
      <Link href={`/items/${product.id}`}>
        <a>
          <Image src={product.picture} height={180} width={180} alt="" />

          <div className={styles.content}>
            <div className={styles['price-container']}>
              <strong>{formattedPrice}</strong>
              {product.free_shipping && (
                <Image src="/icons/ic_shipping.png" height={10} width={10} alt="Envio gratis" />
              )}
            </div>

            <h6 className={styles['title']}>{product.title}</h6>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Product;
