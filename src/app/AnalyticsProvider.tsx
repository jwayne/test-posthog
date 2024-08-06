"use client"

import { PostHogProvider } from "posthog-js/react"
import { useMemo } from "react"

import { initAnalytics } from "@/app/analytics"

type AnalyticsProviderProps = React.PropsWithChildren<{
  user: { id: string } | null
}>

export function AnalyticsProvider(props: AnalyticsProviderProps) {
  const posthog = useMemo(() => {
    return initAnalytics(
      props.user
        ? {
            bootstrap: {
              distinctID: props.user.id,
              isIdentifiedID: true,
            },
          }
        : undefined
    )
  }, [props.user])

  return <PostHogProvider client={posthog}>{props.children}</PostHogProvider>
}
