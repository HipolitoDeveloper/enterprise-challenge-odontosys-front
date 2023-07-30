import * as IconIO from "react-icons/io5";


export const renderIcon = (icon: "IoNewspaper" | "IoPodium" | "IoReceipt" | "IoStatsChart") => {
    const icons = {
        "IoNewspaper": <IconIO.IoNewspaper size={35} color="inherit"/>,
        "IoPodium":  <IconIO.IoPodium size={35} color="inherit"/>,
        "IoReceipt":  <IconIO.IoReceipt size={35} color="inherit"/>,
        "IoStatsChart": <IconIO.IoStatsChart size={35} color="inherit"/>,
    }

    return icons[icon] || icons["IoNewspaper"]

}
