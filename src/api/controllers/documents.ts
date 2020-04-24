import { ControllerBase } from "../interfaces/controllerBase";
import express, { Request, Response } from "express";
import { documentManagerInstance } from "../../document-manager/documentManager";

class DocumentsController implements ControllerBase {
    public router = express.Router();
    private readonly path = "/documents"
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.get(this.path, this.getIndex);
        this.router.post(this.path + "/transform", this.postDocumentTransform);
    };
    public getIndex = (req: Request, res: Response) => {
        res.send({ message: "success" });
    };
    public postDocumentTransform = (req: Request, res: Response) => {
        if (!req || !req.body || !req.params || !req.query || !req.query.id) {
            res.status(404);
            res.send({ error: "Please provide required data." });
        }
        documentManagerInstance.execute(req.query.id.toString(), req.body).then(() => {
            res.send({ message: "success", query: req.query.id });
        }).catch((error) => {
            res.send({ error: error })
        });
    };
}

export default DocumentsController;