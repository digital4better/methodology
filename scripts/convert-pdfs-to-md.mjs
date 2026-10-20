#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "inputs", "pdf");
const OUTPUT_DIR = path.join(ROOT, "inputs", "md");
const TMP_ROOT = path.join(os.tmpdir(), `d4b-pdf-md-${process.pid}`);

const DOCUMENTS = [
  {
    pdf: "1-s2.0-S1364032123002794-main.pdf",
    title:
      "Assessing embodied carbon emissions of communication user devices by combining approaches",
    slug: "assessing-embodied-carbon-emissions-of-communication-user-devices",
    language: "en",
    year: 2023,
    authors: ["Nina Lövehagen", "Jens Malmodin", "Per Bergmark", "Saeid Matinfar"],
    sourceType: "scientific_paper",
    mode: "pages",
  },
  {
    pdf: "2021-06-17_texte_94-2021_green-cloud-computing.pdf",
    title:
      "Green Cloud Computing: Lebenszyklusbasierte Datenerhebung zu Umweltwirkungen des Cloud Computing",
    slug: "green-cloud-computing-uba-2021",
    language: "de",
    year: 2021,
    authors: ["Umweltbundesamt", "Öko-Institut e.V.", "Fraunhofer IZM"],
    sourceType: "study_report",
    mode: "pages",
    startPage: 4,
  },
  {
    pdf: "2207.10793v2.pdf",
    title: "The Dirty Secret of SSDs: Embodied Carbon",
    slug: "the-dirty-secret-of-ssds-embodied-carbon",
    language: "en",
    year: 2023,
    authors: ["Swamit Tannu", "Prashant J. Nair"],
    sourceType: "scientific_paper",
    mode: "pages",
  },
  {
    pdf: "2509.00093v3.pdf",
    title:
      "More than Carbon: Cradle-to-Grave environmental impacts of GenAI training on the Nvidia A100 GPU",
    slug: "more-than-carbon-cradle-to-grave-environmental-impacts-of-genai-training-on-the-nvidia-a100-gpu",
    language: "en",
    year: 2025,
    authors: [
      "Sophia Falk",
      "David Ekchajzer",
      "Thibault Pirson",
      "Etienne Lees-Perasso",
      "Augustin Wattiez",
      "Lisa Biber-Freudenberger",
      "Sasha Luccioni",
      "Aimee van Wynsberghe",
    ],
    sourceType: "scientific_paper",
    mode: "pages",
  },
  {
    pdf: "ACV-GP-pour-intelligence-artificielle-Rapport.pdf",
    title: "Analyses de cycle de vie de GPU pour l’intelligence artificielle",
    slug: "acv-gp-pour-intelligence-artificielle",
    language: "fr",
    year: 2026,
    authors: [
      "Etienne Lees-Perasso",
      "David Ekchajzer",
      "Gauthier Roussilhe",
      "Thomas De Latour",
    ],
    sourceType: "research_report",
    mode: "pages",
  },
  {
    pdf: "BASF_Methodology_for_Product_Carbon_Footprint Calculation_August_2022.pdf",
    title: "BASF Methodology for Product Carbon Footprint Calculation",
    slug: "basf-methodology-for-product-carbon-footprint-calculation",
    language: "en",
    year: 2022,
    authors: ["BASF Corporate Sustainability"],
    sourceType: "methodology",
    mode: "pages",
    startPage: 2,
    stripTitlePrefix: true,
    mergePageHeading: true,
  },
  {
    pdf: "HPE product carbon footprint methodology-a00144176enw.pdf",
    title: "HPE product carbon footprint methodology",
    slug: "hpe-product-carbon-footprint-methodology",
    language: "en",
    year: 2025,
    authors: ["Hewlett Packard Enterprise"],
    sourceType: "methodology",
    mode: "pages",
    startPage: 2,
    stripTitlePrefix: true,
    mergePageHeading: true,
  },
  {
    pdf: "PAIA_Intended_Use.pdf",
    title: "Intended Uses and Limitations of the PAIA Model",
    slug: "intended-uses-and-limitations-of-the-paia-model",
    language: "en",
    year: null,
    authors: ["ICT Benchmarking collaboration", "MIT Materials Systems Laboratory"],
    sourceType: "guidance_note",
  },
  {
    pdf: "dell-pcf-calculator-whitepaper.pdf",
    title: "Background Report: Dell PCF & LCA Calculator",
    slug: "background-report-dell-pcf-and-lca-calculator",
    language: "en",
    year: 2023,
    authors: ["Maggie Chan", "Noel Ullrich", "Tim Heckmann"],
    sourceType: "technical_report",
    mode: "pages",
  },
  {
    pdf: "devices-carbon-methodology.pdf",
    title: "Amazon Devices Product Carbon Footprint Methodology",
    slug: "amazon-devices-product-carbon-footprint-methodology-2024",
    language: "en",
    year: 2024,
    authors: ["Amazon Devices and Services sustainability science team"],
    sourceType: "methodology",
  },
  {
    pdf: "ibm-systems-sustainability-white-paper+V6.pdf",
    title: "Assessment of carbon footprint life cycles",
    slug: "assessment-of-carbon-footprint-life-cycles",
    language: "en",
    year: 2024,
    authors: ["IBM"],
    sourceType: "white_paper",
    mode: "pages",
    startPage: 2,
    stripTitlePrefix: true,
  },
  {
    pdf: "imec.netzero_annex2.pdf",
    title: "Annex 2 - Release History for imec.netzero",
    slug: "imec-netzero-annex-2-release-history",
    language: "en",
    year: 2026,
    authors: ["Lars-Åke Ragnarsson", "Laurent Van Winckel", "Lizzie Boakes", "Vincent Schellekens"],
    sourceType: "annex",
    mode: "pages",
  },
  {
    pdf: "imec.netzero_annex_v6.2.pdf",
    title:
      "IMEC's Sustainable Semiconductor Technologies & Systems (SSTS): Life cycle assessment methodology - Annex 1",
    slug: "imec-netzero-life-cycle-assessment-methodology-annex-1-v6-2",
    language: "en",
    year: 2026,
    authors: ["imec"],
    sourceType: "annex",
    mode: "pages",
  },
  {
    pdf: "imec.netzero_audit_v5.1.pdf",
    title: "LCA review - imec.netzero 2025",
    slug: "imec-netzero-lca-review-2025",
    language: "en",
    year: 2025,
    authors: ["Marina Proske", "Chris Eckstein", "Lara Eguren", "Léo Saillenfest"],
    sourceType: "audit_report",
    mode: "pages",
    startPage: 2,
    lineReplacements: [[/^LCA Critical Review Report\s*Client:\s*imec\s*\d+\s*/iu, ""]],
  },
  {
    pdf: "imec.netzero_methodology_v6.2.pdf",
    title: "Life cycle assessment methodology for imec.netzero",
    slug: "imec-netzero-life-cycle-assessment-methodology-v6-2",
    language: "en",
    year: 2026,
    authors: [
      "Lizzie Boakes",
      "Lars-Åke Ragnarsson",
      "Cédric Rolin",
      "I-Yun Liu",
      "Benjamin Vanhouche",
      "Vincent Schellekens",
      "Job Soethoudt",
      "Maarten Cauwe",
      "Friedemarie Fourie",
      "Simeon Iliev",
    ],
    sourceType: "methodology",
    mode: "pages",
  },
  {
    pdf: "methodology_-_environmental_impact_tracker_fr.pdf",
    title: "Méthodologie du Tracker d'Impact Environnemental d'OVHcloud",
    slug: "methodologie-du-tracker-d-impact-environnemental-d-ovhcloud",
    language: "fr",
    year: 2025,
    authors: ["Aurore Vaudatin"],
    sourceType: "methodology",
  },
  {
    pdf: "pact.pdf",
    title:
      "Pathfinder Framework: Guidance for the Accounting and Exchange of Product Life Cycle Emissions",
    slug: "pathfinder-framework-guidance-for-the-accounting-and-exchange-of-product-life-cycle-emissions-v2",
    language: "en",
    year: 2023,
    authors: ["World Business Council for Sustainable Development", "PACT"],
    sourceType: "framework",
    leadingText: ["Version 2.0"],
    mode: "pages",
  },
  {
    pdf: "resilio-aguaro-whitepaper-rdb-vs-pcf-fr-20241025-web.pdf",
    title: "Les impacts environnementaux des équipements informatiques",
    slug: "les-impacts-environnementaux-des-equipements-informatiques",
    language: "fr",
    year: 2024,
    authors: ["Louise Aubet", "Benjamin Violet"],
    sourceType: "research_report",
    mode: "pages",
    startPage: 2,
    lineReplacements: [[/^\d+\s*&\s*/u, ""]],
  },
  {
    pdf: "RF-PIA-1.pdf",
    title: "IA, données, calcul : quelles infrastructures dans un monde décarboné ?",
    slug: "ia-donnees-calcul-quelles-infrastructures-dans-un-monde-decarbone",
    language: "fr",
    year: 2025,
    authors: ["The Shift Project"],
    sourceType: "report",
    mode: "pages",
    startPage: 2,
    lineReplacements: [
      [
        /^IA, données, calcul\s*:\s*quelles infrastructures dans un monde décarboné\s*\?\s*\|\s*Octobre 2025\s*\|\s*\d+\s*/iu,
        "",
      ],
    ],
  },
  {
    pdf: "white-paper-understanding-life-cycle-assessment-and-embodied-carbon-white-paper-1.pdf",
    title: "Understanding life cycle assessment and embodied carbon",
    slug: "understanding-life-cycle-assessment-and-embodied-carbon",
    language: "en",
    year: null,
    authors: ["Seagate"],
    sourceType: "white_paper",
    mode: "pages",
  },
];

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.mkdir(TMP_ROOT, { recursive: true });

