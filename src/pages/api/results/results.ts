import nc from "next-connect";
import { results } from "../../../services/results/results";
const handler = nc();
handler.get(results);
export default handler;
