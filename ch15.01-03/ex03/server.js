import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.static('.'));

app.listen(7900, () => {
  console.log('Server running on port 7900');
});
