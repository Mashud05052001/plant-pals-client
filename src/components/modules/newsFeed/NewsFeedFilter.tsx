"use client";

import { Input } from "@nextui-org/input";
import { SearchIcon } from "../../icons";
import { TCategory } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";
import useDebounce from "@/src/hooks/debounce.hook";
import { usePathname, useRouter } from "next/navigation";

const NewsFeedFilter = ({ allCategories }: { allCategories: TCategory[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounceKeyword = useDebounce(searchKeyword).split(" ").join("+");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();
    if (debounceKeyword) params.set("searchTerm", debounceKeyword);
    if (selectedCategory) params.set("category", selectedCategory);
    const queryString = params.toString();
    if (queryString) {
      router.replace(`?${queryString}`);
    } else {
      router.replace(pathname);
    }
  }, [debounceKeyword, selectedCategory, router]);
  useEffect(() => {}, [selectedCategory, debounceKeyword]);
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 gap-y-6 sm:gap-y-0 mx-4 md:mx-0">
      <div>
        <Input
          classNames={{
            base: "max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 rounded-lg",
          }}
          placeholder="Search by name, description..."
          size="lg"
          startContent={<SearchIcon size={18} className="mr-2" />}
          type="search"
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <div>
        <Select
          isDisabled={allCategories.length === 0}
          label="Category"
          variant="faded"
          size="sm"
          className="w-full flex-grow "
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {allCategories.map((category) => (
            <SelectItem key={category._id}>{category?.name}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default NewsFeedFilter;
