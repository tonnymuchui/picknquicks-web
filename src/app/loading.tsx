export default function StorefrontLoading() {
  return (
    <main aria-busy="true" aria-label="Loading page" className="min-h-[70vh] bg-white text-black">
      <div className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-black/10">
        <div className="h-full w-1/3 animate-[loading-bar_1.1s_ease-in-out_infinite] bg-[#9a5d3b] motion-reduce:w-full motion-reduce:animate-none" />
      </div>

      <span className="sr-only">Loading page…</span>
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-7 lg:px-10 lg:py-12">
        <div className="mb-8 h-3 w-44 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(390px,0.82fr)] lg:gap-12 xl:gap-20">
          <div className="aspect-square animate-pulse rounded-lg bg-[#eee9e1] motion-reduce:animate-none" />
          <div className="space-y-5 py-2">
            <div className="h-3 w-32 animate-pulse rounded-full bg-[#9a5d3b]/20 motion-reduce:animate-none" />
            <div className="h-10 w-4/5 animate-pulse rounded bg-black/10 motion-reduce:animate-none" />
            <div className="h-4 w-40 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
            <div className="h-8 w-36 animate-pulse rounded bg-black/10 motion-reduce:animate-none" />
            <div className="space-y-3 pt-3">
              <div className="h-3 w-full animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
              <div className="h-3 w-5/6 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
            </div>
            <div className="flex gap-3 pt-5">
              <div className="h-14 w-32 animate-pulse rounded-full bg-black/10 motion-reduce:animate-none" />
              <div className="h-14 flex-1 animate-pulse rounded-full bg-black/85 motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
