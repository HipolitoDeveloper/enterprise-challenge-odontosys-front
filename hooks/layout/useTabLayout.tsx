import {useRouter} from "next/router";
import React, {createContext, useContext, useState} from "react";
import {HStack, useMediaQuery} from "@chakra-ui/react";
import Aside from "../../components/menus/aside/Aside";
import Modal, {TModal} from "../../components/modal";
import Loading from "../../components/layouts/Loading";
import {labelConversor, Pages, routesGroup} from "../../common/MenuItems";
import {useTabs} from "./useTabs";
import DynamicPage from "../../components/layouts/DynamicPage";

export interface ICurrentPage {
    page: Pages | string;
    params?: any | undefined | null;
}


interface Props {
    config?: any;
    treePath?: any;
    children: any;
}

interface ITabLayoutContext {
    handleModal(modal: TModal): void;

    changeNavSize(size: 'large' | 'small' | 'none'): void;

    handleLoading(loading: boolean): void;

    handleCurrentPage(page: Pages | string, params?: any, addNewTab?: boolean): void;

    currentPage: ICurrentPage;
    modal: TModal;
    navSize: 'large' | 'small' | 'none';
    isMobile: boolean
}

const TabLayoutContext = createContext({} as ITabLayoutContext);

const TabLayoutProvider = ({children}: Props) => {
    const {currentTab, handleCurrentTab, addTab} = useTabs()
    const router = useRouter();

    const [navSize, setNavSize] = useState<'large' | 'small' | 'none'>("small")
    const [currentPage, setCurrentPage] = useState<ICurrentPage>(
        {page: JSON.parse(localStorage.getItem(`tab${currentTab.index}`) as string).page ?? Pages.Dashboard})

    const [isMobile] = useMediaQuery("(max-width: 600px)")
    // const showNav = ShowNavPages.some(({route}: IMenuItem) => route === router.pathname);

    const [modal, setModal] = useState<TModal>({
        visible: false,
        title: "Atenção",
        text: "",
        onOk: () => {
        },
        okTitle: "",
        onClose: () => {
        },
        cancelTitle: "",
        variant: "alert",

    });

    const [loading, setLoading] = useState<boolean>(false)

    const handleModal = (modal: TModal) => {
        console.log("modal", modal)
        setModal(
            {
                ...modal
            }
        )
    }

    const clearModal = () => {
        setModal({
            visible: false,
            title: "Atenção",
            text: "",
            onOk: () => {
            },
            okTitle: "",
            onClose: () => {
            },
            cancelTitle: "",
            variant: "alert"
        })
    }



    const handleLoading = (loading: boolean) => {
        setLoading(loading)
    }

    const changeNavSize = (size: 'large' | 'small') => {
        setNavSize(size)
    }

    const handleCurrentPage = (page: Pages, params?: any, addNewTab: boolean = true) => {
        const tabsQuantity = parseInt(localStorage.getItem(`openedTabsQuantity`) as string)
        const convertedLabel = labelConversor(page)
        let alreadyHasTab = {index: -1, label: ''}
        const currentGroup = routesGroup.find(route => route.slug === page)?.group

        for (let i = 0; i < tabsQuantity; i++) {
            const tab = JSON.parse(localStorage.getItem(`tab${i}`) as string)

            if (tab.page === page || tab.group === currentGroup) {
                alreadyHasTab = {index: i, label: convertedLabel};
            }
        }

        if (alreadyHasTab.index !== -1) {
            handleCurrentTab(alreadyHasTab)
            setCurrentPage({
                page,
                params
            })
            localStorage.setItem(`tab${currentTab.index}`, JSON.stringify({page: page, group: currentGroup}))

        } else {
            setCurrentPage({
                page,
                params
            })

            if(addNewTab) {
                addTab({
                    tab: {
                        label: page
                    },
                    panel: {
                        component: (
                            <TabLayoutProvider>
                                <DynamicPage initialPage={page}/>
                            </TabLayoutProvider>
                        )
                    }
                })
            } else {
                localStorage.setItem(`tab${currentTab.index}`, JSON.stringify({page: page, group: currentGroup}))
            }

        }

        // if(params) {
        //     Object.keys(params).forEach(param => {
        //         router.push(`/ergus?${page}${param}=${params[param]}`)
        //
        //     })//TODO: CARREGAR O PARAM no refresh dO HANDLE CURRENTPAGE
        // }

    }


    const contextValues = {
        handleModal,
        clearModal,
        handleLoading,
        changeNavSize,
        handleCurrentPage,
        currentPage,
        modal,
        navSize,
        isMobile
    };

    return (
        <TabLayoutContext.Provider value={contextValues}>
            <Modal
                {...modal}
                onOk={() => {
                    modal.onOk();
                    setModal({...modal, visible: false})
                }}
                onClose={() => {
                    modal.onClose();
                    setModal({...modal, visible: false})
                }}
            />
            <Loading loading={loading}/>

            <HStack w='100%' h='100%'
                    float='right'>

                {navSize !== 'none' && !isMobile &&  (
                    <Aside navSize={navSize} changeNavSize={changeNavSize}/>

                )}

                {children}
            </HStack>
        </TabLayoutContext.Provider>
    );
};

const useTabLayout = () => {
    const context = useContext(TabLayoutContext);


    return context;
};


export {useTabLayout, TabLayoutProvider};

