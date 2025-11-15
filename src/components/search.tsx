"use client";

import { Input } from "@/components/ui/input";
import { debounce, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";

const Search = () => {
  const t = useTranslations();
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });

  return (
    <div className={"mb-4 flex flex-col gap-4"}>
      <div className={"flex gap-2 items-center"}>
        <Input
          placeholder={t("Shared.search")}
          value={search}
          onChange={(e) =>
            setSearch(e.target.value, {
              // Send immediate update if resetting, otherwise debounce at 500ms
              limitUrlUpdates:
                e.target.value === "" ? undefined : debounce(500),
            })
          }
        />
      </div>
    </div>
  );
};

export default Search;
