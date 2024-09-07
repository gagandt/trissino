import Balancer from "react-wrap-balancer";

export const fetchCache = "force-cache";

export const revalidate = 3600;

export default function IndexPage() {
  return (
    <section id="hero">
      <div className="mt-4 flex flex-col items-start gap-6 px-7 text-center md:mt-20 md:items-center">
        <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
          <h1 className="relative mx-0 max-w-[43.5rem] text-balance bg-gradient-to-br from-black from-50% to-neutral-200/60 bg-clip-text pt-5 text-left text-3xl font-semibold tracking-tighter text-transparent dark:text-white sm:text-7xl md:mx-auto md:px-4 md:py-2 md:text-center md:text-7xl lg:text-7xl">
            <Balancer>Branding Research Empowered by AI</Balancer>
          </h1>
        </div>
        <p className="max-w-xl text-balance text-left text-base tracking-tight text-black dark:font-medium dark:text-white md:text-center md:text-lg">
          AI-powered agent for brand research
        </p>
      </div>
    </section>
  );
}
