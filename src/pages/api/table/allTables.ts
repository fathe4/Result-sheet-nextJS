import nc from "next-connect";
import { tables } from "../../../services/tables";

const handler = nc();
handler.get(tables);
export default handler;

// ALTER TABLE vendors
// ADD COLUMN phone VARCHAR(15) AFTER name;
