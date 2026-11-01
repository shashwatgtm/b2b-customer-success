# Customer Success hosted transport candidate

The function at `netlify/functions/mcp.mjs` serves stateless Streamable HTTP at `/mcp` from the same `createServer()` used by stdio. The candidate build base is this `server/` folder. `npm ci` and `npm run build` prepare it locally. No site, hostname, account or environment setting has been selected or changed. Nothing has been deployed.

The source follows the five existing hosted server patterns: one transport per request, JSON responses, POST only, 256 KB body limit, 4,000 characters per text value, schema type checks, no-store and inert error output, protocol version normalization, and platform rate-limit metadata (300 requests per 60 seconds per IP and domain). Platform rate limiting is not exercised by local tests. Tool validation remains in the shared server. Widgets and resources use the same server registrations.

There is no REST form API or new form. Usage counting is not configured: the existing hosted servers use a separate blob dependency and service; adding that dependency or selecting a service is outside this step. A future hosted rollout needs an owner decision on usage counting and a hostname, plus a real host audit. No runtime dependency or package version changed.
