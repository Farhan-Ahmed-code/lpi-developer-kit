# Contributing to the LPI Developer Kit

## How to Submit

### Fork and Clone

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/lpi-developer-kit.git
cd lpi-developer-kit
npm install
npm run build
```

### Make Your Changes

- **Level 1:** Add your JSON file to `contributors/your-name.json`
- **Level 2:** Add your submission to `submissions/your-name/level2.md`
- **Level 3:** Build a separate repo, link it in `submissions/your-name/level3.md`

### Submit a PR

```bash
git add .
git commit -s -m "level-X: Your Name"
git push origin main
```

Then open a Pull Request on GitHub. Use the PR template.

**Important:** The `-s` flag adds your `Signed-off-by` line. Every contribution must be signed off.

### PR Title Format

- Level 1: `level-1: Your Name`
- Level 2: `level-2: Your Name`
- Level 3: `level-3: Your Name`

## Code Style

- TypeScript for server extensions
- Python or JavaScript for agents (your choice)
- Include a README in any standalone repo
- Include setup instructions that actually work

## Questions?

Post in the Teams channel: `#lifeatlas-contributors`
