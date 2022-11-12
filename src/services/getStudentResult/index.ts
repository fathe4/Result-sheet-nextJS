import executeQuery from "../../../config/db";

const calculateGrade = (studentPercentage: any) => {
  const percentage = parseInt(studentPercentage);
  if (percentage === 0) return "F";
  let grade;
  if (percentage >= 80) grade = "A+";
  if (percentage >= 70 && percentage <= 79) grade = "A-";
  if (percentage >= 60 && percentage <= 69) grade = "A";
  if (percentage >= 50 && percentage <= 59) grade = "B";
  if (percentage >= 40 && percentage <= 49) grade = "C";
  if (percentage >= 33 && percentage <= 39) grade = "D";
  if (percentage < 33) grade = "F";
  return grade;
};
const subjects = (data: any) => {
  const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
  const subject: any = [];
  Object.entries(data).map(([key, value]) => {
    const [subjectName, subjectPosition, suffix] = key.split("_");
    if (
      subjectName != "id" &&
      subjectName != "year" &&
      subjectName != "group" &&
      subjectName != "roll" &&
      subjectName != "name" &&
      subjectName != "merit" &&
      subjectName != "GPA" &&
      subjectName != "created" &&
      subjectName != "total"
    ) {
      let subj = subject.find(
        (element: any) => element.subject === subjectName
      );
      if (subj === undefined) {
        // initialize the subject
        subject.push(
          (subj = {
            subject: subjectName,
          })
        );
      }
      if (subjectPosition == "GP") {
        subj["GP"] = value;
      }
      if (subjectPosition == "percentage") {
        subj["grade"] = calculateGrade(value);
      }
      // check if the first character is a digit
      if (/^\d/.test(subjectPosition)) {
        let pos = "part_" + subjectPosition[0];
        if (typeof subj[pos] === "undefined") {
          // initializae the position
          subj[pos] = {
            subject: capitalize(subjectName) + " " + subjectPosition,
            // columnName: key,
          };
        }
        subj[pos][suffix] = value;
        // subj["columnName"] = key;

        // subj[pos] = key;
      }
    }
  });
  const studentDetails = {
    roll: data.roll,
    name: data.name,
    merit: data.merit,
    GPA: data.GPA,
    year: data.year,
    total: data.total_marks,
    group: data.group_name,
    totalFailed: data.total_failed,
  };
  return { results: subject, studentDetails };
};
const getTables = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/table/allTables`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
const getStudentResult = async (req: any, res: any) => {
  const { year, roll, tableName } = req.query;
  const tables = await getTables();
  const requestTable = tables.find(
    (table: { TablesName: string }) =>
      table.TablesName.toLocaleLowerCase() === tableName.toLocaleLowerCase()
  );
  const data: any = await executeQuery(
    `SELECT * FROM ${requestTable.TablesName} WHERE year = ${year} && roll = ${roll}`,
    []
  );
  console.log(data);

  const studentResult = subjects(data[0]);
  res.send(studentResult);
};

export { getStudentResult };
