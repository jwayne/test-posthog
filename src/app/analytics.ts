import "posthog-js/dist/recorder"
import "posthog-js/dist/surveys"
import "posthog-js/dist/exception-autocapture"
import "posthog-js/dist/tracing-headers"
import "posthog-js/dist/web-vitals"

import posthog, { PostHogConfig } from "posthog-js"

export function initAnalytics(configOverride?: Partial<PostHogConfig>) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well

    // Avoid needing a consent banner
    // https://posthog.com/tutorials/cookieless-tracking
    persistence: "memory",

    // Rely on custom events, not autocapture:
    // We end up missing data if we forget to label a custom event, but we
    // massively reduce our event counts. In any case, when we create
    // dashboards, we have to manually identify which autocapture events we
    // care about, so the amount of work is similar.
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: true,
    capture_heatmaps: true,
    capture_performance: true,

    disable_session_recording: true,

    // We use a modified version of `posthog-js` where we've removed external
    // dependency loading because Chrome extension Manifest v3 doesn't allow
    // loading external scripts. Instead, we bundle the desired libraries in
    // our build:
    // https://posthog.com/docs/session-replay/installation#advanced-option---bundle-all-required-extensions
    disable_external_dependency_loading: true,

    ...configOverride,
  })
  return posthog
}
