import { context } from "./context";
import { extractSubFromToken } from "./helpers/utils";

const getUserId = () => extractSubFromToken(context.token)

export default getUserId