function SectionTitle({ children }) {
  return (
      <div className="mb-8 text-center">
        <h2 className="text-sm uppercase tracking-[0.45em] text-slate-700">
          {children}
        </h2>
        <div className="mx-auto mt-3 h-px w-8 bg-emerald-500" />
      </div>
  )
}

export { SectionTitle }
