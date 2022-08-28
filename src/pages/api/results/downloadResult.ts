import nc from "next-connect";
import { downloadResults } from "../../../services/downloadResult";
const handler = nc();
handler.get(downloadResults);
export default handler;
