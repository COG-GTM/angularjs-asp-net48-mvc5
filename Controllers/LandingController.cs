using Microsoft.AspNetCore.Mvc;

namespace asp_net_angularjs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandingController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "ASP.NET Core 7 Web API is running", timestamp = DateTime.UtcNow });
        }
    }
}
