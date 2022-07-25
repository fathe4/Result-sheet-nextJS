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
      subjectName != "date" &&
      subjectName != "group" &&
      subjectName != "roll" &&
      subjectName != "name" &&
      subjectName != "merit" &&
      subjectName != "GPA" &&
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
          };
        }
        subj[pos][suffix] = value;
      }
    }
  });
  const studentDetails = {
    roll: data.roll,
    name: data.name,
    merit: data.merit,
    GPA: data.GPA,
    total: data.total_marks,
    group: data.group_name,
    totalFailed: data.total_failed,
  };
  return { result: subject, studentDetails };
};
const getStudentResult = async (req: any, res: any) => {
  const { date, roll, group } = req.query;
  console.log(date, roll, group);

  const data: any = await executeQuery(
    `SELECT * FROM ${group} WHERE date = ${date} && roll = ${roll}`,
    []
  );
  const studentResult = subjects(data[0]);
  console.log(data);

  res.send(data[0]);
};

export { getStudentResult };
