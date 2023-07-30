import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IHttpResponse, ISession } from '../../interfaces';
import { queryClient } from "../../services/QueryClient";

export const useGenericMutation = (
  func: (data: any) => Promise<any>,
  urlQuery: string,
  // params?: object,
  updater?: ((oldData: any, newData: any) => {}) | undefined
) => {

 return  useMutation(func, {
    onError: (err, _, context) => {
        console.error("mutatioNError", err)
        console.error("mutatioNError", context)
        console.error("mutatioNError", _)
      // queryClient.setQueryData([urlQuery!, params], context);
    },

    onSettled: async (data) => {
        if(data) {
            const {data: responseData} = data
            await queryClient.cancelQueries([urlQuery!]);
            await queryClient.invalidateQueries([urlQuery!]);
            queryClient.setQueryData(urlQuery!, (oldData) => {
                if(oldData && updater) {
                    return updater(oldData!, responseData);
                } else {
                    return []
                }

            });
        }

    },

  });
};


export const useAuthMutation = (
  func: (data: any) => Promise<AxiosResponse>,
  urlQuery: string,
) => {

 return  useMutation(func, {
  onSuccess: async (data) => {
      queryClient.setQueryData(urlQuery!, (oldData) => {
        const response: IHttpResponse| any = data.data;
        const {
          token,
          codigo,
          nome,
          codigoPerfil,
          avatar,
          codigoEmpresa
        } = JSON.parse(response.applicationResponse) as ISession;

        return {
          token,
          codigo,
          nome,
          codigoPerfil,
          avatar,
          codigoEmpresa
        };
      });
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      console.log("context", context)
      // queryClient.setQueryData(urlQuery!, context);
    },

  });
};



