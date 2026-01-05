using System;
using System.Linq;
using System.Web.Optimization;
using NUnit.Framework;

namespace asp_net_angularjs.Tests.App_Start
{
    [TestFixture]
    public class BundleConfigTests
    {
        private BundleCollection _bundles;

        [SetUp]
        public void SetUp()
        {
            _bundles = new BundleCollection();
        }

        [TearDown]
        public void TearDown()
        {
            _bundles = null;
        }

        [Test]
        public void RegisterBundles_DoesNotThrowException()
        {
            Assert.DoesNotThrow(() => BundleConfig.RegisterBundles(_bundles));
        }

        [Test]
        public void RegisterBundles_AddsBundles()
        {
            BundleConfig.RegisterBundles(_bundles);

            Assert.IsTrue(_bundles.Count > 0);
        }

        [Test]
        public void RegisterBundles_AddsScriptBundle()
        {
            BundleConfig.RegisterBundles(_bundles);

            var scriptBundle = _bundles.GetBundleFor("~/bundles/scripts");
            Assert.IsNotNull(scriptBundle);
        }

        [Test]
        public void RegisterBundles_AddsStyleBundle()
        {
            BundleConfig.RegisterBundles(_bundles);

            var styleBundle = _bundles.GetBundleFor("~/bundles/styles");
            Assert.IsNotNull(styleBundle);
        }

        [Test]
        public void RegisterBundles_ScriptBundleIsScriptBundle()
        {
            BundleConfig.RegisterBundles(_bundles);

            var scriptBundle = _bundles.GetBundleFor("~/bundles/scripts");
            Assert.IsInstanceOf<ScriptBundle>(scriptBundle);
        }

        [Test]
        public void RegisterBundles_StyleBundleIsStyleBundle()
        {
            BundleConfig.RegisterBundles(_bundles);

            var styleBundle = _bundles.GetBundleFor("~/bundles/styles");
            Assert.IsInstanceOf<StyleBundle>(styleBundle);
        }

        [Test]
        public void RegisterBundles_AddsTwoBundles()
        {
            BundleConfig.RegisterBundles(_bundles);

            Assert.AreEqual(2, _bundles.Count);
        }

        [Test]
        public void RegisterBundles_BundleCollectionNotNull()
        {
            BundleConfig.RegisterBundles(_bundles);

            Assert.IsNotNull(_bundles);
        }

        [Test]
        public void RegisterBundles_CanBeCalledMultipleTimes()
        {
            Assert.DoesNotThrow(() =>
            {
                BundleConfig.RegisterBundles(_bundles);
            });
        }

        [Test]
        public void RegisterBundles_ScriptBundleHasCorrectPath()
        {
            BundleConfig.RegisterBundles(_bundles);

            var scriptBundle = _bundles.GetBundleFor("~/bundles/scripts");
            Assert.AreEqual("~/bundles/scripts", scriptBundle.Path);
        }

        [Test]
        public void RegisterBundles_StyleBundleHasCorrectPath()
        {
            BundleConfig.RegisterBundles(_bundles);

            var styleBundle = _bundles.GetBundleFor("~/bundles/styles");
            Assert.AreEqual("~/bundles/styles", styleBundle.Path);
        }
    }
}
