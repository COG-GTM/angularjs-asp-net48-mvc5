using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

public class BundleConfig
{
  public static void RegisterBundles(BundleCollection bundles)
  {
    // Bundle React JavaScript files from Vite build output
    bundles.Add(new ScriptBundle("~/bundles/react")
      .Include("~/dist/assets/main.js"));

    // Bundles CSS files
    bundles.Add(new StyleBundle("~/bundles/styles")
      .IncludeDirectory("~/Content", "*.css", true)
      .Include("~/dist/assets/main.css"));
  }
}
