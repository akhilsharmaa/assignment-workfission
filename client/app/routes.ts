import { 
    type RouteConfig, 
    route, 
    index } 
from "@react-router/dev/routes";

export default [
    index("routes/All.tsx"),
    route("new", "./routes/New.tsx"),
] satisfies RouteConfig;
