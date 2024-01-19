import { articleDetailRoute } from "../main.tsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export const Article = () => {
  const { articleId } = articleDetailRoute.useParams();

  const article = useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const response = await fetch(`http://litshare.cz/articles/${articleId}`);
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
