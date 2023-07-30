export interface IError {
    config: any,
    data: {
        mensagens: string[];
        retorno: {erros: string[]}
        sucesso: boolean
    }
    headers: any;
    request: any;
    status: number;
    statusText: string;
}
