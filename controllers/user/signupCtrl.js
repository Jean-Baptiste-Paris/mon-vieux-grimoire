const bcrypt = require('bcrypt')
const User = require('../../models/User')

const signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)

    if (!hash) {
      return res
        .status(400)
        .json({ message: 'Erreur de hashage du mot de passe' })
    }

    const user = new User({
      email: req.body.email,
      password: hash,
    })

    await user.save()

    res.status(200).json({ message: 'Utilisateur créé' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = signup
