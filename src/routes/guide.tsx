import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guide | Nisha Kumari" },
      { name: "description", content: "A guide to real estate marketing from Nisha Kumari." },
      { property: "og:title", content: "Guide | Nisha Kumari" },
      { property: "og:description", content: "A guide to real estate marketing from Nisha Kumari." },
    ],
  }),
  component: Guide,
});

function Guide() {
  return (
    <section className="container-x section-y min-h-[60vh]">
      <Reveal>
        <p className="eyebrow">Guide</p>
        <h1 className="h1-display mt-6 max-w-3xl">The guide is on its way.</h1>
        <div className="mt-10">
          <Link to="/" className="btn btn-secondary">Back to home</Link>
        </div>
      </Reveal>
    </section>
  );
}
