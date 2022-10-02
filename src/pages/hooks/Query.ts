import { useQuery } from "@tanstack/react-query";
import Api from "../../services/Api";
import {
  ALL_GROUP_RESULTS,
  GROUP_DATE,
  TABLES,
  TABLE_COLUMNS,
} from "./Constants";

const useGetAllGroupsResult = () =>
  useQuery([ALL_GROUP_RESULTS], () => Api.results.getAllGroupResults(), {
    initialData: [],
  });
const useGetGroupsAndDate = () =>
  useQuery([GROUP_DATE], () => Api.results.getGroupsAndDate(), {
    initialData: { groups: [], dates: [] },
  });
const useGetStudentResult = (tableName: string, year: string, roll: string) => {
  console.log(tableName, year, roll, "roll");

  return useQuery(
    ["GROUP_DATE"],
    () => Api.results.getStudentResult(tableName, year, roll),
    {
      initialData: { studentDetails: { name: "", year: "" }, result: [] },
    }
  );
};
const useGetTables = () =>
  useQuery([TABLES], () => Api.tables.getTables(), {
    initialData: [],
  });
const useGetColumns = (tableName: string) =>
  useQuery(
    [TABLE_COLUMNS],
    async () => await Api.tables.getColumns(tableName),
    {
      initialData: [],
      keepPreviousData: false,
    }
  );

export {
  useGetAllGroupsResult,
  useGetGroupsAndDate,
  useGetStudentResult,
  useGetColumns,
  useGetTables,
};