const requestedDocuments = new Set(process.argv.slice(2));
const documentsToConvert =
  requestedDocuments.size === 0
    ? DOCUMENTS
    : DOCUMENTS.filter(
        (document) =>
          requestedDocuments.has(document.pdf) || requestedDocuments.has(document.slug),
      );

if (documentsToConvert.length === 0) {
  throw new Error("No matching documents found for the provided arguments.");
}

for (const document of documentsToConvert) {
  const pdfPath = path.join(INPUT_DIR, document.pdf);
  const outputPath = path.join(OUTPUT_DIR, `${document.slug}.md`);
  console.log(`Converting ${document.pdf} -> ${path.basename(outputPath)}`);

  const rawMarkdown = run("npx", [
    "-y",
    "@ideadesignmedia/convert-pdf-md",
    pdfPath,
    "--stdout",
    "--engine",
    "rich",
  ]);

  const textJson = JSON.parse(
    run("npx", ["-y", "pdf-parse", "text", pdfPath, "--format", "json"]),
  );

  const rawFigures = extractRawFigures(rawMarkdown);
  const unresolvedFigures = rawFigures.some((figure) => figure.page == null);
  let imagePages = [];

  if (rawFigures.length > 0 && unresolvedFigures) {
    imagePages = await extractImagePages(pdfPath, document.slug);
  }

  const figures = assignFigurePages(rawFigures, imagePages);
  const markdown =
    document.mode === "pages"
      ? buildPageMarkdown(document, textJson.pages, figures, pdfPath)
      : buildRawMarkdown(document, rawMarkdown, figures);

  await fs.writeFile(outputPath, withFrontmatter(document, finalizeMarkdown(markdown)), "utf8");
}

