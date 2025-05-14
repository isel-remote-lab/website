import { Flex } from "antd";
import DefaultPage from "../components/defaults/DefaultPage";
import Search from "antd/es/input/Search";
import { useState, ChangeEvent, useEffect } from "react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const onSearch = (value: string) => {
    // Here you can implement the actual search by ID
    console.log("Searching for ID:", value);
    // TODO: Implement the actual search logic here
  };

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

  return (
    <DefaultPage>
      <Flex wrap gap="large" align="center" style={{ flexDirection: "column" }}>
        <Search
          placeholder="Pesquisar por ID..."
          allowClear
          size="large"
          style={{ width: "50%" }}
          onChange={handleSearch}
          onSearch={onSearch}
          enterButton="Pesquisar"
        />
      </Flex>
    </DefaultPage>
  );
}
