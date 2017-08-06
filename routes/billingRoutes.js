const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.post('/api/stripe', requireLogin, (req, res) => {
    const chargeUser = id => stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: id
    })
    const giveCreditsTo = user => charge => {
      user.credits += 5
      return Promise.resolve(user.save())
    }
    chargeUser(req.body.id)
      .then(giveCreditsTo(req.user))
      .then(user => res.send(user))
  })
}
