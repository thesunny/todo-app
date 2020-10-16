/**
 * When displaying the error in the console, we give a preamble that
 * identifies which method call this error belongs to. The error message is
 * not included because after this method is called, the error is thrown.
 *
 * The thrown error does its own logging through next.js
 *
 * @param path
 * @param props
 */
function logErrorPreamble(path: string, props: object) {
  console.log("")
  console.error("== Error in client.call ==")
  console.log("")
  console.log(
    `Client.call(${JSON.stringify(path)}, ${JSON.stringify(props, null, 2)})`
  )
  console.log("")
}

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
      /**
       * If the fetch fails, the error message is in the response text.
       * This is designed into `API.method` as well as the way it normally
       * works.
       */
      logErrorPreamble(path, props)
      const text = await res.text()
      throw new Error(text)
    }
  }
}
