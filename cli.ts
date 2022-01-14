import { ensureDirSync } from "https://deno.land/std@0.121.0/fs/mod.ts";
import { PostItem } from "./types.ts";
import { getMemberFeedItems } from "./generatePost.ts";
import { parseFlags } from "https://deno.land/x/cliffy/flags/mod.ts";
import { flags } from "./flags.ts";

const argv = parseFlags(Deno.args, flags);

const members = await import(argv.flags.input, {
  assert: { type: "json" },
});

let allPostItems: PostItem[] = [];
for (const member of members.default) {
  const items = await getMemberFeedItems(member);
  if (items) allPostItems = [...allPostItems, ...items];
}
allPostItems.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);

ensureDirSync(argv.flags.output);

Deno.writeTextFileSync(
  `${argv.flags.output}/${argv.flags.file}`,
  JSON.stringify(allPostItems),
);
