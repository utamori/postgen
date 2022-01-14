import { OptionType } from "https://deno.land/x/cliffy/flags/mod.ts";

export const flags = {
  allowEmpty: true,
  stopEarly: true,
  flags: [{
    name: "input",
    aliases: ["i"],
    default: "./members.json",
    type: OptionType.STRING,
  }, {
    name: "output",
    aliases: ["o"],
    default: ".contents",
    type: OptionType.STRING,
  }, {
    name: "file",
    aliases: ["f"],
    default: "posts.json",
    type: OptionType.STRING,
  }],
};
