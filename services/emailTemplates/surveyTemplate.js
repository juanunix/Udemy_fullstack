module.export = (survey) => {
  return `
  <html>
    <body>
      I want your input, please answer the following question:
      <p>${survey.body}</p>
      <a href="http://localhost:3000">Yes</a>
      <a href="http://localhost:3000">No</a>
    </body>
  </html>
  `
}
