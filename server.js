const path = require("path");
const express = require("express");

const app = express();
const PORT = Number(process.env.PORT || 3000);

const journalEntries = {
  "spring-2026": [
    {
      date: "May 9, 2026",
      location: "Handlebar Coffee · Santa Barbara",
      sections: [
        {
          title: "Thoughts",
          body: "Stan gave me advice to be more tactical with goals. With spring coming to an end, I likely will not hit every seasonal target. The three main focus areas were having fun, putting more time into work, and growing leads 100% YoY. This is where I am right now:"
        },
        {
          title: "Who do I want to be?",
          body: "I ran into Rob on the bike path and started asking: how big do I want my business to be? Would I be happy at 60 with five employees, or should it be 5,000? The answer is probably somewhere in the middle. The culture at SBF feels pretty good with 200 to 300 people. That seems like a strong size for an organization where you can know everyone, but still not have to know everyone."
        },
        {
          title: "How do I want to feel by the end of the day",
          body: "I've done the important things: exercise, deep writing, and learning Italian. What is left to do? I think reviewing my notes from previous quarters would be worthwhile, and continuing to do deeper thinking. I want to review my notes today."
        },
        {
          title: "Goal Review",
          bullets: [
            "<strong>Fun:</strong> Moderate progress. It has been great planning seasonal trips to Italy, Japan, and Patagonia.",
            "<strong>More time into work:</strong> Better work requires better mental state. Need to keep working out and protect clarity before work.",
            "<strong>100% YoY growth:</strong> Actual growth is closer to 30% to 50%. Main question: what is preventing faster lead growth? Likely the people and focus model around lead generation."
          ]
        },
        {
          title: "Books to Bring to Italy",
          bullets: [
            "Almanac of Naval Ravikant",
            "Influence",
            "TBD"
          ]
        },
        {
          title: "Open Threads",
          bullets: [
            "Transportation",
            "Aviation",
            "Masters Degree",
            "Mortgage",
            "Languages",
            "Fitness",
            "Italy prep",
            "Outreach"
          ]
        },
        {
          title: "Week Plan (Before Italy)",
          bullets: [
            "Sun, May 10 — Mothers Day with Mom in Pasadena",
            "Tue, May 12 — Climb with friends",
            "Fri/Sat, May 15-16 — Yosemite",
            "Sun, May 17 — Fly to Italy"
          ]
        }
      ]
    },
    {
      date: "Apr 26, 2026",
      location: "Home Office · Santa Barbara",
      sections: [
        {
          title: "Weekly Reflection",
          body: "This week felt more stable. I am learning that consistency beats intensity, especially when balancing work execution and long-term planning."
        },
        {
          title: "Focus for Next Week",
          bullets: [
            "Protect two focused work blocks each day.",
            "Run three times and keep recovery simple.",
            "Refine the lead growth plan with clear owners."
          ]
        }
      ]
    },
    {
      date: "Apr 12, 2026",
      location: "Downtown Walk · Santa Barbara",
      sections: [
        {
          title: "Weekly Reflection",
          body: "I have more clarity when I simplify the week before it starts. Less context-switching means better energy and better decisions."
        },
        {
          title: "Open Questions",
          bullets: [
            "What does the next 90 days need from me personally?",
            "What work should I stop doing to protect leverage?"
          ]
        }
      ]
    }
  ]
};

app.use(express.json());

app.get("/api/journal/:journalId", (req, res) => {
  const { journalId } = req.params;
  if (!journalEntries[journalId]) {
    return res.status(404).json({ error: "Journal not found" });
  }

  return res.json({ entries: journalEntries[journalId] });
});

const sendPage = (res, file) => res.sendFile(path.join(__dirname, file));

app.get("/", (_req, res) => sendPage(res, "index.html"));
app.get("/index", (_req, res) => sendPage(res, "index.html"));
app.get("/books-essays", (_req, res) => sendPage(res, "books-essays.html"));
app.get("/books/essays", (_req, res) => sendPage(res, "books-essays.html"));
app.get("/engineering", (_req, res) => sendPage(res, "engineering.html"));
app.get("/expeditions", (_req, res) => sendPage(res, "expeditions.html"));

app.use(express.static(__dirname));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Personal site server running at http://localhost:${PORT}`);
});
