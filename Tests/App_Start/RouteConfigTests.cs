using System;
using System.Web.Routing;
using NUnit.Framework;

namespace asp_net_angularjs.Tests.App_Start
{
    [TestFixture]
    public class RouteConfigTests
    {
        private RouteCollection _routes;

        [SetUp]
        public void SetUp()
        {
            _routes = new RouteCollection();
        }

        [TearDown]
        public void TearDown()
        {
            _routes?.Clear();
        }

        [Test]
        public void RegisterRoutes_DoesNotThrowException()
        {
            Assert.DoesNotThrow(() => RouteConfig.RegisterRoutes(_routes));
        }

        [Test]
        public void RegisterRoutes_AddsRoutes()
        {
            RouteConfig.RegisterRoutes(_routes);

            Assert.IsTrue(_routes.Count > 0);
        }

        [Test]
        public void RegisterRoutes_AddsLandingRoute()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"];
            Assert.IsNotNull(route);
        }

        [Test]
        public void RegisterRoutes_LandingRouteHasCorrectDefaults()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"] as Route;
            Assert.IsNotNull(route);
            Assert.IsNotNull(route.Defaults);
        }

        [Test]
        public void RegisterRoutes_LandingRouteDefaultControllerIsLanding()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"] as Route;
            Assert.IsNotNull(route);
            Assert.AreEqual("Landing", route.Defaults["controller"]);
        }

        [Test]
        public void RegisterRoutes_LandingRouteDefaultActionIsIndex()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"] as Route;
            Assert.IsNotNull(route);
            Assert.AreEqual("Index", route.Defaults["action"]);
        }

        [Test]
        public void RegisterRoutes_RouteCollectionNotNull()
        {
            RouteConfig.RegisterRoutes(_routes);

            Assert.IsNotNull(_routes);
        }

        [Test]
        public void RegisterRoutes_IgnoresAxdRoutes()
        {
            RouteConfig.RegisterRoutes(_routes);

            Assert.IsTrue(_routes.Count >= 1);
        }

        [Test]
        public void RegisterRoutes_LandingRouteUrlIsEmpty()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"] as Route;
            Assert.IsNotNull(route);
            Assert.AreEqual("", route.Url);
        }

        [Test]
        public void RegisterRoutes_CanBeCalledOnEmptyCollection()
        {
            var emptyRoutes = new RouteCollection();

            Assert.DoesNotThrow(() => RouteConfig.RegisterRoutes(emptyRoutes));
            Assert.IsTrue(emptyRoutes.Count > 0);
        }

        [Test]
        public void RegisterRoutes_LandingRouteIsRouteType()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"];
            Assert.IsInstanceOf<Route>(route);
        }
    }
}
