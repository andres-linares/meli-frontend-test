import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { fetchItems } from "../../api/items";
import Breadcrumbs from "../../components/Breadcrumbs";
import Product from "../../components/Product";

/**
 * Search results are obtained in Server Side
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { search } = query;

  if (!search || typeof search !== "string") {
    return { redirect: { destination: "/", permanent: true } };
  }

  const data = await fetchItems(search);

  return { props: { data } };
};

const Items: NextPage = ({
  data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{ router.query.search } | Mercado Libre</title>
      </Head>

      {
        /*
          Categories data is not obtained in the required format to create Breadcrumbs.
          Therefore we use these placeholder breadcrumbs just for the sake of visualize.
        */
       }
      <Breadcrumbs
        breadcrumbs={[
          { link: "", text: "Electronica, Audio y Video" },
          { link: "a", text: "iPod" },
          { link: "b", text: "Reproductores" },
          { link: "c", text: "iPod touch" },
          { link: "d", text: "32 GB" },
        ]}
      />

      <ul>
        {data.items && data.items.map((item: any) => <Product key={item.id} product={item} />)}
      </ul>
    </>
  );
};

export default Items;
