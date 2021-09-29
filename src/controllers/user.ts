import { Request, Response} from 'express';

declare module 'express-session' {
    export interface SessionData {
      nomUser: string;
    }
  }


class User {

    async login(req: Request, res: Response) {
        const {username } = req.query;
        
        req.session.nomUser = username?.toString();
        if(username) { 
            res.redirect(`/index.html?user=${username}`);
            // res.json({
            //     msj: `bienvenido ${username}`   
            // })
        }else {
            res.status(401).json({
                msg: 'No estas autorizado'
            })
        }
    }

    async logout(req: Request, res: Response) {
        req.session.destroy((err)=> {
            if(err){
                console.log(err);
             }else{
                // res.json({ msg: 'session destruida' });
                res.redirect(`/login.html`);
             }
        });
    }

    // Muestra la session ingresada
    async secretEndpoint(req: Request, res: Response) {
        try {
            if(req.session.nomUser === undefined) {
                res.json({session: 'sin registro'})
            }
        } catch (error) {
            console.log('------->', error);
        }

        // else {
        //     res.json({msj: 'informacion secreta', session: req.session.nomUser})
        // }
    } 


}


export const userController = new User();