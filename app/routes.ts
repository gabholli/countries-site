import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
    layout("routes/layouts/mainLayout.tsx", [
        index("routes/home.tsx"),
        route("countries", "routes/countries.tsx")
    ])
] satisfies RouteConfig;
