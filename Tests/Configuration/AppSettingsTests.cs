using Xunit;
using asp_net_angularjs.Configuration;

namespace Tests.Configuration;

public class AppSettingsTests
{
    [Fact]
    public void DefaultTitle_IsSet()
    {
        var settings = new AppSettings();

        Assert.Equal("AngularJS with ASP.NET Core", settings.Title);
    }

    [Fact]
    public void EnableDetailedErrors_DefaultsFalse()
    {
        var settings = new AppSettings();

        Assert.False(settings.EnableDetailedErrors);
    }

    [Fact]
    public void Properties_CanBeSet()
    {
        var settings = new AppSettings
        {
            Title = "Custom Title",
            EnableDetailedErrors = true
        };

        Assert.Equal("Custom Title", settings.Title);
        Assert.True(settings.EnableDetailedErrors);
    }
}
