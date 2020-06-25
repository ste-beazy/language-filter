export async function timeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}