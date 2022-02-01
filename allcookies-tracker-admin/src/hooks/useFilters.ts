import React, { useState, useEffect } from "react";

function useFilters() {
  const [filters, setFilters] = useState<string[]>([]);

  function addOrRemoveFilter(filter: string) {
    if (!filters.includes(filter)) {
      setFilters(filters.concat(filter));
    }
    // if (filters.includes(filter)) {
    //   setFilters([...filters.filter((f) => f !== filter)]);
    // }
  }

  useEffect(() => {
    console.log("filters:", filters);
  }, [filters, addOrRemoveFilter]);

  return { filters, addOrRemoveFilter };
}

export default useFilters;
