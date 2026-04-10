using Microsoft.AspNetCore.Mvc;

namespace asp_net_angularjs.Controllers
{
    public class LandingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [Route("Landing/Error")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return Content("An unexpected error occurred.", "text/plain");
        }
    }
}
