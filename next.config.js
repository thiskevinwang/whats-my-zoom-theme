const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

/**
 *
 * https://github.com/zeit/next.js/tree/canary/examples/with-env-from-next-config-js
 */
// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    TRACKING_ID: (() => {
      if (isDev) {
        console.log(process.env.TRACKING_ID);
        return "process.env.TRACKING_ID";
      }
      if (isProd) {
        console.log(process.env.TRACKING_ID);
        return process.env.TRACKING_ID;
      }
      return "TRACKING_ID:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
  };

  // next.config.js object
  return {
    env,
  };
};
