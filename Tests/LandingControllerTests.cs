using System.Web.Mvc;
using NUnit.Framework;
using asp_net_angularjs.Controllers;

namespace asp_net_angularjs.Tests
{
    [TestFixture]
    public class LandingControllerTests
    {
        [Test]
        public void Index_ReturnsViewResult()
        {
            var controller = new LandingController();

            var result = controller.Index();

            Assert.That(result, Is.InstanceOf<ViewResult>());
        }

        [Test]
        public void Index_ReturnsDefaultView()
        {
            var controller = new LandingController();

            var result = controller.Index() as ViewResult;

            Assert.That(result, Is.Not.Null);
            Assert.That(string.IsNullOrEmpty(result.ViewName), Is.True);
        }
    }
}
