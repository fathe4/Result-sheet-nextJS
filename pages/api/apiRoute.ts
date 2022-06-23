import nextConnect from "next-connect";

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res: any) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Process a POST request
apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
