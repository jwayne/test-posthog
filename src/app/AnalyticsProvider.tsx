"use client"

import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

import { initAnalytics } from "@/app/analytics"

type AnalyticsProviderProps = React.PropsWithChildren<{
  user: { id: string }
}>

initAnalytics()
export function AnalyticsProvider(props: AnalyticsProviderProps) {
  return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>
}
