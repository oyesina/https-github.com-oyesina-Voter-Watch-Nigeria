import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI client accessor
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Return null or throw clear runtime error inside handlers rather than crashing on module load.
      console.warn("⚠️ GEMINI_API_KEY has not been configured in Secrets. API calls will return a placeholder warning.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint to invoke Gemini 3.5-flash for Forensic Analysis
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { state, lga, claim } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.status(403).json({
        error: "Missing API Key",
        message: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Settings > Secrets menu."
      });
    }

    const systemInstruction = `You are the VoterWatch AI Forensic Auditor, an expert in Nigerian electoral law, database analytics, and statistical monitoring of voter registers.
Your goal is to analyze the user's claim of anomalies in Nigeria's voter register, evaluate them under the Electoral Act 2022, and draft a high-fidelity 'Section 19 Objection/Objection Petition' for CSOs and journalists.

Cite relevant legal pillars from the Electoral Act 2022 precisely:
- Section 9: Compilation of the National Voter Register.
- Section 10: Mandatory continuous registration.
- Section 12: Qualification criteria, double registration violations (Fine of up to ₦100,000 or up to 1 yr jail).
- Section 15: Public rights to certified true copies of rosters.
- Section 16: Violation for possession of multiple voter cards (Up to ₦500,000 fine or 1 yr jail).
- Section 19: Public scrutiny window of 7 days, 14 days for filing objections.
- Section 47(2): Bimodal Voter Accreditation System (BVAS) electronic mandate.

Use very objective, forensic, and legal terminology. Highlight mathematical realities (e.g. comparing growth counts to regional projections). Ensure the final document is styled cleanly in Markdown, beginning with a formal title, executive statement, statistical evaluation, legal citing, and template objection petition.`;

    const userPrompt = `Please run a forensic electoral analysis on the following anomaly:
- **State Focus**: ${state || 'N/A'}
- **LGA Focus**: ${lga || 'N/A'}
- **Voter Claim/Observations**: ${claim || 'No details provided'}

Structure your response into:
1. **Forensic Integrity Assessment**: Analyze the statistical and operational plausibility (with analytical models like velocity or saturation benchmarks).
2. **Legal Infractions & Statutory Citations**: Map the claim clearly to the violations under the Electoral Act 2022.
3. **Official Section 19 Objection Letter**: Provide a professional, fillable template objection letter that the user or Civil Society Organizations can sign and file.`;

    const result = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      }
    });

    res.json({ text: result.text });
  } catch (err: any) {
    console.error("Gemini Forensic Analysis Error:", err);
    res.status(500).json({
      error: "Analysis Failed",
      message: err.message || "An unexpected error occurred during analysis."
    });
  }
});

// API endpoint for general Gemini legal/statistical consults
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const client = getGeminiClient();

    if (!client) {
      return res.status(403).json({
        error: "Missing API Key",
        message: "Gemini API key is not configured. Please add GEMINI_API_KEY in the Settings > Secrets menu to converse with the AI Consultant."
      });
    }

    const systemInstruction = `You are a professional Electoral Law & Data Analytics Consultant for VoterWatch Nigeria.
Your job is to advise users (CSOs, researchers, journalists, and citizens) about:
- The Electoral Act 2022 provisions and recent amendments.
- Electronic polling technologies (BVAS and IReV portals).
- Automated Biometric Identification System (ABIS) and biometric registration.
- Historical turnout statistics (the transition from 69% in 2003 to 27% in 2023).
- Steps to take under Section 19 when voter register manipulation is suspected.

Be professional, objective, and deeply informed. Avoid speculative opinions; rely strictly on data, legal mandates, and recognized electoral science frameworks. Give concise answers and format them with clean Markdown bullets.`;

    const result = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    res.json({ text: result.text });
  } catch (err: any) {
    console.error("Gemini Chat Error:", err);
    res.status(500).json({
      error: "Consultation Failed",
      message: err.message || "Could not converse with the advisor."
    });
  }
});

// Setup Vite Dev Server / Static Asset Express pipelines
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VoterWatch server bound and active on port ${PORT}`);
  });
}

startServer();
