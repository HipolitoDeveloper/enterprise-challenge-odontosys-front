import React, {createContext, useContext, useEffect, useState} from "react";
import {ITabsChildren} from "../../components/menus/tabs/Tabs";
import DynamicPage from "../../components/layouts/DynamicPage";
import {labelConversor, Pages, routesGroup} from "../../common/MenuItems";
import {TabLayoutProvider} from "./useTabLayout";


interface Props {
    config?: any;
    treePath?: any;
    children: any;
}

interface ICurrentTab {
    index: number;
    label: Pages | string;
}

interface ILayoutContext {
    addTab(newTab?: ITabsChildren): void;

    handleCurrentTab(currentTab: ICurrentTab): void;

    deleteTab(index: number): void;

    setCurrentTab(state: ICurrentTab): void;

    currentTab: ICurrentTab;
    tabsChildren: ITabsChildren[];
}

const TabContext = createContext({} as ILayoutContext);

const TabsProvider = ({children}: Props) => {
    const [tabsChildren, setTabsChildren] = useState<ITabsChildren[]>([])
    const [currentTab, setCurrentTab] = useState<ICurrentTab>({
        index: 0,
        label: 'Dashboard'
    })

    useEffect(() => {
        const tabsQuantity = parseInt(localStorage.getItem(`openedTabsQuantity`) as string)

        if (isNaN(tabsQuantity) || tabsQuantity === 0) {
            addTab()
        } else {
            for (let i = 0; i < tabsQuantity; i++) {
                addTab({
                    tab: {
                        label: JSON.parse(localStorage.getItem(`tab${i}`) as string).page
                    },
                    panel: {
                        component: (
                            <TabLayoutProvider>
                                <DynamicPage/>
                            </TabLayoutProvider>
                        )
                    }
                })
            }
        }

    }, [])

    const addTab = (newTab?: ITabsChildren) => {
        const label = newTab ? newTab?.tab?.label : Pages.Dashboard
        const tabChildren: ITabsChildren = newTab
            ? {...newTab, tab: {label: labelConversor(newTab?.tab?.label as Pages)}}
            : {
                tab: {
                    label:  labelConversor(Pages.Dashboard)
                },
                panel: {
                    component: (
                        <TabLayoutProvider>
                            <DynamicPage/>
                        </TabLayoutProvider>
                    )
                }
            }


        setTabsChildren(prevState => {
            const newState = [...prevState, {...tabChildren}]
            const currentGroup = routesGroup.find(route => route.slug === label)?.group
            localStorage.setItem("openedTabsQuantity", newState.length as unknown as string)
            localStorage.setItem(`tab${newState.length - 1}`, JSON.stringify({page: label, group: currentGroup}))
            setCurrentTab({index: newState.length - 1, label})
            return newState

        })

    }

    const deleteTab = (index: number) => {
        if (tabsChildren.length !== 1) {
            setTabsChildren(prevState => {
                const state = prevState.filter((_, i) => i !== index)
                setCurrentTab({index: state.length - 1, label: tabsChildren[index === 0 ? index + 1 :index - 1].tab.label})
                localStorage.setItem("openedTabsQuantity", state.length as unknown as string)

                const lastTab =  JSON.parse(localStorage.getItem(`tab${state.length}`) as string)

                localStorage.removeItem(`tab${state.length}`)
                localStorage.setItem(`tab${index}`, JSON.stringify(lastTab as string))

                return state
            })
        }
    }

    const handleCurrentTab = (currentTab: ICurrentTab) => {
        setTabsChildren(tabsChildren.map(({tab, ...children}, index) => {
            let newTab = {
                ...children, tab
            }

            if (index === currentTab.index) {
                newTab = {
                    ...children,
                    tab: {
                        label: currentTab.label
                    }
                }
            }

            return newTab
        }))

        setCurrentTab(currentTab)

    }

    const contextValues = {
        addTab,
        deleteTab,
        handleCurrentTab,
        setCurrentTab,
        currentTab,
        tabsChildren
    };

    return (
        <TabContext.Provider value={contextValues}>
            {children}
        </TabContext.Provider>
    )
        ;
};

const useTabs = () => {
    const context = useContext(TabContext);
    return context;
};


export default TabsProvider;

export {useTabs}
