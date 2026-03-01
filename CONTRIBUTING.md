# Contributing to 8ai.ac

Thanks for wanting to add to the AI tools directory! This project is community-driven — anyone can submit a tool by opening a pull request.

## Adding a New Tool

### 1. Copy the template

Copy `_tools/_template.md` and rename it to match your tool's slug (e.g., `_tools/your-tool-name.md`). The slug must be lowercase with hyphens only.

### 2. Fill in the front matter

Every field marked **REQUIRED** must be filled in. Here's a quick reference:

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `name` | Yes | string | Official tool name |
| `slug` | Yes | string | URL-safe identifier (must match filename) |
| `website` | Yes | string | Official website URL |
| `description` | Yes | string | One sentence, under 160 characters |
| `categories` | Yes | list | 1–3 from the category list below |
| `use_cases` | Yes | list | 1–3 from the use case list below |
| `modalities` | Yes | list | From: text, image, video, audio, code |
| `pricing` | Yes | string | One of: free, freemium, paid, open-source |
| `api` | Yes | boolean | Does it have a public API? |
| `self_hosted` | Yes | boolean | Can it be self-hosted? |
| `features` | No | list | Key feature highlights |
| `launch_date` | No | string | YYYY-MM format |
| `verified` | No | boolean | Leave as false (maintainers set this) |

### 3. Write a description

Below the front matter, write an optional Markdown description. This appears on the tool's detail page and helps with search engine visibility. Tips:

- Write naturally and include relevant search terms (e.g., "AI writing assistant", "code completion tool")
- Avoid keyword stuffing — focus on being helpful and accurate
- 2–4 sentences is ideal

### 4. Submit a pull request

- Your PR should add **one file** to the `_tools/` directory
- Use the PR template checklist to verify everything is correct
- A GitHub Action will automatically validate your front matter

## Categories

Pick 1–3 that describe what the tool **does**:

| Slug | Label |
|------|-------|
| `chat` | Chat & Conversational |
| `image-generation` | Image Generation |
| `image-editing` | Image Editing |
| `video-generation` | Video Generation |
| `video-editing` | Video Editing |
| `audio-generation` | Audio & Music Generation |
| `audio-editing` | Audio Editing |
| `speech` | Speech & Voice |
| `coding` | Coding & Development |
| `writing` | Writing |
| `productivity` | Productivity |
| `research` | Research & Analysis |
| `search` | Search & Discovery |
| `customer-service` | Customer Service |
| `design` | Design |
| `marketing` | Marketing & Sales |
| `education` | Education |
| `data-analysis` | Data & Analytics |
| `3d` | 3D & Spatial |
| `agents` | Agents & Automation |
| `api-platform` | APIs & Platforms |
| `prompt-tools` | Prompt Engineering |

**Note:** Use `*-generation` for tools that create from scratch and `*-editing` for tools that modify existing content.

## Use Cases

Pick 1–3 that describe **what you use it for**:

`content-creation`, `development`, `design`, `research`, `automation`, `support`, `sales`, `marketing`, `education`, `personal`, `data-analysis`, `video-production`, `audio-production`, `legal`, `healthcare`, `finance`, `enterprise`

## Modalities

Pick all that apply for what the tool **accepts or produces**:

`text`, `image`, `video`, `audio`, `code`

## Adding a New Category or Use Case

If the existing taxonomies don't cover a tool, open an issue or include changes to `_data/categories.yml`, `_data/use_cases.yml`, or `_data/modalities.yml` in your PR. New taxonomy values need maintainer approval.

## Code of Conduct

Be respectful. Don't submit spam, fake tools, or affiliate-heavy descriptions. Listings should be factual and helpful.
