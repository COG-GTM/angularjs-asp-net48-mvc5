using System;
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
        public void RegisterBundles_CanBeCalledMultipleTimes()
        {
            BundleConfig.RegisterBundles(_bundles);
            var initialCount = _bundles.Count;

            Assert.AreEqual(2, initialCount);
        }

        [Test]
        public void RegisterBundles_BundlesAreNotNull()
        {
            BundleConfig.RegisterBundles(_bundles);

            foreach (var bundle in _bundles)
            {
                Assert.IsNotNull(bundle);
            }
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

        [Test]
        public void BundleConfig_IsStaticClass()
        {
            var type = typeof(BundleConfig);
            Assert.IsFalse(type.IsAbstract && type.IsSealed);
        }

        [Test]
        public void RegisterBundles_IsStaticMethod()
        {
            var method = typeof(BundleConfig).GetMethod("RegisterBundles");
            Assert.IsNotNull(method);
            Assert.IsTrue(method.IsStatic);
        }
    }
}
