import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { fetchItemDetail } from "../../api/items";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductDetail from "../../components/ProductDetail";

const ItemDetail: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{data.item.title} | Mercado Libre</title>
        <meta name="description" content={data.item.description} />
      </Head>

      {/*
          Categories data is not obtained in the required format to create Breadcrumbs.
          Therefore we use these placeholder breadcrumbs just for the sake of visualize.
        */}
      <Breadcrumbs
        breadcrumbs={[
          { link: "", text: "Electronica, Audio y Video" },
          { link: "a", text: "iPod" },
          { link: "b", text: "Reproductores" },
          { link: "c", text: "iPod touch" },
          { link: "d", text: "32 GB" },
        ]}
      />

      <ProductDetail product={data.item} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemId = context.params?.id;

  if (typeof itemId !== "string") {
    return {
      notFound: true,
    };
  }

  const response = await fetchItemDetail(itemId);

  return { props: { data: response } };
};

export default ItemDetail;