function buildPageMarkdown(document, pages, figures, pdfPath) {
  const cleanedPages = pages
    .filter((page) => page.num >= (document.startPage ?? 1))
    .filter((page) => document.endPage == null || page.num <= document.endPage)
    .map((page) => ({
      num: page.num,
      lines: cleanPageLines(page.text, document),
    }));

  const repeatedLines = buildRepeatedLineStats(cleanedPages);
  const perPageFigures = indexFiguresByPage(figures, cleanedPages, document, pdfPath);

  const rendered = [`# ${document.title}`, ""];

  if (document.leadingText?.length) {
    for (const line of document.leadingText) {
      rendered.push(line, "");
    }
  }

  for (const page of cleanedPages) {
    const filteredLines = page.lines.filter(
      (line) => !shouldDropLine(line, repeatedLines, cleanedPages.length, page.num, document.title),
    );

    const pageContent = renderPage(filteredLines);
    if (pageContent.length > 0) {
      rendered.push(...pageContent, "");
    }

    const pageFigures = perPageFigures.get(page.num) || [];
    for (const figure of pageFigures) {
      rendered.push(renderFigure(figure), "");
    }
  }

  const normalized = rendered.join("\n");
  return collapseBlankLines(normalized).trim() + "\n";
}

function buildRawMarkdown(document, rawMarkdown, figures) {
  const rawLines = rawMarkdown.replace(/\r/g, "").split("\n");
  const compareLines = rawLines.map((line) => stripMarkdownLine(line));
  const titleWindow = findTitleWindow(compareLines, document.title);
  const startIndex = titleWindow != null ? titleWindow.end + 1 : 0;
  const output = [`# ${document.title}`, ""];

  if (document.leadingText?.length) {
    for (const line of document.leadingText) {
      output.push(line, "");
    }
  }

  let figureIndex = 0;
  for (let index = startIndex; index < rawLines.length; index += 1) {
    const originalLine = rawLines[index].trimEnd();
    const line = stripMarkdownLine(originalLine);

    if (originalLine.includes("![image]")) {
      const figure = figures[figureIndex] || { page: null, caption: null };
      figureIndex += 1;
      output.push(renderFigure(figure), "");
      continue;
    }

    if (shouldDropRawLine(line, document.title)) {
      continue;
    }

    if (!line) {
      output.push("");
      continue;
    }

    if (/^published in /i.test(line)) {
      output.push(line, "");
      continue;
    }

    output.push(originalLine);
  }

  return collapseBlankLines(output.join("\n")).trim() + "\n";
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 128,
  });

  if (result.status !== 0) {
    throw new Error(
      [`Command failed: ${command} ${args.join(" ")}`, result.stdout, result.stderr]
        .filter(Boolean)
        .join("\n\n"),
    );
  }

  return result.stdout;
}

function extractRawFigures(rawMarkdown) {
  const figures = [];
  const lines = rawMarkdown.replace(/\r/g, "").split("\n");
  let currentPage = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    const pageMatch = line.match(/\bPage\s+(\d{1,4})\b/i);
    if (pageMatch) {
      currentPage = Number(pageMatch[1]);
    }

    if (!line.includes("![image]")) {
      continue;
    }

    const neighbors = [];
    for (let offset = -2; offset <= 2; offset += 1) {
      if (offset === 0) {
        continue;
      }
      const neighbor = lines[index + offset]?.trim();
      if (neighbor) {
        neighbors.push(neighbor);
      }
    }

    const caption = neighbors.find(isCaptionLine) || null;
    figures.push({ page: currentPage, caption });
  }

  return figures;
}

