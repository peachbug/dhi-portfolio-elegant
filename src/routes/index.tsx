import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Counter } from "@/components/portfolio/Counter";
import { Reveal } from "@/components/portfolio/Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  BadgeCheck,
  Hash,
} from "lucide-react";


export const Route = createFileRoute("/")({
  component: Portfolio,
});

// Easy to update later
const LEETCODE_SOLVED = 190;

const stats: Array<{
  value?: number;
  decimals?: number;
  suffix?: string;
  static?: string;
  label: string;
  sub: string;
}> = [
  { value: 9.02, decimals: 2, label: "CGPA", sub: "VIT Chennai" },
  { static: "AWS", label: "Machine Learning Engineer", sub: "Associate" },
  { static: "Alstom", label: "Industry Internship", sub: "Data Science & ML" },
  { static: "Research", label: "2 Internships", sub: "QML + Audio" },
  { value: LEETCODE_SOLVED, suffix: "+", label: "LeetCode Problems", sub: "Solved" },
];

const currentlyItems = [
  "Preparing for AWS Certified Solutions Architect – Associate",
  "Building a BEV Intelligent Power Module failure prediction system",
  "Researching deep learning based audio steganography",
  "Solving Striver's DSA Sheet",
];


type Project = {
  title: string;
  status: string;
  description: string;
  stack: string[];
  links?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "Explainable Deep Learning for Invasive Fish Risk Prediction",
    status: "Personal Project",
    description:
      "Dual-branch BiLSTM + Attention model using ecological and climate datasets to predict invasive fish establishment risk. Applied SHAP and temporal attribution methods to explain predictions.",
    stack: ["Python", "PyTorch", "SHAP", "BiLSTM"],
  },
  {
    title: "Review Insight Engine",
    status: "Personal Project",
    description:
      "AI-powered review analysis platform that extracts feature-level sentiment and generates structured product insights from customer reviews using Gemini.",
    stack: ["React", "TypeScript", "Node.js", "Gemini API"],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Live Demo", href: "#" },
    ],
  },
  {
    title: "Audio Steganography Using Deep Learning",
    status: "Ongoing Research",
    description:
      "Research internship investigating deep learning techniques for robust audio steganography with emphasis on payload capacity, imperceptibility and robustness.",
    stack: ["Python", "Deep Learning", "Signal Processing"],
  },
  {
    title: "BEV Intelligent Power Module (IPM) Failure Prediction",
    status: "In Development",
    description:
      "Machine learning system for predicting Intelligent Power Module failures in Battery Electric Vehicles using thermal and operational data.",
    stack: ["Python", "Machine Learning", "Predictive Maintenance"],
  },
];

const experience = [
  {
    role: "Data Science & Machine Learning Intern",
    company: "Alstom Transportation India Pvt Ltd",
    period: "June 2025 – August 2025",
    bullets: [
      "Analyzed TCMS maintenance data to identify locomotive failure patterns and early warning indicators.",
      "Performed exploratory data analysis across operational variables.",
      "Developed and evaluated Random Forest and XGBoost models for predictive maintenance investigations.",
    ],
  },
];

const research = [
  {
    title:
      "Robustness of Hybrid-Classical Binary Classifiers Under Realistic Remote Sensing Degradations",
    status: "Journal Submitted",
    pills: ["Journal Submitted", "Earth Science Informatics", "2026"],
    description:
      "Research investigating the robustness of hybrid quantum-classical classifiers under realistic remote sensing degradations.",
  },
  {
    title: "Deep Learning Based Audio Steganography",
    status: "Ongoing Research",
    pills: ["SRIP Internship", "SCOPE, VIT Chennai", "2025"],
    description:
      "Research focused on improving payload capacity, imperceptibility, and robustness in audio steganography using deep learning techniques.",
  },
];


const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "Machine Learning",
    items: [
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Explainable AI",
      "Feature Engineering",
      "Deep Learning",
    ],
  },
  {
    label: "Cloud",
    items: ["AWS", "Docker", "Git", "GitHub"],
  },
  {
    label: "Web",
    items: ["React", "Node.js", "Flask"],
  },
];

