import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.router.js';

import publicRouter from './routes/public.route.js'

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', publicRouter)

app.use('/api/v1/users', userRouter)


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})