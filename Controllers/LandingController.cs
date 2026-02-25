using Microsoft.AspNetCore.Mvc;

namespace AngularJsAspNetCore.Controllers
{
  public class LandingController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
