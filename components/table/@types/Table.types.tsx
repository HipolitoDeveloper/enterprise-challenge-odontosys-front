export interface IColumn {
    Header: any,
    accessor: string,
    width?: string,
    formatter?: string,
    convert?: {
        enum: 'ADVERTISEMENT'
    }
}

export interface IAction {
    edit(rowData: any):any
    delete(rowData: any):any
}