function Portfolio() {
  const [certOpen, setCertOpen] = useState(false);

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
                  Final-year CS student · open to opportunities
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
                  Computer Science student building practical machine learning
                  systems through software engineering and research.
                </p>

              </Reveal>
              <Reveal delay={240}>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                  Studying at VIT Chennai. Interested in practical ML,
                  cloud-native software, and research that connects
                  experimentation with real-world use.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-all"
                  >
                    View what I'm building
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-subtle transition-all"
                  >
                    <FileText className="h-4 w-4" /> Download Resume
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
                      value={s.value ?? 0}
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
      <Section id="about" eyebrow="01 — About" title="A student engineer, learning by building.">
        <div className="grid md:grid-cols-2 gap-12">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a Computer Science student at VIT Chennai with a strong
            interest in machine learning, software engineering, cloud computing,
            and intelligent systems. I enjoy building practical projects,
            contributing to research, and understanding how intelligent systems
            move from experimentation into real-world applications.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Alongside academics, I've completed an industry internship at
            Alstom, earned the AWS Certified Machine Learning Engineer –
            Associate certification, and currently contributing to research in
            quantum machine learning and deep learning. Outside academics, I
            enjoy solving algorithmic problems, reading, and continuously
            improving my engineering skills through personal projects.
          </p>

        </div>
      </Section>

      {/* WORK */}
      <Section
        id="work"
        eyebrow="02 — Selected Work"
        title="Things I'm Building."
        subtitle="A selection of projects spanning software engineering, machine learning and research."
      >

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider rounded-full border border-border bg-subtle px-2.5 py-1 text-muted-foreground">
                    {p.status}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-5 text-2xl font-medium tracking-tight leading-snug">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
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
                {p.links && (
                  <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-4 text-sm">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                      >
                        {l.label === "GitHub" ? (
                          <Github className="h-3.5 w-3.5" />
                        ) : (
                          <ExternalLink className="h-3.5 w-3.5" />
                        )}
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="03 — Experience" title="My Journey So Far.">
        <ol className="relative border-l border-border ml-2">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 80} as="li" className="pl-8 pb-12 last:pb-0 relative">
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-background border-2 border-primary" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-medium tracking-tight">{e.role}</h3>
                <span className="text-xs font-mono text-muted-foreground">{e.period}</span>
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-subtle text-[10px] font-mono font-semibold tracking-tight text-primary"
                  title="Alstom"
                >
                  AL
                </span>
                <span className="text-sm text-primary">{e.company}</span>
              </div>

              <ul className="mt-3 space-y-2 max-w-2xl">
                {e.bullets.map((b) => (
                  <li key={b} className="text-[15px] leading-relaxed text-muted-foreground flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* RESEARCH */}
      <Section id="research" eyebrow="04 — Research" title="Research in Progress.">
        <div className="grid md:grid-cols-2 gap-6">
          {research.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-border bg-card p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="h-10 w-10 rounded-lg bg-subtle border border-border flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider rounded-full border border-border bg-subtle px-2.5 py-1 text-muted-foreground">
                    {r.status}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-tight leading-snug">
                  {r.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[11px] font-mono rounded-md bg-subtle border border-border px-2 py-1 text-muted-foreground"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  {r.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CREDENTIALS */}
      <Section id="credentials" eyebrow="05 — Credentials" title="Credentials.">
        <Reveal>
          <button
            type="button"
            onClick={() => setCertOpen(true)}
            className="group w-full text-left rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#232F3E] to-[#131A22] flex items-center justify-center shrink-0 shadow-sm">
                <div className="text-center leading-tight">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#FF9900]">
                    AWS
                  </div>
                  <div className="text-[8px] font-mono uppercase tracking-wider text-white/80 mt-0.5">
                    Certified
                  </div>
                  <ShieldCheck className="h-4 w-4 text-[#FF9900] mx-auto mt-1" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Amazon Web Services
                </div>
                <h3 className="mt-1 text-xl font-medium tracking-tight">
                  AWS Certified Machine Learning Engineer – Associate
                </h3>
                <div className="text-sm text-muted-foreground mt-1">
                  Click to view credential details
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </Reveal>

        <Dialog open={certOpen} onOpenChange={setCertOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="mx-auto mb-4 h-28 w-28 rounded-2xl bg-gradient-to-br from-[#232F3E] to-[#131A22] flex items-center justify-center shadow-md">
                <div className="text-center leading-tight">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF9900]">
                    AWS
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/80 mt-1">
                    Certified
                  </div>
                  <ShieldCheck className="h-6 w-6 text-[#FF9900] mx-auto mt-1.5" />
                  <div className="text-[8px] font-mono uppercase tracking-wider text-white/70 mt-1">
                    ML Engineer
                  </div>
                </div>
              </div>
              <DialogTitle className="text-center text-xl">
                AWS Certified Machine Learning Engineer – Associate
              </DialogTitle>
              <DialogDescription className="text-center">
                Issued by Amazon Web Services
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border bg-subtle p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Issued
                </div>
                <div className="mt-1 font-medium">—</div>
              </div>
              <div className="rounded-lg border border-border bg-subtle p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Expires
                </div>
                <div className="mt-1 font-medium">—</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                <ShieldCheck className="h-4 w-4" /> Verify credential
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-subtle transition-colors"
              >
                <ExternalLink className="h-4 w-4" /> View on Credly
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="06 — Technical Skills" title="Tools I reach for.">
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
                Open to internships, research collaborations, and engineering
                roles where I can keep learning and contributing.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:hello@example.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-all"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-background/60 transition-all"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
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
                  <FileText className="h-4 w-4" /> Resume
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
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
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
          <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-balance">
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={140}>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </Reveal>
        )}
        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}

