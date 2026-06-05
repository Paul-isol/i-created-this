import db from "../lib/db";

async function main() {
  await db.product.deleteMany()
  console.log("Start seeding products...");

  const sampleProducts = [
    {
      name: "NextLaunch",
      slug: "nextlaunch",
      tagline: "The ultimate Next.js boilerplate for SaaS founders",
      description: "Launch your startup in days with pre-built authentication, billing, emails, and database setup using Next.js, Better Auth, and Stripe.",
      websiteUrl: "https://nextlaunch.dev",
      tags: ["SaaS", "Next.js", "Boilerplate"],
      likes: 42,
      views: 100,
      status: "approved",
      submittedBy: "alex_dev",
    },
    {
      name: "CodeGuardian AI",
      slug: "codeguardian-ai",
      tagline: "Automated PR reviews using Gemini 3.5 Flash",
      description: "An AI-powered GitHub assistant that reads your pull requests, suggests code optimizations, detects bugs, and enforces style guidelines.",
      websiteUrl: "https://codeguardian.ai",
      tags: ["AI", "Developer Tools", "GitHub"],
      likes: 88,
      views: 200,
      status: "approved",
      submittedBy: "jason_code",
    },
    {
      name: "DbVis",
      slug: "dbvis",
      tagline: "Ultra-fast database visualizer for PostgreSQL",
      description: "A native desktop app to view schemas, write SQL queries, and visualise database tables with zero latency. Works locally or with Neon DB.",
      websiteUrl: "https://dbvis.io",
      tags: ["Database", "Developer Tools", "PostgreSQL"],
      likes: 15,
      views: 300,
      status: "pending",
      submittedBy: "sarah_m",
    },
    {
      name: "Retro UI",
      slug: "retro-ui",
      tagline: "Copy-paste retro/neo-brutalist Tailwind components",
      description: "A beautifully curated library of neo-brutalist elements (buttons, inputs, modals, cards) built with Tailwind CSS and React.",
      websiteUrl: "https://retro-ui.com",
      tags: ["TailwindCSS", "UI Library", "React"],
      likes: 64,
      views: 350,
      status: "approved",
      submittedBy: "retro_designer",
    },
    {
      name: "TraceFlow",
      slug: "traceflow",
      tagline: "Real-time latency tracing for serverless APIs",
      description: "Monitor API performance, trace execution paths of edge functions, and get alerted when response times exceed thresholds.",
      websiteUrl: "https://traceflow.net",
      tags: ["APIs", "Monitoring", "Serverless"],
      likes: 3,
      views: 350,
      status: "pending",
      submittedBy: "dev_ops_guy",
    },
  ];

  for (const product of sampleProducts) {
    const upserted = await db.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        tagline: product.tagline,
        description: product.description,
        websiteUrl: product.websiteUrl,
        tags: product.tags,
        likes: product.likes,
        views: product.views,
        status: product.status,
        submittedBy: product.submittedBy,
      },
      create: {
        name: product.name,
        slug: product.slug,
        tagline: product.tagline,
        description: product.description,
        websiteUrl: product.websiteUrl,
        tags: product.tags,
        likes: product.likes,
        views: product.views,
        status: product.status,
        submittedBy: product.submittedBy,
      },
    });
    console.log(`Upserted product: ${upserted.name} (${upserted.slug})`);
  }

  console.log("Seeding products finished.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  });
