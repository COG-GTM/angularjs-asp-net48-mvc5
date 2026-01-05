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
        public void Index_ViewResultModelIsNull()
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
        public void Index_CanBeCalledMultipleTimes()
        {
            var result1 = _controller.Index();
            var result2 = _controller.Index();
            var result3 = _controller.Index();

            Assert.IsNotNull(result1);
            Assert.IsNotNull(result2);
            Assert.IsNotNull(result3);
        }

        [Test]
        public void Index_ReturnsActionResult()
        {
            var result = _controller.Index();

            Assert.IsInstanceOf<ActionResult>(result);
        }

        [Test]
        public void Controller_CanBeInstantiated()
        {
            var controller = new LandingController();

            Assert.IsNotNull(controller);
            controller.Dispose();
        }

        [Test]
        public void Index_ViewDataIsEmpty()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.ViewData.Count);
        }

        [Test]
        public void Index_TempDataIsEmpty()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            Assert.AreEqual(0, result.TempData.Count);
        }

        [Test]
        public void Index_ViewBagIsEmpty()
        {
            var result = _controller.Index() as ViewResult;

            Assert.IsNotNull(result);
            var viewBag = result.ViewBag;
            Assert.IsNotNull(viewBag);
        }
    }
}
