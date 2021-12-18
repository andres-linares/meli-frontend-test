import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.sass';
import SearchForm from "./SearchForm";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/Logo_ML.png" alt="MercadoLibre Logo" width={106} height={72} />
      </Link>

      <SearchForm />
    </header>
  );
};

export default Header;
