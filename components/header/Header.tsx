import {Flex} from "@chakra-ui/react";
import React from "react";
import Nav from "./Nav";
import {useTabLayout} from "../../hooks/layout/useTabLayout";

const Header: React.FC = () => {

    return (
        <Flex align='center' justify='flex-end' as="nav" borderBottom="3px solid #005492"
              boxShadow="0 4px 12px -1px rgba(0, 0, 0, 0.05)" h='60px' backgroundColor='white'

        >
            <Nav/>
        </Flex>
    );
}


export default React.memo(Header)
