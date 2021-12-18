import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

import styles from './Header.module.sass';
import SearchForm from "./SearchForm";

const Header = () => {
  const router = useRouter();

  const onSubmitSearch = (query: string) => {
    router.push(`/items?search=${query}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <Link href="/">
          <a>
            <Image src="/icons/Logo_ML.png" alt="MercadoLibre Logo" width={53} height={36} />
          </a>
        </Link>

        <SearchForm onSubmit={onSubmitSearch}/>
      </div>
    </header>
  );
};

export default Header;
