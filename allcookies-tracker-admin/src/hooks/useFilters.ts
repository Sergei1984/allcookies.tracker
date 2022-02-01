import React, { useState, useEffect } from "react";

function useFilters() {
  const [filters, setFilters] = useState<string[]>([]);

  function addOrRemoveFilter(filter: string) {
    const hasFilter = filters.includes(filter);
    console.log("hasFilter: ", filter);

    if (!hasFilter) {
      console.log("adding filter");
      setFilters((prevState) => [...prevState, filter]);
    } else {
      console.log("removing filter");
      const newFilters: string[] = filters.filter(
        (f) => f !== filter
      ) as string[];
      setFilters(newFilters);
    }
  }

  useEffect(() => {
    console.log("filters:", filters);
  }, [filters]);

  return { filters, addOrRemoveFilter };
}

export default useFilters;
