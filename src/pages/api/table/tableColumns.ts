import nc from "next-connect";
import { tableColumns } from "../../../services/tableColumns/tableColumns";

const handler = nc();
handler.get(tableColumns);
export default handler;
