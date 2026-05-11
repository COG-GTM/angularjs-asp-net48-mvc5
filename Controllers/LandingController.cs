using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using asp_net_angularjs.Configuration;

namespace asp_net_angularjs.Controllers;

public class LandingController : Controller
{
    private readonly AppSettings _settings;

    public LandingController(IOptions<AppSettings> settings)
    {
        _settings = settings.Value;
    }

    public IActionResult Index()
    {
        ViewData["Title"] = _settings.Title;
        return View();
    }
}
