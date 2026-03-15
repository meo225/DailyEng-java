"use client"

// Client boundary wrapper for lazily-loaded layout components
// (next/dynamic with ssr:false requires a Client Component boundary)
import dynamic from "next/dynamic"

const Dorara = dynamic(
  () => import("@/components/layout/dorara").then((m) => ({ default: m.Dorara })),
  { ssr: false }
)

const SearchCommand = dynamic(
  () =>
    import("@/components/layout/search-command").then((m) => ({
      default: m.SearchCommand,
    })),
  { ssr: false }
)

export function LazyLayoutComponents() {
  return (
    <>
      <Dorara />
      <SearchCommand />
    </>
  )
}
