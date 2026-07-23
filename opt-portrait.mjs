import sharp from "sharp";

const src = "content/portrait-source.png";
const meta = await sharp(src).metadata();

// Rail portrait: displayed ~215px wide, so 900px covers 4x density comfortably.
await sharp(src)
  .resize(900, 900, { fit: "cover", position: "attention" })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("content/portrait.jpg");

// Social share card: 1200x630, portrait anchored right on a dark ground.
const W = 1200;
const H = 630;
const face = await sharp(src)
  .resize(560, 630, { fit: "cover", position: "attention" })
  .toBuffer();

await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 11, g: 7, b: 9, alpha: 1 } },
})
  .composite([
    { input: face, left: W - 560, top: 0 },
    {
      input: Buffer.from(
        `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <linearGradient id="fade" x1="0" x2="1">
               <stop offset="0.42" stop-color="#0B0709" stop-opacity="1"/>
               <stop offset="0.72" stop-color="#0B0709" stop-opacity="0"/>
             </linearGradient>
           </defs>
           <rect x="520" y="0" width="300" height="${H}" fill="url(#fade)"/>
           <text x="72" y="250" fill="#EDE4D6" font-family="Arial Narrow, Arial, sans-serif"
                 font-size="86" font-weight="700" letter-spacing="1">DANIEL FORERO</text>
           <text x="74" y="316" fill="#C9A15B" font-family="Consolas, monospace"
                 font-size="27" letter-spacing="5">OPERATOR / ANGEL INVESTOR</text>
           <rect x="74" y="356" width="86" height="3" fill="#C9A15B"/>
           <text x="74" y="416" fill="#C5B5AD" font-family="Arial, sans-serif" font-size="25">
             AI &#183; Web3 &#183; Quantum &#183; Fintech
           </text>
           <text x="74" y="456" fill="#917D78" font-family="Consolas, monospace" font-size="20"
                 letter-spacing="3">danielforeroj.com</text>
         </svg>`
      ),
      left: 0,
      top: 0,
    },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/og.jpg");

console.log(`source ${meta.width}x${meta.height}`);
