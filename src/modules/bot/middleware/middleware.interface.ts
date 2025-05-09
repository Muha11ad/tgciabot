import { MyContext } from "@/shared/utils/types";

export interface IMiddleware {

    handle(ctx: MyContext): Promise<void>;

}