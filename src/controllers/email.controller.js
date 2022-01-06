const vars = require('../config/vars')
const { TransporterObj } = require('../helpers/email')

const transporter = TransporterObj()

const verifyEmail = async (req, res) => {
  const { to, verificationToken } = req.body

  try {
    //* create email message
    let message = {
      from: vars.emailConfig.from,
      to: to,
      subject: 'Verify email',
      text: `Click on the given link below. The link is be valid for 2 hours
      http://localhost:3000/users/email_verify/${verificationToken}`,
    }

    //? send email
    await transporter.sendMail(message)

    res.status(200).json({
      success: true,
      message: `Verification email is sent to: ${to}`,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { verifyEmail }
