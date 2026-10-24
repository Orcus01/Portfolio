import { writeFile } from "node:fs/promises";
const response = await fetch(
  "https://api.github.com/users/Orcus01/repos?per_page=100&sort=updated",
  { headers: { Accept: "application/vnd.github+json" } },
);
if (!response.ok)
  throw new Error(
    `GitHub sync failed: ${response.status}. Existing snapshot retained.`,
  );
const repos = await response.json();
const fields = [
  "name",
  "description",
  "html_url",
  "homepage",
  "language",
  "stargazers_count",
  "updated_at",
];
await writeFile(
  new URL("../src/data/github.json", import.meta.url),
  JSON.stringify(
    repos
      .filter((r) => !r.private)
      .map((r) => Object.fromEntries(fields.map((k) => [k, r[k]]))),
    null,
    2,
  ) + "\n",
);
console.log(`Updated ${repos.length} public repositories.`);
