"use client"

import "posthog-js/dist/recorder"
import "posthog-js/dist/surveys"
import "posthog-js/dist/exception-autocapture" // NOTE: commenting this out will disable the error
import "posthog-js/dist/tracing-headers"
import "posthog-js/dist/web-vitals"

import posthog, { PostHogConfig } from "posthog-js"

export function initAnalytics(configOverride?: Partial<PostHogConfig>) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    persistence: "memory",

    autocapture: true,
    capture_pageview: false, // We will add the recommended PostHogPageView component later
    capture_pageleave: true,
    capture_heatmaps: true,
    capture_performance: true,

    disable_session_recording: true,

    // https://posthog.com/docs/session-replay/installation#advanced-option---bundle-all-required-extensions
    disable_external_dependency_loading: true,

    ...configOverride,
  })
  return posthog
}
