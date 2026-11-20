---
name: reading-docx
description: Use when inspecting, searching, comparing, summarizing, or analyzing Microsoft Word .docx files. Convert DOCX to temporary Markdown before content analysis instead of parsing Office XML directly.
---

# Read DOCX as structured Markdown

For ordinary DOCX analysis, convert the document once to temporary GitHub-Flavored Markdown with the installed Pandoc CLI:

```bash
tmp=$(mktemp -d)
pandoc --from=docx --to=gfm --wrap=none "INPUT.docx" -o "$tmp/document.md"
```

Read and search the converted Markdown with normal text tools. For several documents, convert each source once into the same temporary directory, then search or narrow those Markdown files instead of repeatedly reopening the DOCX archive.

When diagrams or embedded images may carry relevant information, extract them during the same conversion:

```bash
pandoc --from=docx --to=gfm --wrap=none --extract-media="$tmp/media" "INPUT.docx" -o "$tmp/document.md"
```

Keep conversions and extracted media temporary unless the user asks to save them. Do not modify the original DOCX.

Pandoc's normal DOCX view accepts tracked changes. Use `--track-changes=all` only when revisions themselves matter. Treat generated Markdown line numbers as conversion-local navigation, not stable source line numbers; identify evidence with the original DOCX path plus heading/section when possible.

Use `python-docx` or raw DOCX ZIP/XML only when Pandoc omitted a specific structure needed for the task, or when exact Word-internal metadata is itself the subject of analysis. Do not start with `word/document.xml` for normal document reading.
