using Microsoft.AspNetCore.Mvc;

namespace asp_net_angularjs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandingApiController : ControllerBase
    {
        [HttpGet("config")]
        public IActionResult GetConfig()
        {
            return Ok(new
            {
                title = "XLTS for AngularJS with ASP.NET Core",
                description = "Migrated from ASP.NET MVC 5 to ASP.NET Core 7 Web API",
                features = new[]
                {
                    "AngularJS Frontend",
                    "ASP.NET Core 7 Web API",
                    "CORS Enabled",
                    "Static File Serving"
                }
            });
        }
    }
}
