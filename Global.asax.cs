using System.Web.Mvc;
using System.Web.Routing;

namespace asp_net_angularjs
{
  public class MvcApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      AreaRegistration.RegisterAllAreas();
      RouteConfig.RegisterRoutes(RouteTable.Routes);
    }
  }
}
