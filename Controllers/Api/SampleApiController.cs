using System.Collections.Generic;
using System.Web.Http;

namespace asp_net_angularjs.Controllers.Api
{
    public class SampleApiController : ApiController
    {
        [HttpGet]
        [Route("api/sample")]
        public IHttpActionResult Get()
        {
            var data = new List<object>
            {
                new { Id = 1, Name = "Angular", Description = "Modern web framework" },
                new { Id = 2, Name = "ASP.NET MVC 5", Description = "Server-side web framework" },
                new { Id = 3, Name = ".NET Framework 4.8", Description = "Runtime platform" }
            };

            return Ok(data);
        }
    }
}
