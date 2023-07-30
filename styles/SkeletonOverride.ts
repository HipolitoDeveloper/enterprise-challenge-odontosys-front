import { keyframes } from "@chakra-ui/system"
import {getColor, mode, SystemStyleFunction} from "@chakra-ui/theme-tools";

const fade = (startColor: string, endColor: string) =>
    keyframes({
        from: { borderColor: startColor, background: startColor },
        to: { borderColor: endColor, background: endColor },
    })

const baseStyle: SystemStyleFunction = (props) => {
    const defaultStartColor = mode("gray.100", "gray.800")(props)
    const defaultEndColor = mode("gray.400", "gray.600")(props)

    const {
        startColor = defaultStartColor,
        endColor = defaultEndColor,
        speed,
        theme,
    } = props

    const start = getColor(theme, startColor)
    const end = getColor(theme, endColor)

    return {
        opacity: 0.7,
        borderRadius: "2px",
        borderColor: 'gray.100',
        background: 'gray.400',
        animation: `0.5s linear infinite alternate ${fade('lightGray', 'darkGray')}`,
    }
}

export const SkeletonOverride = {
    baseStyle: baseStyle
}
