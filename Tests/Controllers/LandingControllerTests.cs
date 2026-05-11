using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;
using asp_net_angularjs.Configuration;
using asp_net_angularjs.Controllers;

namespace Tests.Controllers;

public class LandingControllerTests
{
    private readonly LandingController _controller;
    private readonly AppSettings _settings;

    public LandingControllerTests()
    {
        _settings = new AppSettings
        {
            Title = "Test App Title",
            EnableDetailedErrors = false
        };

        var mockOptions = new Mock<IOptions<AppSettings>>();
        mockOptions.Setup(o => o.Value).Returns(_settings);
        _controller = new LandingController(mockOptions.Object);
    }

    [Fact]
    public void Index_ReturnsViewResult()
    {
        var result = _controller.Index();

        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Index_SetsViewDataTitle()
    {
        _controller.Index();

        Assert.Equal("Test App Title", _controller.ViewData["Title"]);
    }

    [Fact]
    public void Index_UsesDefaultTitle_WhenNotConfigured()
    {
        var defaultSettings = new AppSettings();
        var mockOptions = new Mock<IOptions<AppSettings>>();
        mockOptions.Setup(o => o.Value).Returns(defaultSettings);
        var controller = new LandingController(mockOptions.Object);

        controller.Index();

        Assert.Equal("AngularJS with ASP.NET Core", controller.ViewData["Title"]);
    }
}
