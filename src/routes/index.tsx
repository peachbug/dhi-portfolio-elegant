import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Counter } from "@/components/portfolio/Counter";
import { Reveal } from "@/components/portfolio/Reveal";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Award,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const stats = [
  { value: 9.02, decimals: 2, label: "CGPA", sub: "VIT Chennai" },
  { value: 1, label: "AWS Certification", sub: "ML Engineer — Associate", static: "AWS" },
  { value: 1, label: "Industry Internship", sub: "Engineering" },
  { value: 2, label: "Research Internships", sub: "ML & Systems" },
  { value: 190, suffix: "+", label: "LeetCode Problems", sub: "Solved" },
];

const projects = [
  {
    title: "Neural Retrieval Engine",
    tag: "Machine Learning",
    description:
      "Semantic search over 1M+ documents using dense embeddings, vector indexing, and a re-ranking transformer. Sub-100ms p95 latency.",
    stack: ["PyTorch", "FAISS", "FastAPI", "Docker"],
  },
  {
    title: "Distributed Training Framework",
    tag: "Systems",
    description:
      "Lightweight orchestration layer for multi-GPU training with fault tolerance, checkpointing, and gradient accumulation.",
    stack: ["Python", "CUDA", "Kubernetes", "gRPC"],
  },
  {
    title: "Realtime Anomaly Detection",
    tag: "Cloud",
    description:
      "Streaming pipeline detecting anomalies across telemetry with an autoencoder ensemble deployed on AWS SageMaker.",
    stack: ["AWS", "Kinesis", "Lambda", "TensorFlow"],
  },
  {
    title: "Compiler for a Typed DSL",
    tag: "Software Engineering",
    description:
      "Hindley-Milner type inference, SSA-based IR and an LLVM backend for a research DSL used in ML pipeline authoring.",
    stack: ["Rust", "LLVM", "TypeScript"],
  },
];

const experience = [
  {
    role: "Software Engineering Intern",
    company: "Industry Internship",
    period: "2025",
    detail:
      "Shipped platform improvements to production services. Owned instrumentation, latency reduction and internal ML tooling.",
  },
  {
    role: "Research Intern — Machine Learning",
    company: "Research Lab",
    period: "2024",
    detail:
      "Investigated efficient fine-tuning strategies for foundation models under constrained compute. Co-authored a workshop submission.",
  },
  {
    role: "Research Intern — Intelligent Systems",
    company: "Research Lab",
    period: "2023",
    detail:
      "Prototyped a retrieval-augmented reasoning pipeline; benchmarked against open baselines on domain-specific tasks.",
  },
];

const certifications = [
  {
    title: "AWS Certified Machine Learning Engineer",
    level: "Associate",
    issuer: "Amazon Web Services",
    year: "2025",
  },
];

const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "C++", "Rust", "Go", "SQL"],
  },
  {
    label: "ML & Research",
    items: ["PyTorch", "TensorFlow", "JAX", "scikit-learn", "Hugging Face", "LangChain"],
  },
  {
    label: "Systems & Cloud",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "Redis", "PostgreSQL"],
  },
  {
    label: "Engineering",
    items: ["FastAPI", "Node.js", "React", "gRPC", "GraphQL", "CI/CD"],
  },
];

const publications = [
  {
    title: "Efficient Retrieval-Augmented Reasoning under Compute Constraints",
    venue: "Workshop submission — placeholder",
    year: "2025",
    type: "Preprint",
  },
  {
    title: "Empirical Study of Fine-Tuning Strategies for Small Language Models",
    venue: "In preparation — placeholder",
    year: "2024",
    type: "Working paper",
  },
];

