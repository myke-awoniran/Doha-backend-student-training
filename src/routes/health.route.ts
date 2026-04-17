import {FastifyInstance} from "fastify";
import {IService} from "../interfaces";

export async function healthRoutes(app: FastifyInstance) {
    app.get("/health", async (): Promise<IService> => {
        return {
            success: true,
            message: "Hello World!",
            data: {
                time: new Date().toISOString(),
                timeZone: "Asia/Qatar"
            }
        };
    });
}
