import React from "react";
export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;
  return (
    <>
      <span>
        Field Search
        <input
          type="text"
          value={filterValue || ""}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </span>
    </>
  );
}
