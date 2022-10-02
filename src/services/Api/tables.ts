import Api from ".";

const Tables = (api: typeof Api) => ({
  createTable: ({
    tableName,
    groupName,
  }: {
    tableName: string;
    groupName: string;
  }) => {
    console.log(tableName, "tableName from table.ts");
    return api.post("/api/table/createTable", {}, { tableName, groupName });
  },
  getTables: () => api.get("/api/table/allTables", {}, {}),
  deleteTable: (deleteTable: string) =>
    api.post("/api/table/delete", {}, { deleteTable }),
  getColumns: (tableName: string) =>
    api.get("/api/table/tableColumns", { tableName }, {}),
  createColumn: ({
    heading,
    tableName,
    afterColumn,
  }: {
    heading: string;
    tableName: string;
    afterColumn: string;
  }) =>
    api.post(
      "/api/table/createTableHeadings",
      {},
      { heading, tableName, afterColumn }
    ),
  updateColumn: ({
    tableName,
    previousColumnName,
    currentColumnName,
  }: {
    tableName: string;
    previousColumnName: string;
    currentColumnName: string;
  }) =>
    api.post(
      "/api/table/updateTableColumn",
      {},
      { tableName, previousColumnName, currentColumnName }
    ),
  deleteColumn: ({
    columnName,
    tableName,
  }: {
    columnName: string;
    tableName: string;
  }) => api.post("/api/table/delete", {}, { tableName, columnName }),
});

export default Tables;
