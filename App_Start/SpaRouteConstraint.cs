using System.Web;
using System.Web.Routing;

namespace asp_net_angularjs
{
    /// <summary>
    /// Matches request paths that should be handed to the single page application.
    /// Requests for static assets (anything with a file extension, such as the Vite
    /// build output under ~/Content/app/browser) are excluded so IIS serves them.
    /// </summary>
    public class SpaRouteConstraint : IRouteConstraint
    {
        public bool Match(
            HttpContextBase httpContext,
            Route route,
            string parameterName,
            RouteValueDictionary values,
            RouteDirection routeDirection)
        {
            if (routeDirection == RouteDirection.UrlGeneration)
            {
                return false;
            }

            var clientRoute = values[parameterName] as string;

            if (string.IsNullOrEmpty(clientRoute))
            {
                return true;
            }

            var lastSegment = clientRoute.Substring(clientRoute.LastIndexOf('/') + 1);

            return !lastSegment.Contains(".");
        }
    }
}
