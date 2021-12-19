import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "./Header.module.sass";
import SearchForm from "./SearchForm";
import Logo from "../../public/icons/logo.png";

const Header = () => {
  const router = useRouter();

  const onSubmitSearch = (query: string) => {
    router.push(`/items?search=${query}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>
        <Link href="/">
          <a title="Ir al inicio">
            <span className="sr-only">Ir al inicio</span>
            <Image src={Logo} alt="MercadoLibre Logo" />
          </a>
        </Link>

        <SearchForm
          onSubmit={onSubmitSearch}
          placeholder="Nunca dejes de buscar"
          initialValue={router.query.search?.toString()}
        />
      </div>
    </header>
  );
};

export default Header;
