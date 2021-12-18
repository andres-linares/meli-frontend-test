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
      <Link href="/">
        <Image src="/Logo_ML.png" alt="MercadoLibre Logo" width={106} height={72} />
      </Link>

      <SearchForm onSubmit={onSubmitSearch}/>
    </header>
  );
};

export default Header;
