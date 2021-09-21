import server from './services/server';
import { DBService } from './services/DB';
import { DBMongo } from './services/MongoDB';


const puerto = process.env.PORT || 8080;

DBMongo();
DBService.init();
server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
