import { ItemDetail } from "@meli/backend/src/types/item";
import Image from "next/image";
import styles from "./ProductDetail.module.sass";

interface ProductDetailProps {
  product: ItemDetail;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className={styles["product-detail-container"]}>
      <div className={styles["top-content"]}>
        <Image src={product.picture} alt="Imagen del producto" width={680} height={680} />

        <section>
          <div>
            <span>{product.condition}</span>-<span>{product.sold_quantity} vendidos</span>
          </div>

          <h1>{product.title}</h1>
          <strong>{product.price.amount}</strong>

          <button>Comprar</button>
        </section>
      </div>

      <section className={styles['description']}>
        <h2>Descripción del producto</h2>

        <p>{product.description}</p>
      </section>
    </div>
  );
};

export default ProductDetail;
