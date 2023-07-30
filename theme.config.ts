import {extendTheme} from "@chakra-ui/react";
import {ButtonOverride} from "./styles/ButtonOverride";
import {InputOverride} from "./styles/InputOverride";
import {TextOverride} from "./styles/TextOverride";
import {DrawerOverride} from "./styles/DrawerOverride";
import {SelectOverride} from "./styles/SelectOverride";
import {TableOverride} from "./styles/TableOverride";
import {SpinnerOverride} from "./styles/SpinnerOverride";
import {CheckboxOverride} from "./styles/CheckboxOverride";
import {SkeletonOverride} from "./styles/SkeletonOverride";

export const Colors = {
    white: "white",
    black: "black",
    bg: "#42CACF",
    bgLight: "#83BDE4",
    blueLight: "#e6edf3",
    gray: "#C4C4C4",
    lightGray: "#f1f1f1",
    darkBrown: '#171717',
    lightBlue: "#E4F0F9",
    brown: '#202020',
    mediumGray: '#B8C1CC',
    darkGray: '#767676',
    modalBackground: 'rgba(0, 0, 0, 0.50)',
    primary: '#54d959',
    lightGreen: '#a3eaa6',
    darkGreen: '#219726',
    secondary: '#101417',
    redPastel: '#E86363',
    transparent: 'transparent',
    background: '#F5F7F8',
    overlay: '#5B5B5B',
    blue: '#3490FA',
    yellow: '#FDB803',
    debug1: '#0220ff',
    debug2: '#ff8001',
    debug3: '#ff0000',
    debug4: '#0ef702',
    debug5: '#9d06e8',
    debug6: '#e806af',
    avatar: '#3490FA',
}

export const Components = {
    Button: ButtonOverride,
    Input: InputOverride,
    Text: TextOverride,
    Checkbox: CheckboxOverride,
    Drawer: DrawerOverride,
    Select: SelectOverride,
    Table: TableOverride,
    Spinner: SpinnerOverride

}

export const Fonts = {
    heading: 'Montserrat-Bold',
    body: 'Montserrat',
}

export const Styles = {
    global: {
        body: {
            fontFamily: "Montserrat"
        }
    }
}

export const Breakpoints = {
    fb: '0px',
    sm: "380px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
}

export const theme = extendTheme({
    styles: Styles,
    fonts: Fonts,
    colors: Colors,
    breakpoints: Breakpoints,
    components: {
        Button: ButtonOverride,
        Input: InputOverride,
        Text: TextOverride,
        Checkbox: CheckboxOverride,
        Drawer: DrawerOverride,
        Table: TableOverride,
        Spinner: SpinnerOverride,
        Select: SelectOverride,
        Skeleton: SkeletonOverride
    }
})

