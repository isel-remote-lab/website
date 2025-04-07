import { Flex } from "antd";
import DefaultPage from "../components/defaults/DefaultPage";
import Search from "antd/es/input/Search";

export default function SearchPage() {
    return (
        <DefaultPage>
            <Flex wrap gap="large" align="center" style={{ flexDirection: "column" }}>
                <Search
                    placeholder="Pesquisar..."
                    allowClear
                    size="large"
                    style={{ width: "50%" }}
                />
            </Flex>
        </DefaultPage>
    );
}