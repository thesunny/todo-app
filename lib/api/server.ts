import { NextApiRequest, NextApiResponse } from "next"
import { assert, number, Struct } from "superstruct"
import { JSONObject } from "~/lib/json-types"
import { Unpromise } from "~/lib/ts-utils"

export namespace Server {
  /**
   * Simplify the creation of an API handler or endpoint.
   *
   * Just return the value and it will be encoded as JSON automatically.
   *
   * Additionally, you can use `MethodResponse` to deriver the return type
   * back to the `call` in the browser.
   *
   * @param getResponse
   */
  export function method<RT extends JSONObject>(
    getResponse: (req: NextApiRequest, res: NextApiResponse) => Promise<RT>
  ) {
    return async function (
      req: NextApiRequest,
      res: NextApiResponse
    ): Promise<RT> {
      const response = await getResponse(req, res)
      res.status(200).json(response)
      /**
       * We don't use the returned response but it is useful
       * to derive the return type of the created `API.method`
       */
      return response
    }
  }

  /**
   * Takes a NextApiRequest object and validates it against a SuperStruct.
   * The returned value is guaranteed to match the SuperStruct and additionally
   * the TypeScript types are added to the return value.
   *
   * @param req
   * @param struct
   */
  export function props<P>(req: NextApiRequest, struct: Struct<P>): P {
    const props = req.body
    assert(props, struct)
    return props
  }

  /**
   * Takes a handler returned by `Server.method` and gets the TypeScript
   * type for the response.
   */
  export type ResponseType<
    T extends (req: NextApiRequest, res: NextApiResponse) => Promise<any>
  > = Unpromise<ReturnType<T>>
}

// const Props = Server.Props({ id: number() })
