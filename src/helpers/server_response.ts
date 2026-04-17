import {FastifyReply} from "fastify";
import {IService} from "../interfaces";

export function sendResponse<T>(reply: FastifyReply, result: IService<T>, statusCode?: number) {
    return reply.code(statusCode || 200).send(result);
}

export function buildWebhookResponse<T>(
    reply: FastifyReply,
    serviceResult: IService<T>
) {
    /**
     * Webhooks MUST always return 2xx quickly
     * unless signature validation failed (already thrown earlier)
     */
    if (!serviceResult.success) {
        // Still return 200 to avoid retries from provider
        return reply.code(200).send({
            received: true,
            success: false,
            message: serviceResult.message ?? "Processing failed",
        });
    }
    return reply.code(200).send({
        received: true,
        ...(serviceResult.data && typeof serviceResult.data === "object"
            ? serviceResult.data
            : {}),
        ...(serviceResult.meta && {meta: serviceResult.meta}),
    });
}