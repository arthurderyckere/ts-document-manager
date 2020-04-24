import express from 'express'
import { Application } from 'express'

/**
 * From: https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1
 */
class App {
    public app: Application
    public port: number

    constructor(init: { port: number; middleWares: any; controllers: any; }) {
        this.app = express()
        this.port = init.port
        this.middlewares(init.middleWares);
        this.routes(init.controllers);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App