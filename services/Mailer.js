const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys')

class Mailer extends helper.Mail {
  constructor ({subject, recipients}, content) {
    super()

    this.sgApi = sendgrid(keys.sendGridKey)
    this.from_email = new helper.Email('no-reply@email.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses (recipients) {
    return recipients.map(({email}) => new helper.Email(email))
  }

  addClickTracking () {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(this.recipients)
  }

  addRecipients () {
    const personalize = new helper.Personalization()
    this.recipients.forEach(personalize.addTo)
    this.addPersonalization(personalize)
  }

  send () {
    return this.sgApi.API(this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    }))
  }
}

module.exports = Mailer