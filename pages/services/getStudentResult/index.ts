import executeQuery from "../../../config/db";
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

  return subject;
};
const getStudentResult = async (req: any, res: any) => {
  //   console.log(req.query);
  const data: any = await executeQuery(
    `SELECT * FROM business WHERE date = "2022" && roll = 1401`,
    []
  );
  const studentResult = subjects(data[0]);
  res.send(studentResult);
};

export { getStudentResult };