async function extractImagePages(pdfPath, slug) {
  const outputDir = path.join(TMP_ROOT, `${slug}-images`);
  const pages = [];

  await fs.mkdir(outputDir, { recursive: true });
  run("npx", ["-y", "pdf-parse", "image", pdfPath, "--output", outputDir]);

  const names = await fs.readdir(outputDir);
  for (const baseName of names) {
    const match = baseName.match(/^page_(\d+)_image_\d+\./);
    if (match) {
      pages.push(Number(match[1]));
    }
  }

  pages.sort((left, right) => left - right);
  return pages;
}

function assignFigurePages(rawFigures, imagePages) {
  if (rawFigures.length === 0) {
    return [];
  }

  const pendingPages = [...imagePages];
  return rawFigures.map((figure) => ({
    ...figure,
    page: figure.page ?? pendingPages.shift() ?? null,
  }));
}

function indexFiguresByPage(figures, pages, document, pdfPath) {
  const pageMap = new Map();
  const missingTextPages = [];

  for (const page of pages) {
    if (page.lines.join(" ").trim().length < 40) {
      missingTextPages.push(page.num);
    }
  }

  for (const pageNum of missingTextPages) {
    const ocrText = runOcrIfNeeded(pdfPath, document.slug, pageNum);
    if (ocrText) {
      const page = pages.find((entry) => entry.num === pageNum);
      if (page) {
        page.lines = cleanPageLines(ocrText, document);
      }
    }
  }

  for (const figure of figures) {
    if (figure.page == null) {
      continue;
    }
    const page = pages.find((entry) => entry.num === figure.page);
    const pageLines = page?.lines ?? [];
    const caption =
      figure.caption ||
      pageLines.find((line) => isCaptionLine(line)) ||
      "visuel présent dans le PDF source";

    if (!pageMap.has(figure.page)) {
      pageMap.set(figure.page, []);
    }
    pageMap.get(figure.page).push({ page: figure.page, caption });
  }

  return pageMap;
}

function runOcrIfNeeded(pdfPath, slug, pageNum) {
  const screenshotPath = path.join(TMP_ROOT, `${slug}-ocr-page-${pageNum}.png`);
  run("npx", [
    "-y",
    "pdf-parse",
    "screenshot",
    pdfPath,
    "--pages",
    String(pageNum),
    "--output",
    screenshotPath,
  ]);

  const ocr = spawnSync("tesseract", [screenshotPath, "stdout"], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 32,
  });

  if (ocr.status !== 0) {
    return "";
  }

  return ocr.stdout || "";
}

function cleanPageLines(text, document) {
  const rawLines = text
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\u2009/g, " ")
    .replace(/\u200b/g, "")
    .replace(/\ufeff/g, "")
    .split("\n")
    .map((line) => line.replace(/[ ]+\t/g, "\t").replace(/\t[ ]+/g, "\t").trimEnd())
    .map((line) => applyDocumentLineFixes(line, document));

  const titleWindow = findTitleWindow(rawLines, document.title);
  const lines = titleWindow != null ? rawLines.slice(titleWindow.end + 1) : rawLines;

  return lines
    .map(cleanLine)
    .filter((line) => line !== "-- 1 of 1 --")
    .filter((line) => !/^-- \d+ of \d+ --$/.test(line));
}

