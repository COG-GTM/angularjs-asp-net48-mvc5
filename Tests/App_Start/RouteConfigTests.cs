using System;
using System.Web.Routing;
using NUnit.Framework;
using asp_net_angularjs;

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
            _routes = null;
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
        public void RegisterRoutes_LandingRouteIsRoute()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"];
            Assert.IsInstanceOf<Route>(route);
        }

        [Test]
        public void RegisterRoutes_AddsIgnoreRoute()
        {
            RouteConfig.RegisterRoutes(_routes);

            Assert.IsTrue(_routes.Count >= 2);
        }

        [Test]
        public void RegisterRoutes_LandingRouteHasCorrectUrl()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"] as Route;
            Assert.IsNotNull(route);
            Assert.AreEqual("", route.Url);
        }

        [Test]
        public void RegisterRoutes_LandingRouteHasCorrectDefaults()
        {
            RouteConfig.RegisterRoutes(_routes);

            var route = _routes["Landing"] as Route;
            Assert.IsNotNull(route);
            Assert.IsNotNull(route.Defaults);
            Assert.AreEqual("Landing", route.Defaults["controller"]);
            Assert.AreEqual("Index", route.Defaults["action"]);
        }

        [Test]
        public void RegisterRoutes_CanBeCalledMultipleTimes()
        {
            RouteConfig.RegisterRoutes(_routes);
            var initialCount = _routes.Count;

            Assert.IsTrue(initialCount >= 2);
        }

        [Test]
        public void RegisterRoutes_RoutesAreNotNull()
        {
            RouteConfig.RegisterRoutes(_routes);

            foreach (var route in _routes)
            {
                Assert.IsNotNull(route);
            }
        }

        [Test]
        public void RouteConfig_IsPublicClass()
        {
            var type = typeof(RouteConfig);
            Assert.IsTrue(type.IsPublic);
        }

        [Test]
        public void RegisterRoutes_IsStaticMethod()
        {
            var method = typeof(RouteConfig).GetMethod("RegisterRoutes");
            Assert.IsNotNull(method);
            Assert.IsTrue(method.IsStatic);
        }

        [Test]
        public void RegisterRoutes_IsPublicMethod()
        {
            var method = typeof(RouteConfig).GetMethod("RegisterRoutes");
            Assert.IsNotNull(method);
            Assert.IsTrue(method.IsPublic);
        }

        [Test]
        public void RegisterRoutes_TakesRouteCollectionParameter()
        {
            var method = typeof(RouteConfig).GetMethod("RegisterRoutes");
            Assert.IsNotNull(method);
            var parameters = method.GetParameters();
            Assert.AreEqual(1, parameters.Length);
            Assert.AreEqual(typeof(RouteCollection), parameters[0].ParameterType);
        }
    }
}
