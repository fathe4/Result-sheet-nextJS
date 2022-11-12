import { useMutation, useQueryClient } from "@tanstack/react-query";
import Api from "../services/Api";

import {
  ALL_GROUP_RESULTS,
  GROUP_RESULTS,
  TABLES,
  TABLE_COLUMNS,
  TABLE_COLUMN_CREATE,
} from "./Constants";
// import {
//   USER_INFO,
//   CHANNELS_DATA,
//   STREAM_TOKEN,
//   FOLLOW_STATUS,
//   STORE_PRODUCTS,
//   ACTIVITY_FEED,
//   CHANNEL_SETTING_VALUE,
//   USER_PRODUCTS,
// } from "./Constants";

const useDeleteGroupResults = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ tableName, year }: { tableName: string; year: string }) =>
      Api.results.deleteGroupResults(tableName, year),
    {
      onSuccess: () => queryClient.invalidateQueries([ALL_GROUP_RESULTS]),
    }
  );
};
const useGetGroupResults = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (result: { table_name: string; year: string; roll?: string }) =>
      Api.results.getGroupResults(result),
    {
      onSuccess: (data: any) =>
        queryClient.setQueryData([GROUP_RESULTS], () => ({
          data: [data.data],
        })),
    }
  );
};
const useCreateColumn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (columnDetails: {
      heading: string;
      tableName: string;
      afterColumn: string;
    }) => Api.tables.createColumn(columnDetails),
    {
      onSuccess: () => queryClient.invalidateQueries([TABLE_COLUMNS]),
    }
  );
};
const useUpdateColumn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (columnDetails: {
      tableName: string;
      previousColumnName: string;
      currentColumnName: string;
    }) => Api.tables.updateColumn(columnDetails),
    {
      onSuccess: () => queryClient.invalidateQueries([TABLE_COLUMNS]),
    }
  );
};
const useDeleteColumn = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (columnName: { columnName: string; tableName: string }) =>
      Api.tables.deleteColumn(columnName),
    {
      onSuccess: () => queryClient.invalidateQueries([TABLE_COLUMNS]),
    }
  );
};
const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (tableDetails: { tableName: string; groupName: string }) =>
      Api.tables.createTable(tableDetails),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([TABLES, ALL_GROUP_RESULTS]),
    }
  );
};
const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (deleteTable: string) => Api.tables.deleteTable(deleteTable),
    {
      onSuccess: () => queryClient.invalidateQueries([TABLES]),
    }
  );
};

export {
  useDeleteGroupResults,
  useGetGroupResults,
  useCreateColumn,
  useDeleteColumn,
  useUpdateColumn,
  useCreateTable,
  useDeleteTable,
};
