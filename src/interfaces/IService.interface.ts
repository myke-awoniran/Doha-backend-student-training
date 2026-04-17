export interface IService<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: Record<string, any>
}