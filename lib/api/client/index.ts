import { handleErrorResponse } from "./handle-error"

export namespace Client {
  /**
   * Make a call to the server API
   *
   * @param path the path under the `pages/api` directory
   * @param props the props to pass to the `API.method`
   */
  export async function call<T>(path: string, props: object = {}) {
    const res = await fetch(`http://localhost:4000/api/${path}`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
      /**
       * If the fetch is successful, return the data
       */
      const json = await res.json()
      return json as T
    } else {
      handleErrorResponse(path, props)
      const text = await res.text()
      throw new Error(text)
    }
  }
}
