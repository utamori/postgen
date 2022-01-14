# about contentSnippet

No support for `content:encoded` such as medium

# flag

- `-i` `--input` input file path
  - default `./members.json`
- `-o` `--output` output directory
  - default `.contents`
- `-f` `--file` output file name
  - default `posts.json`

# Github Action example

```yaml
name: daily or manual deploy
on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
      - run: >
          deno run --allow-net ---allow-read=. --allow-write=. --no-check
          https://deno.land/x/denote/cli/denote.ts register ./denote.yml
          --name kawarimidoll --token '${{ secrets.DENOTE_TOKEN }}'
```

# References

- [How to Use TypeScript and Deno to Build a CLI](https://www.twilio.com/blog/use-deno-build-cli)
