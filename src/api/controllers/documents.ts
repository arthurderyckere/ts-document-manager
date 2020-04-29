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
        this.router.post(this.path + "/generate", this.postGenerateResponsiveMail);
    };
    public getIndex = (req: Request, res: Response) => {
        res.send({ message: "success" });
    };
    public postGenerateResponsiveMail = (req: Request, res: Response) => {
        if (!req || !req.body || !req.query || !req.query.id) {
            res.status(404);
            res.send({ error: "Please provide required data." });
        }
        documentManagerInstance.generateResponsiveMail(req.query.id.toString(), req.body).then((result) => {
            if (result) {
                let bufferResult = Buffer.alloc(result.length, result, "utf-8");
                let encoded = bufferResult.toString("base64");
                res.send({ message: "success", query: req.query.id, result: encoded });
            } else {
                res.status(500);
                res.send({ message: "failed" });
            }

        }).catch((error) => {
            res.send({ error: error });
        });
    };
}

export default DocumentsController;