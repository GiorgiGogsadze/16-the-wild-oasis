import Select from "./Select";
import useURL from "../hooks/useURL";

export default function SortBy({ options }) {
  const { value, setValue } = useURL("sortBy");
  const sortBy = value || options.find((el) => el.default).value;

  return (
    <Select options={options} type="white" onChange={setValue} value={sortBy} />
  );
}
