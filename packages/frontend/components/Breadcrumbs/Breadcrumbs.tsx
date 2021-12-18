import Link from "next/link";

interface Breadcrumb {
  link: string;
  text: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <section>
      <ul>
        {breadcrumbs.map((breadcrumb) => {
          <li>
            <Link href={breadcrumb.link}>
              <a>{breadcrumb.text}</a>
            </Link>
          </li>;
        })}
      </ul>
    </section>
  );
};

export default Breadcrumbs;
