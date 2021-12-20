import { ItemDetail } from "@meli/backend/src/types/item";
import Image from "next/image";
import formatPrice from "../../utils/price-formatter";
import styles from "./ProductDetail.module.sass";

interface ProductDetailProps {
  product: ItemDetail;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className={styles["product-detail-container"]}>
      <div className={styles["top-content"]}>
        <Image
          src={product.picture}
          alt="Imagen del producto"
          width={680}
          height={680}
          objectFit="contain"
        />

        <section>
          <div data-testid="statusDescriptor">
            <span>{product.condition}</span>&nbsp;-&nbsp;
            <span>{product.sold_quantity} vendidos</span>
          </div>

          <h1>{product.title}</h1>
          <div className={styles["price-container"]} data-testid="priceContainer">
            <span className="price">{formatPrice(product.price)}</span>
            <span className="price-decimals">
              {product.price.decimals.toString().padStart(2, "0")}
            </span>
          </div>

          <button className={styles["buy-button"]}>Comprar</button>
        </section>
      </div>

      <section className={styles["description"]}>
        <h2>Descripción del producto</h2>

        <p>{product.description}</p>
      </section>
    </div>
  );
};

export default ProductDetail;
