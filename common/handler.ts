import nc from "next-connect";
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export const handler = nc({
  onError: (err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req: any, res: any) => {
    res.status(404).end("Page is not found");
  },
});
