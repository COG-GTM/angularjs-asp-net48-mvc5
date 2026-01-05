using System;
using System.Web.Mvc;
using NUnit.Framework;
using asp_net_angularjs.Controllers;

namespace asp_net_angularjs.Tests.Controllers
{
    [TestFixture]
    public class LandingControllerTests
    {
        private LandingController _controller;

        [SetUp]
        public void SetUp()
        {
            _controller = new LandingController();
        }

        [TearDown]
        public void TearDown()
        {
            _controller?.Dispose();
        }

        [Test]
        public void Index_ReturnsViewResult()
        {
            var result = _controller.Index();

            Assert.IsNotNull(result);
            Assert.IsInstanceOf<ViewResult>(result);
        }

        [Test]
        public void Index_ReturnsDefaultView()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            Assert.IsEmpty(result.ViewName);
        }

        [Test]
        public void Index_ViewResultHasNoModel()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            Assert.IsNull(result.Model);
        }

        [Test]
        public void Controller_InheritsFromController()
        {
            Assert.IsInstanceOf<Controller>(_controller);
        }

        [Test]
        public void Controller_CanBeInstantiated()
        {
            var controller = new LandingController();

            Assert.IsNotNull(controller);
            controller.Dispose();
        }

        [Test]
        public void Index_DoesNotThrowException()
        {
            Assert.DoesNotThrow(() => _controller.Index());
        }

        [Test]
        public void Index_ReturnsActionResult()
        {
            var result = _controller.Index();

            Assert.IsInstanceOf<ActionResult>(result);
        }

        [Test]
        public void Index_ViewResultViewDataIsNotNull()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            Assert.IsNotNull(result.ViewData);
        }

        [Test]
        public void Index_ViewResultTempDataIsNotNull()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            Assert.IsNotNull(result.TempData);
        }

        [Test]
        public void Index_MultipleCallsReturnConsistentResults()
        {
            var result1 = _controller.Index() as ViewResult;
            var result2 = _controller.Index() as ViewResult;

            Assert.IsNotNull(result1);
            Assert.IsNotNull(result2);
            Assert.AreEqual(result1.ViewName, result2.ViewName);
        }
    }
}
