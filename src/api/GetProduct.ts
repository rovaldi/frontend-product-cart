import { useQuery, gql } from "@apollo/client";

export const QUERY = gql`
  query GetProducts {
    allProducts {
      id
      name
      power
      description
      price
      quantity
      brand
      weight
      height
      width
      length
      model_code
      colour
      img_url
    }
  }
`;
const useGetProducts = () => {
  const { loading, error, data } = useQuery(QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data?.allProducts || [],
  };
};

export default useGetProducts;
