const stats = [
  { value: "250Cr+", label: "Saved Together" },
  { value: "4.5M Kg", label: "CO₂ Emissions Saved" },
  { value: "100K+", label: "Products In Circulation" },
];

export function Stats() {
  return (
    <section className="py-8 bg-white text-white">
      <dl className="grid gap-6 text-center md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-5xl font-bold text-blue-700">
                {stat.value}
              </span>
              <span className="mt-1 block text-sm text-white/70">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
