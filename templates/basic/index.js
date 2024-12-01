console.log('Hello from the basic template!');

export const {{functionName}} = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from the {{templateName}} template!'
    })
  }
}
