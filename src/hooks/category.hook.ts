import axios, { AxiosError } from "axios";
import useSWR from "swr";

interface CategoryResponse {
  _id: string;
  name: string;
}

interface UseCategoryReturn {
  data: CategoryResponse[] | null;
  error: AxiosError | undefined;
  isLoading: boolean;
  revalidate: () => void;
}

export const useCategories = (): UseCategoryReturn => {
  const fetcher = async (url: string): Promise<CategoryResponse[]> => {
    const response = await axios.get(url);
    return response.data;
  };

  const { data, error, isValidating, mutate } = useSWR<CategoryResponse[]>(
    "http://localhost:5000/api/v1/category",
    fetcher
  );

  const isLoading = isValidating;

  return {
    data: data || null,
    error: error as AxiosError | undefined,
    isLoading,
    revalidate: () => mutate(),
  };
};
