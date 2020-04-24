import { Router } from "express";

export interface ControllerBase {
    router: Router;
    initRoutes(): any;
}