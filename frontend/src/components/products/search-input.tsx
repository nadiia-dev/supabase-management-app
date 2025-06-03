"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const SearchInput = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  });

  return (
    <div className="flex gap-1.5 mb-3">
      <Input
        placeholder="Search data table..."
        name="search"
        defaultValue={search}
        onChange={handleSearch}
      />
      <Button type="button" variant="outline">
        <Search />
      </Button>
    </div>
  );
};

export default SearchInput;
