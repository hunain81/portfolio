/*
 * Profile photo module.
 *
 * This committed file holds only a neutral placeholder avatar — the real
 * personal photo is intentionally NOT stored in this repository.
 *
 * To show the real photo locally / on the deployed site:
 *   1. Create  src/photoData.local.js
 *   2. Inside it put:  const photo = "data:image/jpeg;base64,..."; export default photo
 *   3. photoData.local.js is git-ignored, so it never gets pushed to GitHub.
 *
 * If photoData.local.js exists it is used automatically; otherwise the
 * placeholder below is shown so the project always builds.
 */

// Neutral rose-gold placeholder avatar (inline SVG, safe to commit).
const placeholder =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0" stop-color="#e8b298"/>
           <stop offset="1" stop-color="#eeb59c"/>
         </linearGradient>
       </defs>
       <rect width="400" height="400" fill="url(#g)"/>
       <circle cx="200" cy="160" r="70" fill="#fffdfb" opacity="0.9"/>
       <path d="M90 360c0-70 50-110 110-110s110 40 110 110z" fill="#fffdfb" opacity="0.9"/>
       <text x="200" y="385" font-family="Georgia, serif" font-size="24"
             fill="#b76e64" text-anchor="middle">Noor ul Ain</text>
     </svg>`
  )

// Try to load the real (git-ignored) photo if it exists.
let photo = placeholder
const localModules = import.meta.glob('./photoData.local.js', { eager: true })
const localKey = Object.keys(localModules)[0]
if (localKey && localModules[localKey] && localModules[localKey].default) {
  photo = localModules[localKey].default
}

export default photo
