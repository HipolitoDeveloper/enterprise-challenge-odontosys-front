import { useQueryClient } from "react-query";

export const usePrefetch = (url: string | null, params?: object, queryFn: any = () => {}) => {
    const queryClient = useQueryClient();
   
    return () => {
      if (!url) {
        return;
      }
   
      queryClient.prefetchQuery(
        [url!, params],
        queryFn
      );
    };
   };