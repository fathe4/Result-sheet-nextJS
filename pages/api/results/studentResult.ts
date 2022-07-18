import nc from "next-connect";
import { getStudentResult } from "../../services/getStudentResult";
const handler = nc();
handler.get(getStudentResult);
export default handler;
