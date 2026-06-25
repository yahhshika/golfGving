const numbers = [20, 32, 43, 44, 45];

export default function DrawTicket() {
  return (
    <section>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

        <div>
          <p className="text-sm uppercase tracking-widest text-gray-400">
            Winning Sequence
          </p>

          <h2 className="text-3xl font-bold">
            Draw Numbers
          </h2>
        </div>

        <p className="text-gray-400">
          Drawn on : Oct 24, 2024
        </p>

      </div>

      <div className="grid grid-cols-5 gap-3 md:gap-6">

        {numbers.map((number) => (
          <div
            key={number}
            className="group aspect-square rounded-2xl border border-yellow-500/20 bg-white/5 backdrop-blur-xl flex items-center justify-center transition hover:scale-105 hover:border-yellow-400"
          >
            <span className="text-3xl md:text-5xl font-bold text-yellow-400">
              {number}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}