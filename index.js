import express from "express";
import bodyParser from "body-parser"
// take incoming POST requests bodies

import userRoutes from './routes/user_mails.js'

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/', userRoutes)
// app.get('/', (req, res) => {
//     console.log('Home route working');
//     res.end('Home route page')
// })

app.get('/about', (req, res) => {
    console.log('About route working');
    res.end('About route page')
})

// local express server
app.listen(PORT, () => console.log(`Server is running at port: http://localhost:${PORT}/`));
