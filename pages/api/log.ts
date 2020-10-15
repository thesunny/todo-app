import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("headers")
  console.log(req.headers)
  console.log("body")
  console.log(req.body)
  res.status(200).json({ props: req.body })
}
