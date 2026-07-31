import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'

// Static-site-generation entry. vite-react-ssg prerenders every route in
// routes.tsx to real HTML, then hydrates on the client. This replaces the
// ReactDOM.createRoot bootstrap, which served an empty <div id="root"> to
// anything that did not run JavaScript.
export const createRoot = ViteReactSSG({ routes })
