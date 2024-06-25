import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (error) return <h2>{error.message}</h2>;
  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  let resultCabins;
  // 1) Filter
  const filterValue = searchParams.get("discount") || "all";
  if (filterValue === "all") resultCabins = cabins;
  else if (filterValue === "no-discount")
    resultCabins = cabins.filter((el) => el.discount === 0);
  else if (filterValue === "with-discount")
    resultCabins = cabins.filter((el) => el.discount > 0);
  else throw new Error("unreachable option");

  // 2) Sort
  const sortValue = searchParams.get("sortBy") || "name-asc";
  const [sField, sDirection] = sortValue.split("-");
  const sModifier = sDirection === "asc" ? 1 : -1;

  typeof resultCabins[0][sField] === "string"
    ? resultCabins.sort(
        (a, b) => a[sField].localeCompare(b[sField]) * sModifier
      )
    : resultCabins.sort((a, b) => sModifier * (a[sField] - b[sField]));

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={resultCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}
