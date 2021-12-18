import Header from "../Header";
import styles from './Layout.module.sass';

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className={styles['main-container']}>{children}</main>
    </>
  );
};

export default Layout;
