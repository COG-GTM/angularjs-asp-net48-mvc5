using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace asp_net_angularjs
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Landing",
                url: "",
                defaults: new { controller = "Landing", action = "Index", id = UrlParameter.Optional }
            );

            // Client-side routes are resolved by React Router, so every request that
            // does not match a file on disk is served by the SPA host view.
            routes.MapRoute(
                name: "SpaFallback",
                url: "{*clientRoute}",
                defaults: new { controller = "Landing", action = "Index" },
                constraints: new { clientRoute = new SpaRouteConstraint() }
            );
        }
    }
}
