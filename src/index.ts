import server from './services/server';
import { DBService } from './services/DB';

const puerto = process.env.PORT || 8080;


DBService.init();
server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
