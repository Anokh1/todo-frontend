export interface GlobalFilterProps {
  e: any;
  filters: any;
  setFilters: (arg0: any) => void;
  setGlobalFilterValue: (arg0: any) => void;
}

export const onGlobalFilterChange = ({
  e,
  filters,
  setFilters,
  setGlobalFilterValue,
}: GlobalFilterProps) => {
  const value = e.target.value;
  let _filters = { ...filters };
  _filters["global"].value = value;
  setFilters(_filters);
  setGlobalFilterValue(value);
};
