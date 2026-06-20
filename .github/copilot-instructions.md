# Copilot Instructions

This workspace is a pure static web app. The current app is a Korean calculator implemented in `index.html`.

## Superpowers Agent Skills

This repository includes Superpowers-style Agent Skills in `.github/skills/`.

When working in VS Code Copilot Agent mode:

- Treat `.github/skills` as the project skill source.
- At the start of each meaningful task, check whether one of the Superpowers skills applies.
- Load and follow the full `SKILL.md` for any applicable skill before acting.
- When a copied skill mentions Claude Code, Codex, `Skill`, `TodoWrite`, or subagent-specific tooling, translate the intent to VS Code Copilot Agent mode:
  - Use Copilot Agent's workspace editing and terminal tools for file changes and commands.
  - Use VS Code tasks when they exist.
  - Use the chat checklist or task plan UI when a skill asks for todos.
  - Use Copilot subagents or separate agent sessions only when available; otherwise perform the same review or verification directly.

Common skill triggers:

- Use `using-superpowers` when starting a substantial coding task or deciding which skill applies.
- Use `brainstorming` before creative UI, feature, or behavior design.
- Use `writing-plans` before multi-step implementation.
- Use `test-driven-development` before feature or bugfix implementation.
- Use `systematic-debugging` for bugs, failing tests, or unexpected behavior.
- Use `verification-before-completion` before claiming work is done or passing.
- Use `requesting-code-review` and `receiving-code-review` around review workflows.
- Use `finishing-a-development-branch` before merge, PR, or cleanup decisions.

## Default Development Rules

- Keep the app simple unless the user asks for a framework.
- For this root-level static site, use `npm run build` to copy deployable assets into `public/`.
- Do not put generated build output in source edits. `public/` is ignored.
- Validate changes with `npm run build` before deployment.
- **Do NOT push or deploy automatically.** After building and testing, wait for the user to explicitly say "배포해줘" before running `git push` or `azd deploy`.

## Azure Deployment Rule

When the user says `Azure 클라우드로 배포해줘`, `Azure로 배포해줘`, or a similar Korean Azure deployment request, use the workspace prompt file `.github/prompts/azure-cloud-deploy.prompt.md` as the deployment playbook.

The deployment target is Azure Static Web Apps through Azure Developer CLI:

- Project configuration: `azure.yaml`
- Infrastructure: `infra/main.bicep`
- Service host: `staticwebapp`
- Build output: `public`
- Main command: `azd up`

Before a live deployment, confirm or detect:

- Azure login status with `az account show`
- Target subscription
- Target region, preferring a Static Web Apps-supported region such as `eastasia`, `eastus2`, `westus2`, `centralus`, or `westeurope`

Never print, commit, or expose Azure deployment tokens or secrets.
