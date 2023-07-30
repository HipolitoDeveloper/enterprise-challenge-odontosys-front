import {Pages} from "../common/MenuItems";

export interface IMenuItem {
    name: string,
    route: Pages,
    type: 'multiple' | 'unique',
    items: IMenuItem[],
    icon?: string | any
}
