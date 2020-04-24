class LocalLogger {
    public handleError(error: any) {
        if (!error)
            console.log("Something went wrong.")
        else if (error instanceof Error)
            console.log(error.message);
        else
            console.log(error.toString());
    }
}

export const LocalLoggerInstance = new LocalLogger();