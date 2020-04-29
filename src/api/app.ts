import express from 'express'
import { Application } from 'express'
import { ControllerBase } from './interfaces/controllerBase'

/**
 * From: https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1
 */
class App {
    public app: Application
    public port: number

    constructor(init: { port: number; middleWares: any[]; controllers: ControllerBase[]; }) {
        this.app = express();
        this.port = init.port;
        this.middlewares(init.middleWares);
        this.routes(init.controllers);
    }

    private middlewares(middleWares: any[]) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: ControllerBase[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public listen() {
        // https: https://timonweb.com/posts/running-expressjs-server-over-https/
        this.app.disable('x-powered-by');
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App