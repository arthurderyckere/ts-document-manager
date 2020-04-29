import Handlebars from "handlebars";
import { promises } from "fs";
import { basename, extname } from "path";
import { LocalLoggerInstance } from "../logging/local";

class DocumentManager {
    private static instance: DocumentManager;

    public static getInstance(): DocumentManager {
        if (!DocumentManager.instance)
            DocumentManager.instance = new DocumentManager();
        return DocumentManager.instance;
    }
    public async generateResponsiveMail(sourceId: string, data: object): Promise<string | undefined> {
        try {
            let page = await promises.readFile("./src/documents/emails/" + sourceId + "/" + sourceId + ".html");
            let layout = await this.loadLayoutFile();
            await this.registerPartials();
            await this.registerHelpers();
            Handlebars.registerPartial("body", page.toString());
            let layoutTemplate = Handlebars.compile(layout);
            let layoutResult = layoutTemplate(data);
            return layoutResult;
        }
        catch (error) {
            LocalLoggerInstance.handleError(error);
            return undefined;
        }
    }

    public async registerHelpers() {
        let basePath = "src/documents/helpers";
        var directory = await promises.readdir(basePath);
        if (directory && directory.length > 0) {
            await Promise.all(directory.map(async (filePath) => {
                let extension = extname(filePath);
                let name = basename(filePath, extension);
                if (Handlebars.helpers[name]) {
                    delete require.cache[require.resolve("../documents/helpers/" + name)];
                    Handlebars.unregisterHelper(name);
                }
                // require path is relative to current file
                let helper = await require("../documents/helpers/" + name);
                Handlebars.registerHelper(name, helper);
            }));
        }
    }
    /**
     * try catch 
     */
    public async registerPartials() {
        let basePath = "./src/documents/partials";
        var directory = await promises.readdir(basePath);
        if (directory && directory.length > 0) {
            await Promise.all(directory.map(async (filePath) => {
                let file = await promises.readFile(basePath + "/" + filePath);
                let extension = extname(filePath);
                let name = basename(filePath, extension);
                Handlebars.registerPartial(name, file.toString());
            }));
        }
    }
    public async loadLayoutFile(): Promise<string> {
        let result = await promises.readFile("./src/documents/layout/default.hbs");
        return result.toString();
    }
}

export const documentManagerInstance = DocumentManager.getInstance();