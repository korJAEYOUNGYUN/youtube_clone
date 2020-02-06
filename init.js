import app from './app';
import './db';
import './models/Video';
import './models/Comment';
import './models/User';


const PORT = process.env.PORT;

const handleListening = () =>  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
