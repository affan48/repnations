import fs from 'fs';

async function checkSite() {
  const res = await fetch('https://repnations.com');
  const html = await res.text();
  
  // Find images containing logo
  const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  const logoImgs = imgMatches.filter(m => /logo|brand|repnation/i.test(m[0]));
  console.log('Logo images:', logoImgs.map(m => m[1]));

  // Find favicon
  const favMatch = html.match(/<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["']/i);
  console.log('Favicon:', favMatch ? favMatch[1] : null);

  // Check header text
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    console.log('Header snippet:', headerMatch[0].slice(0, 400));
  }
}

checkSite();
