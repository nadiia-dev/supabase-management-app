"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

const SearchInput = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search") as string;

    setSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1.5 mb-3">
        <Input
          placeholder="Search data table..."
          name="search"
          defaultValue={search}
        />
        <Button type="submit" variant="outline">
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchInput;
