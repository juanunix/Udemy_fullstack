const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => res.send('Thanks for voting'))

  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body
    const user = req.user
    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: user.id,
      dateSent: Date.now()
    })
    const substractOneCredit = () => {
      user.credits -= 1
      user.save()
    }

    new Mailer(survey, surveyTemplate(survey))
      .send()
      .then(_ => survey.save())
      .then(substractOneCredit)
      .then(res.send)
      .catch(res.status(422).send)
  })
}