function Portfolio() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-subtle px-3 py-1 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Available for research & engineering roles
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
                  Dheetchanya<br />
                  <span className="italic text-muted-foreground">Mohan</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-xl text-xl md:text-2xl leading-snug tracking-tight text-balance">
                  Building intelligent systems through research and engineering.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  Computer Science student at VIT Chennai with interests in
                  machine learning, software engineering, cloud computing, and
                  intelligent systems.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-all"
                  >
                    View selected work
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-subtle transition-all"
                  >
                    Contact
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="relative">
                <div className="aspect-[4/5] w-full rounded-3xl bg-gradient-to-b from-subtle to-accent border border-border overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    Profile photo
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-background border border-border shadow-sm px-4 py-3 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>Chennai, India</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-border bg-border">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 60} className="bg-background p-6">
                <div className="font-display text-4xl md:text-5xl tracking-tight">
                  {s.static ? (
                    s.static
                  ) : (
                    <Counter
                      value={s.value}
                      decimals={s.decimals ?? 0}
                      suffix={s.suffix ?? ""}
                    />
                  )}
                </div>
                <div className="mt-2 text-sm font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="01 — About" title="A student engineer who ships.">
        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I focus on the intersection of applied machine learning and the
            systems that make it real — training pipelines, retrieval
            infrastructure, and reliable inference at scale. I care about
            simple abstractions, measured decisions, and code that is honest
            about its assumptions.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Currently pursuing my B.Tech in Computer Science at VIT Chennai
            with a CGPA of 9.02. Outside coursework I contribute to research,
            build side projects end-to-end, and sharpen fundamentals through
            competitive programming.
          </p>
        </div>
      </Section>

      {/* WORK */}
      <Section id="work" eyebrow="02 — Selected Work" title="Projects worth talking about.">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-primary">
                      {p.tag}
                    </div>
                    <h3 className="mt-2 text-2xl font-medium tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono rounded-md bg-subtle border border-border px-2 py-1 text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="03 — Experience" title="Where I've contributed.">
        <ol className="relative border-l border-border ml-2">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 80} as="li" className="pl-8 pb-12 last:pb-0 relative">
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-background border-2 border-primary" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-medium tracking-tight">{e.role}</h3>
                <span className="text-xs font-mono text-muted-foreground">{e.period}</span>
              </div>
              <div className="text-sm text-primary mt-1">{e.company}</div>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
                {e.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" eyebrow="04 — Certifications" title="Credentials.">
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-5">
                <div className="h-12 w-12 rounded-xl bg-subtle border border-border flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {c.issuer} · {c.year}
                  </div>
                  <h3 className="mt-1 text-lg font-medium tracking-tight">{c.title}</h3>
                  <div className="text-sm text-muted-foreground">{c.level}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="05 — Technical Skills" title="Tools I reach for.">
        <div className="space-y-10">
          {skillGroups.map((g, i) => (
            <Reveal key={g.label} delay={i * 60}>
              <div className="grid md:grid-cols-[180px_1fr] gap-6 items-start">
                <div className="text-sm font-mono uppercase tracking-wider text-muted-foreground pt-2">
                  {g.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="cursor-default rounded-full border border-border bg-background px-4 py-1.5 text-sm transition-all duration-200 hover:border-foreground/40 hover:bg-subtle hover:-translate-y-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* RESEARCH */}
      <Section id="research" eyebrow="06 — Publications & Research" title="Writing and research.">
        <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
          {publications.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <a
                href="#"
                className="group flex items-start justify-between gap-6 p-6 hover:bg-subtle transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="h-10 w-10 rounded-lg bg-subtle border border-border flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {p.type} · {p.year}
                    </div>
                    <h3 className="mt-1 text-lg font-medium tracking-tight">
                      {p.title}
                    </h3>
                    <div className="text-sm text-muted-foreground mt-1">{p.venue}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-3xl border border-border bg-subtle p-12 md:p-20 text-center">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" /> 07 — Contact
              </div>
              <h2 className="mt-4 font-display text-5xl md:text-7xl tracking-tight text-balance">
                Let's build something <span className="italic text-muted-foreground">worthwhile.</span>
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
                Open to research collaborations, internships, and engineering
                roles where thoughtful systems make a real difference.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:hello@example.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-all"
                >
                  <Mail className="h-4 w-4" /> hello@example.com
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-background/60 transition-all"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-background/60 transition-all"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Dheetchanya Mohan</div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <GraduationCap className="h-3.5 w-3.5" /> VIT Chennai
            <span className="mx-2">·</span>
            <Briefcase className="h-3.5 w-3.5" /> Engineering
            <span className="mx-2">·</span>
            <FlaskConical className="h-3.5 w-3.5" /> Research
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-28 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-balance mb-16">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
