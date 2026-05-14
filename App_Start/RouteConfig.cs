using System.Web.Mvc;
using System.Web.Routing;

namespace asp_net_angularjs
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("api/{*pathInfo}");

            routes.MapRoute(
                name: "Landing",
                url: "",
                defaults: new { controller = "Landing", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "SPA-Fallback",
                url: "{*url}",
                defaults: new { controller = "Landing", action = "Index" }
            );
        }
    }
}
