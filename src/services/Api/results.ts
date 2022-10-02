import Api from ".";

const Results = (api: typeof Api) => ({
  getGroupResults: (result: {
    table_name: string;
    year: string;
    roll?: string;
  }) =>
    api.get(
      "/api/results/results",
      { group: result.table_name, year: result.year, roll: result.roll },
      {}
    ),
  getAllGroupResults: () => api.get("/api/results/allGroupResults/", {}, {}),
  getGroupsAndDate: () => api.get("/api/results/getGroupsAndDate", {}, {}),
  deleteGroupResults: (tableName: string, year: string) =>
    api.post("/api/results/deleteResults", {}, { tableName, year }),
  getStudentResult: (tableName: string, year: string, roll: string) =>
    api.get("/api/results/studentResult", { tableName, year, roll }, {}),
  getTableColumns: (tableName: string) =>
    api.get("/api/table/tableColumns", { tableName }, {}),
});

export default Results;
