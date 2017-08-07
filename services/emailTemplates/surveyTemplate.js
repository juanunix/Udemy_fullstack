const keys = require('../../config/keys')
module.export = (survey) => {
  return `
  <html>
    <body>
      <p>I want your input, please answer the following question:</p>
      <p>${survey.body}</p>
      <p>
        <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
        <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
      </p>
    </body>
  </html>
  `
}
