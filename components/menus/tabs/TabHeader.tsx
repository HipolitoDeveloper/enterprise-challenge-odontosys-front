import React, {useEffect} from "react";
import {Box, Flex} from "@chakra-ui/react";
import {useTabs} from "../../../hooks/layout/useTabs";
import Button from "../../Button";
import TabButton from "./TabButton";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import * as IconFA from "react-icons/fa";

// export interface TabsProps extends Omit<TabsCProps, 'children'> {
//     onAdd(): void;
//
//     onDelete(): void;
//
//     panels: IPanel[];
//     tabs: ITab[];
// }


const TabHeader: React.FC = () => {
    const {tabsChildren, addTab, setCurrentTab, currentTab, deleteTab} = useTabs()
    const {currentPage} = useTabLayout()

    useEffect(() => {
    }, [])

    return (
        <Flex>
            {tabsChildren.map(({tab}, index) => (
                <TabButton
                    active={index === currentTab.index}
                    index={index}
                    key={index} onClick={() => setCurrentTab({
                    index: index,
                    label: currentPage.page
                })}>
                        {tab.label}
                </TabButton>
            ))}
            <Box h='30px' ml='-1px'>
                <Button style={{borderRadius: '0 0px 20px 0'}} variant='blank_light' onClick={() => addTab()} h='30px'>
                    <IconFA.FaPlus size={15} color='white'/>

                </Button>
            </Box>
        </Flex>
    )
}

export default TabHeader
