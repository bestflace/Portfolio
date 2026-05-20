"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Sun,
  BookOpen,
  BriefcaseBusiness,
  Compass,
  Feather,
  Menu,
  X,
  Waves,
  Fish,
} from "lucide-react";

type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type NavLink = {
  label: string;
  id: string;
};

type Project = {
  number: string;
  archetype: string;
  name: string;
  time: string;
  type: string;
  stack: string[];
  description: string;
  points: string[];
};

type ContactItem =
  | {
      label: string;
      value: string;
      type: "icon";
      Icon: IconComponent;
    }
  | {
      label: string;
      value: string;
      type: "text";
      initials: string;
    };

type SmoothButtonProps = {
  target: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  dark?: boolean;
};

type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
};

type TextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const navLinks: NavLink[] = [
  { label: "Home", id: "home" },
  { label: "About Me", id: "about-me" },
  { label: "Projects", id: "projects" },
  { label: "Tarot", id: "tarot" },
  { label: "Contact", id: "contact" },
];

const projects: Project[] = [
  {
    number: "I",
    archetype: "The Learner",
    name: "AI-powered IELTS Practice Platform",
    time: "Feb 2026 – Jun 2026",
    type: "Personal Project",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "Redis",
    ],
    description:
      "A full-stack IELTS practice platform supporting Listening, Reading, Writing, and Speaking modules with AI-assisted grading.",
    points: [
      "Developed a full-stack IELTS practice platform covering all four IELTS skills.",
      "Designed core flows for test attempts, answer saving, grading status, and learning activities.",
      "Prepared use case specifications, activity diagrams, sequence diagrams, ERD, and requirement documents.",
    ],
  },
  {
    number: "II",
    archetype: "The Keeper",
    name: "Personal Finance Management System with AI Chatbot",
    time: "Sep 2025 – Jan 2026",
    type: "Personal Project",
    stack: ["React.js", "React Native", "Node.js", "JavaScript", "PostgreSQL"],
    description:
      "A web and mobile system for expense tracking, budget management, reminders, and AI chatbot-based financial queries.",
    points: [
      "Built web and mobile features for expense tracking, budget management, and financial reminders.",
      "Integrated an AI chatbot to support financial queries and personalized interaction.",
      "Designed requirement documents, use case specifications, activity diagrams, sequence diagrams, and ERD.",
    ],
  },
  {
    number: "III",
    archetype: "The Architect",
    name: "Veterinary Store Management System",
    time: "Sep 2025 – Jan 2026",
    type: "Academic Project",
    stack: ["ASP.NET Core", "C#", "PostgreSQL"],
    description:
      "A veterinary medicine and animal feed distribution management system focused on backend and software architecture analysis.",
    points: [
      "Worked on backend development and software architecture analysis.",
      "Prepared SAD, ADD, user stories, product backlog, ASRs, utility tree, fault tree analysis, and UML diagrams.",
      "Practiced requirement traceability, architecture reasoning, and structured system documentation.",
    ],
  },
];

const contactLinks: ContactItem[] = [
  { label: "Email", value: "your-email@gmail.com", type: "icon", Icon: Mail },
  {
    label: "GitHub",
    value: "Add GitHub link here",
    type: "text",
    initials: "GH",
  },
  {
    label: "LinkedIn",
    value: "Add LinkedIn link here",
    type: "text",
    initials: "in",
  },
  {
    label: "Facebook",
    value: "Add Facebook link here",
    type: "text",
    initials: "f",
  },
  {
    label: "Instagram",
    value: "Add Instagram link here",
    type: "text",
    initials: "IG",
  },
  {
    label: "Location",
    value: "Quảng Ngãi / Ho Chi Minh City, Vietnam",
    type: "icon",
    Icon: MapPin,
  },
];

function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  const navOffset = 84;
  const targetTop =
    target.getBoundingClientRect().top + window.scrollY - navOffset;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}

function BrandMark({ item }: { item: ContactItem }) {
  if (item.type === "icon") {
    const Icon = item.Icon;
    return <Icon className="mb-4 h-6 w-6 text-cyan-700" />;
  }

  return (
    <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-700/35 bg-cyan-100/65 font-serif text-xs font-bold text-cyan-900">
      {item.initials}
    </div>
  );
}

