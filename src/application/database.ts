import { PrismaClient } from "@prisma/client";
import { Logger } from "./logging";

export const prismaClient = new PrismaClient({
    log:[
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "warn"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "error"
        }
    ]
})


prismaClient.$on("info", (e) =>{
    Logger.info(e)
})
prismaClient.$on("error", (e) =>{
    Logger.error(e)
})
prismaClient.$on("warn", (e) =>{
    Logger.warn(e)
})
prismaClient.$on("query", (e) =>{
    Logger.info(e)
})