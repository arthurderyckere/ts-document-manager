import App from "./api/app";
import DocumentsController from "./api/controllers/documents";
import bodyParser from "body-parser";
import apiLogger from "./logging/api-logger";

const app = new App({
    port: 8081,
    controllers: [
        new DocumentsController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        apiLogger]
});

app.listen();