import Link from "next/link";
import styles from './Breadcrumbs.module.sass';

interface Breadcrumb {
  link: string;
  text: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <section className={styles['breadcrumbs-container']}>
      <ul>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.link}>
            <Link href={breadcrumb.link}>
              <a>{breadcrumb.text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Breadcrumbs;
