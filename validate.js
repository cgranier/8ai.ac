const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const TOOLS_DIR = path.join(__dirname, "_tools");
const DATA_DIR = path.join(__dirname, "_data");

const REQUIRED_FIELDS = ["name", "slug", "website", "description", "categories", "use_cases", "modalities", "pricing", "api", "self_hosted"];
const PRICING_VALUES = ["free", "freemium", "paid", "open-source"];

function loadTaxonomy(filename) {
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf8");
  return yaml.load(raw).map(function (item) { return item.slug; });
}

function extractFrontMatter(content) {
  const normalized = content.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  return yaml.load(match[1]);
}

function validate() {
  const categories = loadTaxonomy("categories.yml");
  const useCases = loadTaxonomy("use_cases.yml");
  const modalities = loadTaxonomy("modalities.yml");

  const files = fs.readdirSync(TOOLS_DIR).filter(function (f) {
    return f.endsWith(".md") && f !== "_template.md";
  });

  let errors = [];

  files.forEach(function (file) {
    const filePath = path.join(TOOLS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const fm = extractFrontMatter(content);

    if (!fm) {
      errors.push(file + ": Missing or invalid YAML front matter");
      return;
    }

    REQUIRED_FIELDS.forEach(function (field) {
      if (fm[field] === undefined || fm[field] === null || fm[field] === "") {
        errors.push(file + ": Missing required field '" + field + "'");
      }
    });

    if (fm.slug && fm.slug + ".md" !== file) {
      errors.push(file + ": Filename must match slug (expected '" + fm.slug + ".md')");
    }

    if (fm.pricing && PRICING_VALUES.indexOf(fm.pricing) === -1) {
      errors.push(file + ": Invalid pricing '" + fm.pricing + "'. Must be one of: " + PRICING_VALUES.join(", "));
    }

    if (fm.categories && Array.isArray(fm.categories)) {
      fm.categories.forEach(function (cat) {
        if (categories.indexOf(cat) === -1) {
          errors.push(file + ": Unknown category '" + cat + "'");
        }
      });
    }

    if (fm.use_cases && Array.isArray(fm.use_cases)) {
      fm.use_cases.forEach(function (uc) {
        if (useCases.indexOf(uc) === -1) {
          errors.push(file + ": Unknown use_case '" + uc + "'");
        }
      });
    }

    if (fm.modalities && Array.isArray(fm.modalities)) {
      fm.modalities.forEach(function (mod) {
        if (modalities.indexOf(mod) === -1) {
          errors.push(file + ": Unknown modality '" + mod + "'");
        }
      });
    }

    if (fm.description && fm.description.length > 160) {
      errors.push(file + ": Description exceeds 160 characters (" + fm.description.length + ")");
    }
  });

  if (errors.length > 0) {
    console.error("Validation failed with " + errors.length + " error(s):\n");
    errors.forEach(function (e) { console.error("  - " + e); });
    process.exit(1);
  } else {
    console.log("All " + files.length + " tool listings are valid.");
  }
}

validate();
