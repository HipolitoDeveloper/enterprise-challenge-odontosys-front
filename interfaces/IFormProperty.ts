import { ISelect } from "./ISelect";

export interface IFormProperty {
    name: string;
    placeholder?: any;
    label?: any;
    colSpan?: number;
    order?: number;
    fieldType?: 'input' | 'select' | 'switch' | 'date' | 'image' | 'checkbox';
    type?: any;
    options?: ISelect[];
    query?: any;
    needsToShow?: boolean;
    defaultValue?: any;
    width?: string;
    readOnly?: boolean;


}