function stripMarkdownLine(line) {
  return line.replace(/^#+\s*/, "").trim();
}

function cleanLine(line) {
  return line
    .replace(/\u0000/g, "")
    .replace(/Ɵ/gu, "ti")
    .replace(/Ʃ/gu, "tt")
    .replace(/Ō/gu, "ft")
    .replace(/([A-Za-zÀ-ÿ])\d+F(\d+)/gu, "$1[$2]")
    .replace(/\b\d+F(\d+)\b/gu, "[$1]")
    .replace(/[ ]{3,}/g, "  ")
    .replace(/\s+$/g, "")
    .trim();
}

function applyDocumentLineFixes(line, document) {
  let fixed = line;

  if (document.stripTitlePrefix) {
    const titlePattern = new RegExp(`^${escapeRegex(document.title)}\\s*`, "iu");
    fixed = fixed.replace(titlePattern, "");
  }

  for (const [pattern, replacement] of document.lineReplacements || []) {
    fixed = fixed.replace(pattern, replacement);
  }

  if (document.mergePageHeading) {
    fixed = fixed.replace(/^(\d{1,3})(\d+(?:\.\d+)*[.)]?\s+)/u, "$2");
  }

  return fixed;
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findTitleWindow(lines, title) {
  const titleTokens = tokenize(title);
  if (titleTokens.length === 0) {
    return null;
  }

  let best = null;
  const limit = Math.min(lines.length, 16);
  for (let start = 0; start < limit; start += 1) {
    let buffer = "";
    for (let end = start; end < Math.min(start + 6, limit); end += 1) {
      buffer += ` ${normalizeForCompare(lines[end])}`;
      const coverage = tokenCoverage(titleTokens, tokenize(buffer));
      if (!best || coverage > best.coverage) {
        best = { start, end, coverage };
      }
    }
  }

  return best && best.coverage >= 0.55 ? best : null;
}

function tokenize(text) {
  return normalizeForCompare(text)
    .split(" ")
    .map((part) => part.trim())
    .filter((part) => part.length > 2);
}

function normalizeForCompare(text) {
  return stripDiacritics(text)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripDiacritics(text) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function tokenCoverage(expectedTokens, actualTokens) {
  const actual = new Set(actualTokens);
  const matches = expectedTokens.filter((token) => actual.has(token)).length;
  return matches / expectedTokens.length;
}

function buildRepeatedLineStats(pages) {
  const repeated = new Map();
  for (const page of pages) {
    const seen = new Set();
    for (const line of page.lines) {
      const key = repeatKey(line);
      if (!key || seen.has(key)) {
        continue;
      }
      repeated.set(key, (repeated.get(key) || 0) + 1);
      seen.add(key);
    }
  }
  return repeated;
}

function repeatKey(line) {
  const normalized = normalizeForCompare(line)
    .replace(/\bpage\b/g, "")
    .replace(/\b\d+\b/g, "#")
    .replace(/\s+/g, " ")
    .trim();

  return normalized.length >= 3 ? normalized : null;
}

function shouldDropLine(line, repeatedLines, totalPages, pageNum, title) {
  if (!line) {
    return true;
  }

  if (/^&+$/.test(line.trim())) {
    return true;
  }

  if (/^-- \d+ of \d+ --$/.test(line)) {
    return true;
  }

  if (/^\d+\s+of\s+\d+$/i.test(line)) {
    return true;
  }

  if (line === String(pageNum)) {
    return true;
  }

  if (/^page\s+\d+$/i.test(line)) {
    return true;
  }

  if (/^(?:public|confidential)$/i.test(line)) {
    return true;
  }

  if (/^warning:/i.test(line)) {
    return true;
  }

  const key = repeatKey(line);
  if (!key) {
    return false;
  }

  const occurrences = repeatedLines.get(key) || 0;
  const normalizedTitle = normalizeForCompare(title);
  if (normalizedTitle && key.includes(normalizedTitle)) {
    return true;
  }

  if (occurrences >= Math.max(4, Math.ceil(totalPages * 0.15))) {
    return !isHeadingLine(line) && !isCaptionLine(line) && !isListLine(line);
  }

  if (occurrences >= 2 && /^(public|confidential|imec|powered b y)$/i.test(line)) {
    return true;
  }

  if (occurrences >= 2 && /^(?:date:|version\b|owner:|page\s+\d+\s+of\s+\d+)/i.test(line)) {
    return true;
  }

  return false;
}

function shouldDropRawLine(line, title) {
  if (!line) {
    return false;
  }

  if (line === "---") {
    return true;
  }

  if (/^warning:/i.test(line)) {
    return true;
  }

  const normalizedTitle = normalizeForCompare(title);
  const normalizedLine = normalizeForCompare(line);
  if (normalizedTitle && normalizedLine === normalizedTitle) {
    return true;
  }

  if (/\bpage\s+\d+\b/i.test(line) && normalizedTitle && normalizedLine.includes(normalizedTitle)) {
    return true;
  }

  return false;
}

function renderPage(lines) {
  if (isTableOfContentsPage(lines)) {
    return renderTableOfContentsPage(lines);
  }

  const output = [];
  let index = 0;
  let paragraph = [];

  function flushParagraph() {
    if (paragraph.length === 0) {
      return;
    }
    output.push(joinParagraph(paragraph));
    paragraph = [];
  }

  while (index < lines.length) {
    const line = lines[index];

    if (!line) {
      flushParagraph();
      index += 1;
      continue;
    }

    const tableBlock = parseTableBlock(lines, index);
    if (tableBlock) {
      flushParagraph();
      output.push(...tableBlock.lines);
      index = tableBlock.nextIndex;
      continue;
    }

    if (isLongNumberedListLine(lines, index)) {
      flushParagraph();
      const listItem = collectListItem(lines, index);
      output.push(listItem.text);
      index = listItem.nextIndex;
      continue;
    }

    const embeddedHeading = extractEmbeddedHeading(line);
    if (embeddedHeading) {
      flushParagraph();
      output.push(formatHeading(embeddedHeading.heading));
      if (embeddedHeading.rest) {
        paragraph.push(embeddedHeading.rest);
      }
      index += 1;
      continue;
    }

    if (isListLine(line)) {
      flushParagraph();
      const listItem = collectListItem(lines, index);
      output.push(listItem.text);
      index = listItem.nextIndex;
      continue;
    }

    if (isHeadingLine(line)) {
      flushParagraph();
      output.push(formatHeading(line));
      index += 1;
      continue;
    }

    if (isStandaloneLine(line)) {
      flushParagraph();
      output.push(line);
      index += 1;
      continue;
    }

    paragraph.push(line);
    index += 1;
  }

  flushParagraph();
  return output;
}

function isTableOfContentsPage(lines) {
  const meaningful = lines.map((line) => line.trim()).filter(Boolean);
  if (meaningful.length === 0) {
    return false;
  }

  if (isTableOfContentsHeading(meaningful[0])) {
    return true;
  }

  let tocLikeCount = 0;
  for (const line of meaningful.slice(0, 60)) {
    if (isTableOfContentsLine(line)) {
      tocLikeCount += 1;
    }
  }

  return tocLikeCount >= Math.max(6, Math.ceil(Math.min(meaningful.length, 20) * 0.6));
}

function isTableOfContentsHeading(line) {
  return /^(contents|sommaire|table of contents|table des matières|table des matieres|list of figures|list of tables|index des tableaux et figures|sigles et acronymes|inhaltsverzeichnis|abbildungsverzeichnis|tabellenverzeichnis|abkürzungsverzeichnis|abkurzungsverzeichnis|abbreviations)$/i.test(
    line.trim(),
  );
}

function isTableOfContentsLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }

  if (isTableOfContentsHeading(trimmed)) {
    return true;
  }

  if (/^(?:figure|table|annex|appendix|references|glossary|abstract|résumé|summary|zusammenfassung|kurzbeschreibung)\b.*\d+\s*$/i.test(trimmed)) {
    return true;
  }

  if (/^(?:[A-ZÀ-Ÿ][A-ZÀ-Ÿ0-9 '&/().:-]+|\d+(?:\.\d+)*\.?)\s+.*\d+\s*$/u.test(trimmed)) {
    return true;
  }

  return /(?:\.{2,}|\t)\s*\d+\s*$/u.test(trimmed);
}

function renderTableOfContentsPage(lines) {
  const meaningful = lines.map((line) => line.trim()).filter(Boolean);
  const output = [];
  let index = 0;

  if (meaningful.length > 0 && isTableOfContentsHeading(meaningful[0])) {
    output.push(formatHeading(meaningful[0]));
    index = 1;
  }

  for (; index < meaningful.length; index += 1) {
    const item = normalizeTableOfContentsLine(meaningful[index]);
    if (!item) {
      continue;
    }
    output.push(`- ${item}`);
  }

  return output;
}

function normalizeTableOfContentsLine(line) {
  let text = line.replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }

  text = text
    .replace(/[.]{2,}\s*\d+\s*$/u, "")
    .replace(/\t+\s*\d+\s*$/u, "")
    .replace(/\s+\d+\s*$/u, "");

  if (!text || /^\d+\s+of\s+\d+$/i.test(text)) {
    return "";
  }

  return text.replace(/\s{2,}/g, " ").trim();
}

function isLongNumberedListLine(lines, index) {
  const current = lines[index].match(/^(\d+)[.)]?\s+(.*)$/);
  if (!current || wordCount(current[2]) <= 8) {
    return false;
  }

  const nextNumber = Number(current[1]) + 1;
  for (let cursor = index + 1; cursor < Math.min(lines.length, index + 6); cursor += 1) {
    const candidate = lines[cursor];
    if (!candidate) {
      continue;
    }

    const match = candidate.match(/^(\d+)[.)]?\s+/);
    if (!match) {
      continue;
    }

    if (Number(match[1]) === nextNumber) {
      return true;
    }
  }

  return false;
}

