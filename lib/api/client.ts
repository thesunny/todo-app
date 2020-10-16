export namespace Client {
  export async function call<T>(path: string, props: object = {}) {
    const res = await fetch(`http://localhost:4000/api/${path}`, {
      method: "POST",
      body: JSON.stringify(props),
      headers: { "Content-Type": "application/json" },
    })
    const json = await res.json()
    return json as T
  }
}