function SmoothButton({
  target,
  children,
  className = "",
  onClick,
}: SmoothButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToSection(target);
        onClick?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-900/10 bg-[#e9fbfb]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-8">
        <SmoothButton
          target="home"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2 font-serif text-lg font-bold tracking-wide text-slate-900 sm:text-xl"
        >
          <Fish className="h-5 w-5 shrink-0 text-cyan-700" strokeWidth={1.75} />
          <span className="truncate">BestFlace</span>
        </SmoothButton>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <SmoothButton
              key={link.id}
              target={link.id}
              className="text-sm font-medium text-slate-900/75 transition hover:text-cyan-700"
            >
              {link.label}
            </SmoothButton>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SmoothButton
            target="tarot"
            className="hidden rounded-full border border-cyan-700/35 bg-white/45 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-cyan-800 hover:bg-cyan-100/65 sm:inline-flex"
          >
            Guidance Room
          </SmoothButton>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-900/15 bg-white/55 text-slate-900 shadow-sm md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-cyan-900/10 bg-[#e9fbfb]/95 px-4 pb-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-3">
            {navLinks.map((link) => (
              <SmoothButton
                key={link.id}
                target={link.id}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-900/75 transition hover:bg-cyan-100/65 hover:text-cyan-900"
              >
                {link.label}
              </SmoothButton>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
    >
      <p
        className={`mb-3 text-[0.68rem] font-bold uppercase tracking-[0.26em] sm:text-xs sm:tracking-[0.35em] ${
          dark ? "text-cyan-50" : "text-cyan-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-3xl font-bold sm:text-4xl md:text-6xl ${
          dark ? "text-[#fff8e8]" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-sm leading-7 sm:text-base md:text-lg ${
          dark ? "text-[#fff8e8]/76" : "text-slate-900/70"
        }`}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}

function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen scroll-mt-24 overflow-hidden px-4 pb-16 pt-28 sm:px-5 sm:pt-32 lg:px-8 lg:pt-40"
    >
      <div className="absolute left-4 top-28 h-52 w-52 rounded-full bg-cyan-300/60 blur-3xl sm:left-10 sm:h-72 sm:w-72" />
      <div className="absolute bottom-20 right-4 h-56 w-56 rounded-full bg-sky-300/45 blur-3xl sm:right-10 sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-[#3eeadf]/25 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.68)_0%,rgba(204,251,241,0.58)_38%,rgba(91,213,218,0.28)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(#0891b2 0.8px, transparent 0.8px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#e9fbfb] to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="min-w-0"
        >
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-900/15 bg-white/55 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm sm:text-sm">
            <Waves className="h-4 w-4 shrink-0 text-cyan-700" />
            <span className="truncate">Between Logic & Intuition</span>
          </div>

          <h1 className="max-w-full break-words font-serif text-4xl font-bold leading-[0.98] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
            Nguyễn Chí Vĩ
          </h1>

          <p className="mt-4 font-serif text-2xl italic text-cyan-700 sm:text-3xl md:text-4xl">
            BestFlace
          </p>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-900/80 sm:text-lg">
            Software Engineering Student | Business Analyst & Full Stack
            Developer Aspirant
          </p>

          <p className="mt-5 max-w-2xl font-serif text-2xl leading-tight text-slate-900 sm:text-3xl md:text-4xl">
            Building systems with logic, reading stories with intuition.
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-900/70 sm:text-base sm:leading-8">
            I am a Software Engineering student at UIT – VNUHCM, originally from
            Quảng Ngãi. My work lives between structured thinking and human
            understanding — from analyzing requirements and building full-stack
            applications to listening to stories and offering thoughtful
            guidance through Tarot.
          </p>

          <blockquote className="mt-7 max-w-2xl border-l-2 border-cyan-700/60 pl-5 font-serif text-lg italic leading-8 text-slate-900/85 sm:text-xl">
            “Nothing is as important as taking up spaces in society and
            cementing yourself.”
            <span className="mt-2 block text-sm not-italic tracking-wide text-slate-900/55">
              — Zozibini Tunzi
            </span>
          </blockquote>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SmoothButton
              target="projects"
              className="rounded-full bg-cyan-700 px-6 py-3 text-center text-sm font-bold text-[#fff8e8] shadow-lg shadow-cyan-950/18 transition hover:-translate-y-0.5 hover:bg-cyan-950"
            >
              View My Projects
            </SmoothButton>

            <SmoothButton
              target="tarot"
              className="rounded-full border border-cyan-800/45 bg-white/45 px-6 py-3 text-center text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-100/60"
            >
              Enter The Guidance Room
            </SmoothButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-cyan-300/30 blur-3xl sm:-inset-6 sm:rounded-[3rem]" />

          <div className="relative rounded-[1.7rem] border border-cyan-700/45 bg-[#f9f6ea] p-3 shadow-2xl shadow-cyan-950/18 sm:rounded-[2rem] sm:p-4">
            <div className="rounded-[1.35rem] border border-cyan-900/18 bg-gradient-to-b from-[#bff9f4] via-[#e8fffb] to-[#fbf2df] p-3 sm:rounded-[1.5rem] sm:p-4">
              <div className="mb-4 flex items-center justify-between text-cyan-700">
                <Sun className="h-6 w-6" strokeWidth={1.6} />
                <span className="font-serif text-xs uppercase tracking-[0.3em] sm:text-sm sm:tracking-[0.35em]">
                  BestFlace
                </span>
                <Sun className="h-6 w-6" strokeWidth={1.6} />
              </div>

              <div className="aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-cyan-900/20 bg-gradient-to-b from-cyan-100/85 via-sky-100/75 to-[#f9f6ea]">
                <img
                  src="/images/avatar.png"
                  alt="Nguyễn Chí Vĩ - BestFlace"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 text-center font-serif text-lg font-bold text-slate-900 sm:text-xl">
                The Pisces Seeker
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const cards: {
    title: string;
    content: string;
    Icon: IconComponent;
  }[] = [
    { title: "Origin", content: "Quảng Ngãi, Vietnam", Icon: Compass },
    {
      title: "Education",
      content: "Software Engineering — UIT, VNUHCM",
      Icon: BookOpen,
    },
    {
      title: "Direction",
      content: "Business Analyst & Full Stack Developer",
      Icon: BriefcaseBusiness,
    },
    {
      title: "Personality",
      content: "ISTJ — structured, responsible, thoughtful",
      Icon: Fish,
    },
  ];

  return (
    <section
      id="about-me"
      className="scroll-mt-24 px-4 py-20 sm:px-5 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="The Story Behind BestFlace"
          title="About Me"
          subtitle="A mind for structure, a heart for stories."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="rounded-[1.5rem] border border-cyan-900/15 bg-[#f9f6ea]/88 p-5 shadow-xl shadow-cyan-950/5 sm:rounded-[2rem] sm:p-8"
          >
            <p className="text-sm leading-7 text-slate-900/75 sm:text-base sm:leading-8">
              My name is{" "}
              <strong className="text-slate-900">Nguyễn Chí Vĩ</strong>, also
              known as <strong className="text-slate-900">BestFlace</strong>. I
              come from Quảng Ngãi and I am currently studying Software
              Engineering at the University of Information Technology – VNUHCM.
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-900/75 sm:text-base sm:leading-8">
              As an ISTJ, I naturally lean toward structure, clarity,
              responsibility, and careful thinking. I enjoy understanding how
              systems work, how users think, and how ideas can become meaningful
              digital products.
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-900/75 sm:text-base sm:leading-8">
              Beyond technology, I enjoy traveling, listening to music, learning
              languages, and reflecting on personal stories. I am currently
              improving my English through IELTS and exploring Japanese through
              JLPT.
            </p>

            <div className="mt-8 rounded-[1.25rem] border border-cyan-700/25 bg-[#dff8f5] p-5 sm:rounded-[1.5rem] sm:p-6">
              <p className="font-serif text-xl italic leading-8 text-slate-900 sm:text-2xl sm:leading-10">
                “I live between two worlds: the world of logic and the world of
                intuition. BestFlace is where these two sides meet.”
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className="rounded-3xl border border-cyan-900/15 bg-white/50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-700/45 hover:shadow-xl hover:shadow-cyan-950/5"
              >
                <card.Icon
                  className="mb-4 h-6 w-6 text-cyan-700"
                  strokeWidth={1.7}
                />

                <h3 className="font-serif text-2xl font-bold text-slate-900">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-900/65">
                  {card.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#006c85] via-[#00a7b7] to-[#70d9d2] px-4 py-20 text-[#fff8e8] sm:px-5 sm:py-24 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.34) 0px, rgba(255,255,255,0.34) 2px, transparent 2px, transparent 22px)",
        }}
      />

      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          dark
          eyebrow="Selected Works"
          title="Projects"
          subtitle="Systems I have built, analyzed, and documented."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="min-w-0 rounded-[1.5rem] border border-cyan-100/55 bg-[#f9f6ea] p-5 text-slate-900 shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:border-white sm:rounded-[2rem] sm:p-6"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-900/15 pb-4">
                <span className="font-serif text-4xl font-bold text-cyan-700">
                  {project.number}
                </span>

                <span className="rounded-full border border-cyan-900/15 bg-cyan-100/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-900 sm:text-xs sm:tracking-[0.2em]">
                  {project.archetype}
                </span>
              </div>

              <h3 className="break-words font-serif text-2xl font-bold leading-tight sm:text-3xl">
                {project.name}
              </h3>

              <p className="mt-3 text-sm font-semibold leading-6 text-cyan-700">
                {project.time} · {project.type}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-900/70">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-cyan-900/10 bg-cyan-50/80 px-3 py-1 text-xs font-semibold text-cyan-900/75"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-900/70">
                {project.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Sun
                      className="mt-1 h-4 w-4 shrink-0 text-cyan-700"
                      strokeWidth={1.7}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tarot() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const topicOptions = useMemo(() => ["Love", "Study", "Career", "Life"], []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      topic: String(formData.get("topic") || "").trim(),
      question: String(formData.get("question") || "").trim(),
      additionalNotes: String(formData.get("additionalNotes") || "").trim(),
    };

    try {
      const response = await fetch("/api/tarot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <section
      id="tarot"
      className="scroll-mt-24 px-4 py-20 sm:px-5 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Tarot Corner"
          title="The Guidance Room"
          subtitle="Leave your question. I will read it with care."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="rounded-[1.5rem] border border-cyan-900/15 bg-white/50 p-5 shadow-sm sm:rounded-[2rem] sm:p-8"
          >
            <Waves className="mb-5 h-8 w-8 text-cyan-700" />

            <h3 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              Welcome to a softer room.
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-900/70 sm:text-base sm:leading-8">
              This is a small corner where you can leave your question, your
              thoughts, or a story you are carrying. I will read your message
              and reply through email when I have time.
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-900/70 sm:text-base sm:leading-8">
              My Tarot readings are currently free, but I will prioritize close
              friends and people I personally know first. If your message
              resonates with me and I have enough time, I will do my best to
              respond with care.
            </p>

            <div className="mt-6 rounded-3xl border border-cyan-700/25 bg-[#dff8f5]/80 p-5">
              <p className="font-serif text-lg italic leading-8 text-slate-900 sm:text-xl">
                Tarot is not about predicting a fixed future. It is a way to
                reflect, to ask better questions, and to look at your situation
                from a softer, deeper perspective.
              </p>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-900/55">
              Disclaimer: This Tarot reading is for reflection and personal
              guidance only. It should not replace professional advice in legal,
              medical, financial, or mental health matters.
            </p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.08 }}
            onSubmit={handleSubmit}
            className="min-w-0 rounded-[1.5rem] border border-cyan-700/35 bg-[#f9f6ea] p-5 shadow-2xl shadow-cyan-950/10 sm:rounded-[2rem] sm:p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-3 text-slate-900">
              <Fish className="h-6 w-6 shrink-0 text-cyan-700" />

              <h3 className="font-serif text-2xl font-bold sm:text-3xl">
                Send Your Question
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                name="fullName"
                label="Full Name"
                placeholder="Your name or preferred name"
                required
              />

              <Input
                name="email"
                label="Email Address"
                placeholder="Where should I reply?"
                required
                type="email"
              />
            </div>

            <label className="mt-4 block text-sm font-bold text-slate-900">
              Topic
              <select
                name="topic"
                required
                className="mt-2 w-full rounded-2xl border border-cyan-900/15 bg-white/80 px-4 py-3 text-sm font-medium outline-none transition focus:border-cyan-700"
                defaultValue="Love"
              >
                {topicOptions.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>

            <Textarea
              name="question"
              label="Your Question / Story"
              placeholder="Tell me what you are wondering, feeling, or carrying at the moment."
              required
            />

            <Textarea
              name="additionalNotes"
              label="Additional Notes"
              placeholder="You can add extra details here, such as your date of birth, their date of birth, zodiac signs, relationship context, or anything you feel may help the reading."
            />

            <button
              disabled={status === "loading"}
              className="mt-6 w-full rounded-full bg-cyan-700 px-6 py-3 text-sm font-bold text-[#fff8e8] shadow-lg shadow-cyan-950/18 transition hover:bg-cyan-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send My Question"}
            </button>

            {status === "success" && (
              <p
                role="status"
                className="mt-4 rounded-2xl border border-cyan-800/20 bg-cyan-100/75 p-4 text-sm font-semibold leading-6 text-slate-900"
              >
                Your message has been sent to BestFlace. Thank you for trusting
                me with your story. I will reply through email when I have time.
              </p>
            )}

            {status === "error" && (
              <p className="mt-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700">
                Something went wrong while sending your message. Please try
                again later.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Input({
  name,
  label,
  placeholder,
  required = false,
  type = "text",
}: InputProps) {
  return (
    <label className="block min-w-0 text-sm font-bold text-slate-900">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full min-w-0 rounded-2xl border border-cyan-900/15 bg-white/80 px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-900/35 focus:border-cyan-700"
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  placeholder,
  required = false,
}: TextareaProps) {
  return (
    <label className="mt-4 block min-w-0 text-sm font-bold text-slate-900">
      {label}
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className="mt-2 w-full min-w-0 resize-y rounded-2xl border border-cyan-900/15 bg-white/80 px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-900/35 focus:border-cyan-700"
      />
    </label>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 px-4 py-20 sm:px-5 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Let’s Connect"
          title="Contact"
          subtitle="For projects, opportunities, or stories waiting to be shared."
        />

        <p className="mx-auto max-w-3xl text-center text-sm leading-7 text-slate-900/70 sm:text-base sm:leading-8">
          Whether you want to discuss a project, a career opportunity, or simply
          share a story, feel free to reach out. I am always open to meaningful
          conversations, thoughtful collaborations, and opportunities that help
          me grow.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((item, idx) => (
            <motion.div
              key={item.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              className="min-w-0 rounded-3xl border border-cyan-900/15 bg-white/50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-700/45 hover:shadow-xl hover:shadow-cyan-950/5"
            >
              <BrandMark item={item} />

              <h3 className="font-serif text-2xl font-bold text-slate-900">
                {item.label}
              </h3>

              <p className="mt-2 break-words text-sm leading-6 text-slate-900/65">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center font-serif text-2xl italic leading-tight text-slate-900 sm:text-3xl">
          May every path you take lead you closer to the person you are
          becoming.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cyan-900/10 bg-[#d5f7f4] px-4 py-8 text-center sm:px-5 lg:px-8">
      <p className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
        BestFlace — Between Logic & Intuition
      </p>

      <p className="mt-2 text-sm text-slate-900/60">
        Designed as a personal space for systems, stories, and self-reflection.
      </p>

      <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-900/45 sm:text-xs sm:tracking-[0.22em]">
        © 2026 Nguyễn Chí Vĩ. All rights reserved.
      </p>
    </footer>
  );
}

export default function BestFlacePortfolio() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#e9fbfb] text-slate-900 selection:bg-cyan-200 selection:text-slate-900">
      <NavBar />
      <Home />
      <About />
      <Projects />
      <Tarot />
      <Contact />
      <Footer />
    </main>
  );
}
