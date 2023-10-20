import express, { Application, Request, Response } from 'express';
import flash from 'express-flash-plus';
import logger from 'morgan';
import ExpressSession from 'express-session';


class App {

    public expressApp: Application;

    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.expressApp.set('view engine', 'pug');
        this.expressApp.use(express.static(__dirname + '/public') as express.RequestHandler)
    }

      // Configure Express middleware.
      private middleware(): void {
        this.expressApp.use(logger('dev') as express.RequestHandler);
        this.expressApp.use(express.json() as express.RequestHandler);
        this.expressApp.use(express.urlencoded({ extended: false }) as express. RequestHandler);
        this.expressApp.use(ExpressSession(
            {
                secret: 'My Secret Key',
                resave: false,
                saveUninitialized: true
            }));
        this.expressApp.use(flash());
  }

    private routes(): void {
        let router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            res.render('index', { title: 'Home' });
        });


        this.expressApp.use('/', router);
    }

}

export default new App().expressApp;