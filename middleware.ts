// export { auth as middleware } from "../../auth"
export { auth as default } from "./auth"
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/test"],
}
