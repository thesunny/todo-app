import { NextApiRequest, NextApiResponse } from "next"

export function nextHandler<T>(
  getResponse: (req: NextApiRequest, res: NextApiResponse) => Promise<T>
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const response = await getResponse(req, res)
    res.status(200).json(response)
  }
}
