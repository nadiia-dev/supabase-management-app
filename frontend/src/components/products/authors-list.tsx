"use client";
import { useFilterContext } from "@/context/filters-context";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useMembers } from "@/hooks/use-members";
import { useUser } from "@/hooks/use-user";
import { User } from "@/types/user";

const AuthorsList = ({ id }: { id: string }) => {
  const { data } = useUser();
  const team_id = data?.team_id;
  const { data: authors, isLoading } = useMembers(team_id);

  const { columnFilters, setFilterValue } = useFilterContext();
  const statusFilter = columnFilters.find((filter) => filter.id === id);

  const selectedAuthor = statusFilter?.value || "";

  const toggleStatus = (author: string) => {
    const newAuthor = selectedAuthor === author ? null : author;

    setFilterValue("author", newAuthor ? newAuthor : "");
  };

  return (
    <div>
      {authors &&
        authors.map((author: User) => (
          <div
            className="flex items-center gap-3 not-last:mb-3"
            key={author.id}
          >
            <Checkbox
              id={author.id}
              className="w-4 h-4"
              checked={selectedAuthor === author.id}
              onCheckedChange={() => toggleStatus(author.id)}
            />
            <Label htmlFor={author.id} className="text-md">
              {author.email}
            </Label>
          </div>
        ))}
    </div>
  );
};

export default AuthorsList;
