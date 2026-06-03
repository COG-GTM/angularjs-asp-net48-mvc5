using System.Web;
using System.Web.Routing;
using NUnit.Framework;

namespace asp_net_angularjs.Tests
{
    [TestFixture]
    public class RouteConfigTests
    {
        private RouteCollection _routes;

        [SetUp]
        public void SetUp()
        {
            _routes = new RouteCollection();
            RouteConfig.RegisterRoutes(_routes);
        }

        [Test]
        public void RegisterRoutes_LandingRouteIsRegistered()
        {
            Assert.That(_routes["Landing"], Is.Not.Null);
        }

        [Test]
        public void RegisterRoutes_RootUrlMapsToLandingControllerIndex()
        {
            var httpContextMock = new Moq.Mock<HttpContextBase>();
            httpContextMock.Setup(c => c.Request.AppRelativeCurrentExecutionFilePath).Returns("~/");

            var routeData = _routes.GetRouteData(httpContextMock.Object);

            Assert.That(routeData, Is.Not.Null);
            Assert.That(routeData.Values["controller"], Is.EqualTo("Landing"));
            Assert.That(routeData.Values["action"], Is.EqualTo("Index"));
        }

        [Test]
        public void RegisterRoutes_AxdResourcesAreIgnored()
        {
            var httpContextMock = new Moq.Mock<HttpContextBase>();
            httpContextMock.Setup(c => c.Request.AppRelativeCurrentExecutionFilePath).Returns("~/trace.axd");
            httpContextMock.Setup(c => c.Request.PathInfo).Returns(string.Empty);

            var routeData = _routes.GetRouteData(httpContextMock.Object);

            Assert.That(routeData, Is.Not.Null);
            Assert.That(routeData.RouteHandler, Is.InstanceOf<StopRoutingHandler>());
        }
    }
}
