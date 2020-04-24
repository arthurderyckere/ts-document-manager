import Handlebars from "handlebars";
import { readFile, writeFile } from "fs";
import { LocalLoggerInstance } from "../logging/local";

class DocumentManager {
    private static instance: DocumentManager;
    private readonly inputfolder = "./demos/";
    private readonly outputFolder = "./demos/output/";
    private readonly extension = ".html";

    public static getInstance(): DocumentManager {
        if (!DocumentManager.instance)
            DocumentManager.instance = new DocumentManager();

        return DocumentManager.instance;
    }
    public execute(sourceId: string, data: object): Promise<NodeJS.ErrnoException | undefined> {
        return new Promise((resolve, reject) => {
            readFile(this.inputfolder + sourceId + this.extension, (error: NodeJS.ErrnoException | null, htmlData: Buffer) => {
                if (error) {
                    LocalLoggerInstance.handleError(error);
                    reject(error);
                }
                else if (htmlData) {
                    let result = this.transformDocument(htmlData, data);
                    this.handleOutput(sourceId, result).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                }
            });
        });
    }
    /**
     * Doesn't handle non existing folders for now
     */
    private handleOutput(sourceId: string, result: string): Promise<any> {
        return new Promise((resolve, reject) => {
            writeFile(this.outputFolder + sourceId + this.extension, result, (error: NodeJS.ErrnoException | null) => {
                if (!error) {
                    resolve();
                }
                else {
                    LocalLoggerInstance.handleError(error);
                    reject(error)
                }
            });
        });
    }
    private transformDocument(document: Buffer, data: object): string {
        try {
            let source = document.toString();
            let template = this.compile(source);
            if (template) {
                return template(data);
            }
            throw new Error("Invalid operation: template is null or undefined.")
        } catch (error) {
            LocalLoggerInstance.handleError(error);
            throw error;
        }
    }
    private compile(template: string): HandlebarsTemplateDelegate | undefined {
        try {
            return Handlebars.compile(template);
        }
        catch (error) {
            LocalLoggerInstance.handleError(error);
            return undefined;
        }
    }
}

export const documentManagerInstance = DocumentManager.getInstance();