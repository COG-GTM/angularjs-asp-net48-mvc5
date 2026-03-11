using Microsoft.AspNetCore.Mvc;

namespace AngularJsAspNetCore7.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandingController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetData()
        {
            return Ok(new { 
                message = "Hello from ASP.NET Core 7 Web API",
                timestamp = DateTime.UtcNow,
                version = "1.0.0"
            });
        }
    }
}
