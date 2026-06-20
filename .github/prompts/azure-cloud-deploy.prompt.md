---
description: Deploy this static web app to Azure Static Web Apps with Azure Developer CLI.
agent: agent
---

You are deploying this workspace to Azure Cloud.

Trigger phrases include:

- Azure 클라우드로 배포해줘
- Azure로 배포해줘
- Azure cloud deploy

Follow this playbook:

1. Inspect the workspace and confirm it is still a static web app using `azure.yaml`.
2. Run `npm run build` and fix any build errors before continuing.
3. Check Azure authentication with `az account show`.
4. If the user is not logged in, run `azd auth login` and wait for completion.
5. Confirm the Azure subscription and location before provisioning. For this project, prefer `eastasia` when the user wants a Korea-adjacent region and `eastus2` when they want the broadest Azure Static Web Apps compatibility.
6. If no azd environment exists, create one with a clear name such as `lipcoding-dev`.
7. Set the confirmed subscription and location explicitly:

   ```sh
   azd env set AZURE_SUBSCRIPTION_ID <subscription-id>
   azd env set AZURE_LOCATION <location>
   ```

8. Run `azd up`.
9. After deployment, report the Azure Static Web Apps endpoint URL from the `azd up` output or from:

   ```sh
   azd env get-values
   ```

10. If deployment fails, read the first Azure/AZD error carefully, fix only the relevant configuration, rerun the smallest failing command, and summarize the fix.

Security rules:

- Do not echo or store deployment tokens.
- Do not expose Azure secrets in Bicep outputs, logs, prompts, or Markdown.
- Do not delete existing Azure resources unless the user explicitly asks.
