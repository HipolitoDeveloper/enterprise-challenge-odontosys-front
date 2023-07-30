import {AxiosResponse} from "axios";
import {useQuery} from "react-query";
import {queryClient} from "../../services/QueryClient";

export const useGenericQuery = (
    queryKey: any,
    queryFn: (data: any) => Promise<any[]>,
    options?: any
) => {
    return useQuery(queryKey, queryFn, {
        ...options,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, data)
        },
        // onSettled: async () => {
        //     await queryClient.invalidateQueries(queryKey)
        // }
    })
}
