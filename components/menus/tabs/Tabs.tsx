import React, {useEffect} from "react";
import {Box, Flex, TabPanel, TabPanels, Tabs as TabsC} from "@chakra-ui/react";
import {IPanel} from "../../../interfaces/IPanel";
import {ITab} from "../../../interfaces/ITab";
import {useTabs} from "../../../hooks/layout/useTabs";

export interface ITabsChildren {
    panel: IPanel;
    tab: ITab
}


const Tabs: React.FC = ({children}) => {
    const {tabsChildren, currentTab, setCurrentTab} = useTabs()

    useEffect(() => {
        setCurrentTab({
            index: 0,
            label: 'Dashboard'
        })
    }, [])


    return (
        <TabsC h='100%' w='100%' isLazy index={currentTab.index}>
            <TabPanels h='100%' w='100%'>
                {tabsChildren.map(({panel}, index) => (
                    <TabPanel p={0} key={index} h='100%' w='100%'>
                        {panel.component}
                    </TabPanel>


                ))}

            </TabPanels>
        </TabsC>
    )
}

export default Tabs
