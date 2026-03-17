export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="glass-card mb-10 rounded-3xl p-6 sm:p-10">
        <div className="skeleton h-4 w-24 rounded-md" />
        <div className="skeleton mt-4 h-10 w-full max-w-2xl rounded-md" />
        <div className="skeleton mt-3 h-5 w-full max-w-xl rounded-md" />
      </section>
      <section className="glass-card mb-8 rounded-2xl p-4 sm:p-5">
        <div className="skeleton h-4 w-24 rounded-md" />
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
          <div className="skeleton h-10 rounded-md" />
          <div className="skeleton h-10 rounded-md" />
          <div className="skeleton h-10 rounded-lg" />
          <div className="skeleton h-10 rounded-lg" />
        </div>
      </section>
      <section className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="skeleton h-7 w-40 rounded-md" />
        <div className="skeleton mt-3 h-5 w-64 rounded-md" />
        <div className="skeleton mt-4 h-[320px] w-full rounded-lg sm:h-[420px]" />
      </section>
    </main>
  );
}