function extractEmbeddedHeading(line) {
  if (/\.\.\.+/.test(line) || /\t/.test(line) || /^\d+\s+of\s+\d+/i.test(line)) {
    return null;
  }

  const match = line.match(/^(\d+(?:\.\d+)*[.)]?)\s+(.*)$/);
  if (!match) {
    return null;
  }

  const words = match[2].split(/\s+/).filter(Boolean);
  for (let splitIndex = 1; splitIndex < Math.min(words.length - 1, 9); splitIndex += 1) {
    if (!match[1].includes(".") && splitIndex < 2) {
      continue;
    }

    const headingPart = words.slice(0, splitIndex).join(" ");
    const rest = words.slice(splitIndex).join(" ");

    if (!/^[A-ZÀ-Ÿ]/.test(rest)) {
      continue;
    }

    const candidate = `${match[1]} ${headingPart}`.trim();
    if (isHeadingLine(candidate) && rest.length > 20) {
      return { heading: candidate, rest };
    }
  }

  return null;
}

function parseTableBlock(lines, startIndex) {
  const rows = [];
  let index = startIndex;
  let expectedWidth = null;

  while (index < lines.length) {
    const cells = splitTableCells(lines[index]);
    if (!cells || cells.length < 2) {
      break;
    }

    if (expectedWidth == null) {
      expectedWidth = cells.length;
    }

    if (Math.abs(cells.length - expectedWidth) > 1) {
      break;
    }

    rows.push(cells);
    index += 1;
  }

  if (rows.length < 2) {
    return null;
  }

  const width = Math.max(...rows.map((row) => row.length));
  const paddedRows = rows.map((row) => padRow(row, width));
  const header = paddedRows[0];
  const separator = new Array(width).fill("---");
  const body = paddedRows.slice(1);

  const markdownLines = [
    `| ${header.join(" | ")} |`,
    `| ${separator.join(" | ")} |`,
    ...body.map((row) => `| ${row.join(" | ")} |`),
  ];

  return { lines: markdownLines, nextIndex: index };
}

function splitTableCells(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return null;
  }

  let cells = trimmed.includes("\t")
    ? trimmed.split("\t")
    : trimmed.split(/\s{2,}/);
  cells = cells.map((cell) => cell.trim()).filter(Boolean);

  if (cells.length < 2) {
    return null;
  }

  return cells;
}

function padRow(row, width) {
  const padded = [...row];
  while (padded.length < width) {
    padded.push("");
  }
  return padded;
}

