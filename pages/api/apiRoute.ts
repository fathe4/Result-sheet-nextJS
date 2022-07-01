import nextConnect from "next-connect";
// import upload from "../../middleware/middleware";
// import { businessStudiesResult } from "./hello";

const apiRoute = nextConnect({
  onError(error, req, res: any) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
// apiRoute.use(upload.array("file"));
// Process a POST request
// apiRoute.post((req, res) => {
//   businessStudiesResult(req, res);
// });

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
