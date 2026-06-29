const fs = require('fs');
const path = require('path');

const srcDir = '/home/yashodhan/Documents/vahan/Site2/vahan-homepage';
const dstDir = '/home/yashodhan/Documents/vahan/Site3';

console.log("Copying vahan-homepage to Site3...");

// Recursively copy directory, excluding node_modules and .git
function copyRecursiveSync(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (path.basename(src) === 'node_modules' || path.basename(src) === '.git') return;
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(srcDir, dstDir);

console.log("Applying Cooper Lt BT font selectively to styles.css...");

const stylesCssPath = path.join(dstDir, 'src', 'styles.css');
let cssContent = fs.readFileSync(stylesCssPath, 'utf8');

const additionalCSS = `
/* 
========================================
COOPER LT BT FONT OVERRIDES (SVG DESIGN)
========================================
*/
@font-face {
  font-family: 'Cooper Lt BT';
  src: local('Cooper Light BT'), local('Cooper Lt BT');
  /* Note: Assuming the font is available locally on the system. */
}

/* Hero & Section Headings */
h1, h2, .section-heading, .heading, .hero-h1 {
  font-family: "Cooper Lt BT", "Cooper", serif !important;
}

/* Key High-Impact Stats (76%, 100,000+, 40,000) */
.stat-number, .num, .pstat {
  font-family: "Cooper Lt BT", "Cooper", serif !important;
}

/* CTA Block Heading */
.cta-h, .cta-heading {
  font-family: "Cooper Lt BT", "Cooper", serif !important;
}
`;

fs.writeFileSync(stylesCssPath, cssContent + "\n" + additionalCSS);

console.log("Done! Site3 is now set up with the correct font applied to headings and stats.");
