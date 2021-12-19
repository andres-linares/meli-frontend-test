import Image from "next/image";
import Link from "next/link";
import styles from "./Product.module.sass";
import { Item } from "@meli/backend/src/types/item";
import IconShipping from "../../public/icons/icon-shipping.png";
import formatPrice from "../../utils/price-formatter";

interface ProductProps {
  product: Item;
}

const Product = ({ product }: ProductProps) => {
  return (
    <li className={styles.product}>
      <Link href={`/items/${product.id}`}>
        <a>
          <Image
            className={styles["product-image"]}
            src={product.picture}
            height={180}
            width={180}
            alt="Imagen del producto"
            objectFit="cover"
          />

          <div className={styles.content}>
            <div className={styles["price-container"]}>
              <strong aria-label="Precio del producto">{formatPrice(product.price)}</strong>

              {product.free_shipping && <Image src={IconShipping} alt="Envio gratis" />}
            </div>

            <h6 className={styles["title"]}>{product.title}</h6>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Product;
