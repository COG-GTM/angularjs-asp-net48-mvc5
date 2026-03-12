using Microsoft.AspNetCore.Mvc;

namespace asp_net_angularjs.Controllers
{
  public class LandingController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
