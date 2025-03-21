const plans = [
  {
    id: "free",
  },
  {
    id: "basic",
  },
  {
    id: "pro",
  },
];

const PricingCard = () => {
  return <div>Pricing Card</div>;
};

export default function PricingSection() {
  return (
    <section>
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-4
        lg:px-8 lg:pt-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40
            -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35% ",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678
          w-[36.125rem] -translate-x-0.5 rotate-[30deg]
          bg-linear-to-br from-slate-700 via-stone-800 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>
        <div>
          <h2>Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
