const {
  app,
  emailApp,
  mongoose,
  vars,
  mediaApp
} = require('./config')

const morgan = require('morgan');

app.use(morgan("common"));

// * open mongoose connection
mongoose.connect();

// * main server running at port 3000
app.listen(vars.port, () =>
  console.log(`Server started on port ${vars.port} (${vars.env})`)
)

// *  start media server at port 5000
mediaApp.listen(vars.mediaPort, () =>
  console.log(`Media Server started on port ${vars.mediaPort} (${vars.env})`)
);

// * start email server at port 8081
emailApp.listen(vars.emailConfig.port, () =>
  console.log(
    `Mailing Server started on port ${vars.emailConfig.port} (${vars.env})`
  )
)

// ! Handle all unexpected errors
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
    process.exit(1)
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  })