function isHeadingLine(line) {
  if (isCaptionLine(line)) {
    return false;
  }

  const numbered = line.match(/^(\d+(?:\.\d+)*)([.)]?)\s+(.*)$/);
  if (numbered) {
    const label = numbered[1];
    const title = numbered[3].trim();
    const segments = label.split(".");
    const isSingleLevel = !label.includes(".");

    if (segments.some((segment, index) => index > 0 && Number(segment) === 0)) {
      return false;
    }

    if (/^["“”'‘’(]/u.test(title)) {
      return false;
    }

    if (/^(?:https?:|www\.|source\b)/iu.test(title)) {
      return false;
    }

    if (/^[a-zà-ÿ]/u.test(title)) {
      return false;
    }

    if (isSingleLevel && label.length > 2) {
      return false;
    }
    if (isSingleLevel && title.includes(":") && wordCount(title) > 6) {
      return false;
    }
    if (isSingleLevel && (title.includes(",") || wordCount(title) > 6 || title.length > 60)) {
      return false;
    }
    return label.includes(".") || numbered[2] !== "" || (wordCount(title) <= 10 && title.length <= 80);
  }

  if (/^(abstract|résumé|summary|keywords|nomenclature|glossary|impressum|kurzbeschreibung|zusammenfassung|abbreviations|table of contents|list of figures|list of tables|inhaltsverzeichnis|abbildungsverzeichnis|tabellenverzeichnis|abkürzungsverzeichnis|abkurzungsverzeichnis|background data|foreground data|critical review)$/i.test(line)) {
    return true;
  }

  if (/^(document change control \/ history|change history|technical summary|résumé technique|a propos du shift project|comité de rédaction|nos partenaires)$/iu.test(line)) {
    return true;
  }

  if (/\?$/.test(line) && wordCount(line) <= 12) {
    return true;
  }

  if (looksLikePlainHeading(line)) {
    return true;
  }

  if (/^(article info|collaborators|uses|limitations|general|single value|range of values|comparing paia results|issues in lca comparison|statement on data quality|statement on uncertainty|references|bibliography)$/i.test(line)) {
    return true;
  }

  if (/^(appendix|annex)\b/i.test(line)) {
    return true;
  }

  if (/^(?:[A-ZÀ-Ÿ]\s+){2,}[A-ZÀ-Ÿ]$/.test(line)) {
    return true;
  }

  return false;
}

function formatHeading(line) {
  const compacted = compactSpacedCaps(line.trim());
  const numbered = compacted.match(/^(\d+(?:\.\d+)*)[.)]?\s+(.*)$/);

  if (numbered) {
    const depth = Math.min(numbered[1].split(".").length + 1, 6);
    return `${"#".repeat(depth)} ${numbered[1]} ${numbered[2].trim()}`;
  }

  return `## ${compacted}`;
}

function compactSpacedCaps(line) {
  if (/^(?:[A-ZÀ-Ÿ]\s+){2,}[A-ZÀ-Ÿ]$/.test(line)) {
    return line.replace(/\s+/g, "");
  }
  return line;
}

function isListLine(line) {
  if (/^(?:[-*•]\s+|\d+[.)]\s+|[a-zA-Z][.)]\s+)/.test(line)) {
    return true;
  }

  const bareNumbered = line.match(/^(\d+)\s+(.*)$/);
  return Boolean(bareNumbered && wordCount(bareNumbered[2]) > 10);
}

function collectListItem(lines, startIndex) {
  const prefixMatch = lines[startIndex].match(/^(?:[-*•]|\d+[.)]?|[a-zA-Z][.)])\s+/);
  const bareNumbered = lines[startIndex].match(/^(\d+)\s+(.*)$/);
  const prefix = bareNumbered
    ? `${bareNumbered[1]}.`
    : prefixMatch
      ? lines[startIndex].slice(0, prefixMatch[0].length).trim()
      : "-";
  const parts = [
    bareNumbered
      ? bareNumbered[2].trim()
      : lines[startIndex].replace(/^(?:[-*•]|\d+[.)]|[a-zA-Z][.)])\s+/, "").trim(),
  ];

  let index = startIndex + 1;
  while (index < lines.length) {
    const line = lines[index];
    if (!line || isListLine(line) || isHeadingLine(line) || parseTableBlock(lines, index)) {
      break;
    }
    parts.push(line.trim());
    index += 1;
  }

  return {
    text: `${prefix === "•" ? "-" : prefix} ${joinParagraph(parts)}`,
    nextIndex: index,
  };
}

function isStandaloneLine(line) {
  return isCaptionLine(line) || /^https?:\/\//i.test(line);
}

