const express = require("express");
const cors = require("cors");
const path = require("path");
const https = require("https");
const MultiLanguageAnalyzer = require("./analyzer-multi");

const app = express();
const sharedSessions = new Map();

// Allow frontend to communicate with backend
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()) : "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Allow JSON data with larger payload
app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "Multi-Language Code Analysis Server is running" });
});

// API route to analyze code with multi-language support
app.post("/analyze", (req, res) => {
  try {
    const { code, language, input } = req.body;

    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid code input. Please provide code as a string." });
    }

    console.log(
      `[Server] Received code (${code.length} chars) for analysis` +
      (language ? ` with requested language: ${language}` : " with auto detection")
    );

    // Create analyzer instance and run analysis (now supports multiple languages)
    const analyzer = new MultiLanguageAnalyzer(code, {
      programInput: input,
      preferredLanguage: language,
    });
    const result = analyzer.analyze();

    console.log(`[Server] Analysis complete. Detected language: ${result.language}, Issues found: ${result.total_issues}`);

    res.json(result);
  } catch (error) {
    console.error("[Server] Analysis error:", error);
    res.status(500).json({
      error: "An error occurred during code analysis",
      details: error.message,
    });
  }
});

app.post("/explain", (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Code is required for explanation." });
    }

    const analyzer = new MultiLanguageAnalyzer(code, {
      preferredLanguage: language,
    });

    const result = analyzer.analyze();
    return res.json({
      language: result.language,
      explanation: result.code_explanation,
      code_flow: result.code_flow,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to explain code.", details: error.message });
  }
});

app.post("/share-session", (req, res) => {
  const payload = {
    code: req.body?.code || "",
    language: req.body?.language || "auto",
    input: req.body?.input || "",
    result: req.body?.result || null,
    createdAt: new Date().toISOString(),
  };

  const id = Math.random().toString(36).slice(2, 10);
  sharedSessions.set(id, payload);

  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const host = req.get("host");
  const shareUrl = `${protocol}://${host}/?session=${id}`;

  res.json({ shareId: id, shareUrl });
});

app.get("/shared-session/:id", (req, res) => {
  const session = sharedSessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Shared session not found." });
  }

  return res.json(session);
});

app.post("/analyze-repo", async (req, res) => {
  try {
    const { repositoryUrl } = req.body;
    if (!repositoryUrl || typeof repositoryUrl !== "string") {
      return res.status(400).json({ error: "repositoryUrl is required." });
    }

    const match = repositoryUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git|\/|$)/i);
    if (!match) {
      return res.status(400).json({ error: "Only GitHub repository URLs are supported." });
    }

    const owner = match[1];
    const repo = match[2];
    const files = await fetchGitHubCodeFiles(owner, repo, "", 0, 30);

    if (files.length === 0) {
      return res.status(404).json({ error: "No supported source files found in repository." });
    }

    const fileReports = files.map((file) => {
      const analyzer = new MultiLanguageAnalyzer(file.content, {
        preferredLanguage: mapExtensionToLanguage(file.path),
      });
      const result = analyzer.analyze();
      return {
        path: file.path,
        score: result.score,
        total_issues: result.total_issues,
        language: result.language,
        top_issues: result.issues.slice(0, 3),
      };
    });

    const totalScore = fileReports.reduce((sum, file) => sum + file.score, 0);
    const totalIssues = fileReports.reduce((sum, file) => sum + file.total_issues, 0);

    return res.json({
      repository: `${owner}/${repo}`,
      files_analyzed: fileReports.length,
      average_score: Number((totalScore / fileReports.length).toFixed(2)),
      total_issues: totalIssues,
      file_reports: fileReports,
    });
  } catch (error) {
    return res.status(500).json({ error: "Repository analysis failed.", details: error.message });
  }
});

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, {
      headers: {
        "User-Agent": "ai-code-review-platform",
        Accept: "application/vnd.github+json",
      },
    }, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          return reject(new Error(`GitHub API request failed (${response.statusCode})`));
        }

        try {
          return resolve(JSON.parse(data));
        } catch (error) {
          return reject(new Error("Invalid JSON response from GitHub API."));
        }
      });
    });

    request.on("error", reject);
  });
}

async function fetchGitHubCodeFiles(owner, repo, currentPath = "", depth = 0, maxFiles = 30) {
  if (depth > 3) {
    return [];
  }

  const endpoint = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;
  const entries = await httpGetJson(endpoint);
  const allowedExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".py", ".java", ".c", ".cpp"]);

  const files = [];

  for (const entry of entries) {
    if (files.length >= maxFiles) {
      break;
    }

    if (entry.type === "dir") {
      const nestedFiles = await fetchGitHubCodeFiles(owner, repo, entry.path, depth + 1, maxFiles - files.length);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.type !== "file") {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!allowedExtensions.has(extension)) {
      continue;
    }

    const contentResponse = await httpGetJson(entry.url);
    const decoded = Buffer.from(contentResponse.content || "", "base64").toString("utf8");

    files.push({ path: entry.path, content: decoded });
  }

  return files;
}

function mapExtensionToLanguage(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const map = {
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".ts": "JavaScript",
    ".tsx": "JavaScript",
    ".py": "Python",
    ".java": "Java",
    ".cpp": "C++",
    ".c": "C",
  };

  return map[extension] || null;
}

// API-only backend: return JSON for unknown routes instead of serving frontend files.
app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint not found" });
});

function startServer(port = process.env.PORT || 5000) {
  return app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📊 API available at http://localhost:${port}/analyze`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };