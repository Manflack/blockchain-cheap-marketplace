import express from 'express';

const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('common'))



app.listen(3000);

export default app;