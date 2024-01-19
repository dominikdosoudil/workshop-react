import { articleDetailRoute } from "../main.tsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { API_HOST } from "../constants.ts";

export const Article = () => {
  const { articleId } = articleDetailRoute.useParams();

  const article = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const response = await fetch(`${API_HOST}/articles/${articleId}`);
      return await response.json();
    },
    retry: 0,
  });

  if (article.isLoading) {
    return <div>Loading article...</div>;
  }

  if (article.isError) {
    return <div>Article could not be loaded due to error.</div>;
  }

  const articleContent = article.data;

  return (
    <div>
      <h1>{articleContent.item_name}</h1>
      <p>{articleContent.content}</p>
    </div>
  );
};
