import {Box, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import type {NextPage} from "next";
import {useTranslation} from "next-i18next";
import React, {useEffect, useState} from "react";
import Checkbox from "../../components/form/Checkbox";
import Input from "../../components/form/Input";
import {useRouter} from "next/router";
import {signIn} from 'next-auth/react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "../../components/Button";
import {useLayout} from "../../hooks/layout/useLayout";
import userSchema from "./login.schema";

const defaultValues = {
    login: "progettata",
    password: "123mudar"
}

export const LoginPage: NextPage = () => {
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        reset
    } = useForm({
        defaultValues,
        resolver: yupResolver(userSchema),
    })

    const {t} = useTranslation("common");
    const [keepConnected, setKeepConnected] = useState<boolean>(true);
    const router = useRouter();
    const {handleLoading, isMobile} = useLayout();

    useEffect(() => {
    }, [])

    const onSigIn = async () => {
        // handleLoading(true)
        try {
     await router.push('/odontosys')
            // handleLoading(false)

        } catch (e) {
            console.error(e)
            handleLoading(false)
        }
    }

    return (
        <HStack h='100vh' overflowY='hidden' w='100%' justifyContent='space-between' >
            {!isMobile && (
                <Box>
                    <Image
                        h='100vh'
                        src="/assets/backgrounds/login_background.png"
                        alt="Odontosys LOGO"
                    />
                </Box>
            )}

            <Flex direction='column' w={{fb: '100%', sm: "200%", md: '100%', lg: "100%", xl: "70%"}} h='100%'
                  justify='center' align='center'>
                <Flex h='60%' w='40%' direction='column'>
                    <Flex align='center' justify='flex-start' direction='column'>
                        <Image
                            h="100px"
                            w='30%'
                            src="/assets/logo/odontosys.png"
                            alt="Odontosys"
                        />
                        <Text fontWeight="bold" fontSize="22px">
                            {t("LOGIN_PAGE_TITLE")}
                        </Text>
                    </Flex>

                    <Spacer/>

                    <Flex direction='column' w="100%">
                        <Input label={t("USERNAME")} variant="inline" width="100%"
                               register={register("login")}/>
                        <Input label={t("PASSWORD")} variant="inline" width="100%"
                               register={register("password")}/>
                        <Text color="bg">{t("FORGOT_PASSWORD")}</Text>
                    </Flex>

                    <Spacer/>

                    <Flex direction='column' align='flex-start' w='100%'>
                        <Checkbox
                            value={keepConnected}
                            onChange={() => setKeepConnected(!keepConnected)}
                        >
                            <Text color="black" fontWeight="none">
                                {t("KEEP_CONNECTED")}
                            </Text>
                        </Checkbox>

                        <Button m={'10px 0'} variant="filled" size='lg' onClick={() => onSigIn()} submit>
                            {t("LOGIN_PAGE_BUTTON")}
                        </Button>

                        <Text color="bg">{t("NOT_REGISTERED")}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </HStack>
    );
};


