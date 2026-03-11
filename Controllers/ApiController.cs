using Microsoft.AspNetCore.Mvc;

namespace asp_net_angularjs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiController : ControllerBase
    {
        [HttpGet("version")]
        public IActionResult GetVersion()
        {
            return Ok(new
            {
                application = "ASP.NET Core AngularJS Demo",
                version = "1.0.0",
                framework = ".NET 7.0",
                timestamp = DateTime.UtcNow
            });
        }

        [HttpGet("health")]
        public IActionResult GetHealth()
        {
            return Ok(new
            {
                status = "healthy",
                timestamp = DateTime.UtcNow
            });
        }
    }
}