function looksLikePlainHeading(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 90 || wordCount(trimmed) > 12) {
    return false;
  }

  if (/^\d/.test(trimmed)) {
    return false;
  }

  if (/[.!]$/.test(trimmed)) {
    return false;
  }

  if (/[:;]\s/.test(trimmed)) {
    return false;
  }

  if (!/^[A-ZÀ-Ÿ]/u.test(trimmed)) {
    return false;
  }

  if (/[%"'’]/.test(trimmed) && /\d/.test(trimmed)) {
    return false;
  }

  if (/\b(?:kg|kwh|co2|co₂|h2o|ssd|hdd|cpu|gpu|ram|lcd|oled|pue|gwp)\b/iu.test(trimmed) && /\d/.test(trimmed)) {
    return false;
  }

  const stopWords = new Set([
    "and",
    "or",
    "of",
    "the",
    "for",
    "to",
    "in",
    "on",
    "by",
    "with",
    "a",
    "an",
    "de",
    "des",
    "du",
    "la",
    "le",
    "les",
    "et",
    "au",
    "aux",
    "pour",
    "dans",
    "sur",
    "à",
  ]);

  const words = trimmed
    .split(/\s+/)
    .map((word) => word.replace(/^[("'“”‘’]+|[.,:;!?)"'“”‘’]+$/gu, ""))
    .filter(Boolean);

  if (words.length < 2) {
    return false;
  }

  const validWords = words.filter((word) => {
    const normalized = stripDiacritics(word).toLowerCase();
    return /^[A-ZÀ-Ÿ0-9]/u.test(word) || stopWords.has(normalized);
  });

  return validWords.length >= Math.ceil(words.length * 0.75);
}

function isCaptionLine(line) {
  return /^(?:fig(?:ure)?\.?|table|chart|graph|figure)\s*[A-Za-z0-9.-]*[:.]?/i.test(
    line.trim(),
  );
}

function joinParagraph(lines) {
  let text = "";

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (!text) {
      text = line;
      continue;
    }

    if (text.endsWith("-") && /^[a-zà-ÿ]/.test(line)) {
      text = `${text.slice(0, -1)}${line}`;
      continue;
    }

    text = `${text} ${line}`;
  }

  return text.replace(/\s+/g, " ").trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function renderFigure(figure) {
  const pageLabel = figure.page == null ? "page inconnue" : `page ${figure.page}`;
  const caption = figure.caption || "visuel présent dans le PDF source";
  return `> Figure - ${pageLabel} - ${caption}`;
}

function collapseBlankLines(text) {
  return text.replace(/\n{3,}/g, "\n\n");
}

function finalizeMarkdown(markdown) {
  const lines = markdown.split("\n");
  const result = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    const previous = result.length > 0 ? result[result.length - 1].trim() : "";
    const next = index + 1 < lines.length ? lines[index + 1].trim() : "";

    if (shouldDropStandaloneNumber(trimmed, previous, next)) {
      continue;
    }

    const adjustedLine =
      trimmed === "## ARTICLEINFO"
        ? "## Article Info"
        : trimmed === "## ABSTRACT"
          ? "## Abstract"
          : trimmed.startsWith("# ") && result.length > 0
            ? `## ${trimmed.slice(2)}`
            : line;

    if (!adjustedLine.trim().startsWith("#")) {
      const embeddedHeading = extractEmbeddedHeading(adjustedLine.trim());
      if (embeddedHeading) {
        result.push(formatHeading(embeddedHeading.heading));
        if (embeddedHeading.rest) {
          result.push(embeddedHeading.rest);
        }
        continue;
      }
    }

    if (!adjustedLine.startsWith("#") && shouldPromoteStandaloneHeading(adjustedLine.trim())) {
      result.push(formatHeading(adjustedLine.trim()));
      continue;
    }

    result.push(adjustedLine);
  }

  return collapseBlankLines(result.join("\n")).trim() + "\n";
}

function withFrontmatter(document, markdown) {
  const frontmatter = [
    "---",
    `title: ${yamlValue(document.title)}`,
    `slug: ${yamlValue(document.slug)}`,
    `language: ${yamlValue(document.language ?? null)}`,
    `year: ${yamlValue(document.year ?? null)}`,
    `authors: ${yamlValue(document.authors ?? [])}`,
    `source_type: ${yamlValue(document.sourceType ?? null)}`,
    `source_pdf: ${yamlValue(document.pdf)}`,
    "---",
    "",
  ].join("\n");

  return `${frontmatter}${markdown.replace(/^\uFEFF/, "")}`;
}

function yamlValue(value) {
  return JSON.stringify(value);
}

function shouldDropStandaloneNumber(line, previous, next) {
  if (!/^\d+(?:,\d+)?$/.test(line)) {
    return false;
  }

  if (previous.startsWith("|") || next.startsWith("|")) {
    return false;
  }

  return true;
}

function shouldPromoteStandaloneHeading(line) {
  if (!isHeadingLine(line)) {
    return false;
  }

  if (/^\d{3,}\s+/.test(line)) {
    return false;
  }

  const singleLevel = line.match(/^(\d+)[.)]?\s+(.*)$/);
  if (singleLevel) {
    const title = singleLevel[2].trim();
    if (/^[a-zà-ÿ]/u.test(title) || title.includes(",") || wordCount(title) > 12) {
      return false;
    }
  }

  if (/\.\.\.+/.test(line) || /\t/.test(line)) {
    return false;
  }

  if (/\s\d+$/.test(line) && !/^\d+(?:\.\d+)*[.)]?\s/.test(line)) {
    return false;
  }

  if (/\.{2,}\s*\d+$/.test(line)) {
    return false;
  }

  return line.length <= 90;
}
