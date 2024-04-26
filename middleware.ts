// 导入Clerk中间件和路由匹配器
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 创建一个路由匹配器，用于识别受保护的路由
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

/**
 * Clerk中间件函数，用于保护指定的路由。
 *
 * @param auth Clerk的授权函数，用于在请求受保护的路由时进行授权检查。
 * @param req Node.js的请求对象，包含当前请求的信息。
 * @returns 无返回值，但会在请求受保护的路由时触发授权流程。
 */
export default clerkMiddleware((auth, req) => {
    // 如果当前路由是受保护的，则调用auth().protect()进行授权检查
    if (isProtectedRoute(req)) auth().protect();
});

/**
 * 配置对象，定义了需要匹配的路由模式。
 * 用于Clerk中间件内部进行路由匹配。
 */
export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
