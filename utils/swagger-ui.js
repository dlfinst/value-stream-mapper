/* eslint-disable no-sync */
const resolve = require('resolve');
const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs');


// Dynamically replace the URL in the Swagger UI

module.exports = (url) => {
  const staticFolder = path.dirname(resolve.sync('swagger-ui-dist', {
    packageFilter(pkg, pkgfile) {
      pkg.main = pkg.main.replace('dist/', '');
      return pkg;
    }
  }));

  const $ = cheerio.load(
    fs.readFileSync(
      path.join(staticFolder, 'index.html')
    ).toString()
  );

  /**
   * rewrite init function
   */
  $('script:last-child').replaceWith(`
    <script>
      window.onload = function() {
        // Build a system
        var ui = SwaggerUIBundle({
          url: "${url}",
          spec: 'undefined',
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: 'StandaloneLayout'
        })
        window.ui = ui
      }
    </script>
  `);

  const index = $.html();

  return {
    index,
    staticFolder
  }
}