# Publishing @servicestack/react v2.0.0 to npm

## Overview

This package is configured to publish to npm using **OIDC Trusted Publishing** via GitHub Actions. This is more secure than using npm tokens because:

- ✅ No secrets to manage or rotate
- ✅ Automatic authentication via GitHub's OIDC provider
- ✅ Includes provenance attestation for supply chain security
- ✅ Scoped to specific repository and workflow

## Prerequisites

### 1. Configure Trusted Publishing on npm

Before you can publish, you need to set up trusted publishing on npmjs.com:

1. **Go to your package settings on npm:**
   - Visit: https://www.npmjs.com/package/@servicestack/react/access
   - Or navigate to: Your package → Settings → Publishing Access

2. **Add a Trusted Publisher:**
   - Click "Add Trusted Publisher"
   - Select "GitHub Actions"
   - Fill in the details:
     - **Repository owner:** `ServiceStack` (or your GitHub org/username)
     - **Repository name:** `servicestack-react`
     - **Workflow name:** `npm-publish.yml`
     - **Environment name:** (leave blank unless you use GitHub Environments)

3. **Save the configuration**

> **Note:** For first-time packages that don't exist yet on npm, you may need to publish a dummy version first using a traditional npm token, then configure trusted publishing. Alternatively, npm now supports configuring trusted publishing for packages that don't exist yet.

### 2. Verify Your Workflow

The workflow file `.github/workflows/npm-publish.yml` has been updated with:

```yaml
permissions:
  id-token: write  # Required for OIDC authentication
  contents: read
```

And the publish command now includes:
```yaml
npm publish --provenance --access public
```

The `--provenance` flag generates a signed attestation linking the package to your source code and build.

## Publishing Steps

### Option 1: Create a GitHub Release (Recommended)

1. **Ensure your code is ready:**
   ```bash
   npm run build
   npm test
   ```

2. **Commit and push all changes:**
   ```bash
   git add .
   git commit -m "Release v2.0.0"
   git push origin main
   ```

3. **Create and push a git tag:**
   ```bash
   git tag v2.0.0
   git push origin v2.0.0
   ```

4. **Create a GitHub Release:**
   - Go to: https://github.com/ServiceStack/servicestack-react/releases/new
   - Choose tag: `v2.0.0`
   - Release title: `v2.0.0`
   - Add release notes describing what's new
   - Click "Publish release"

5. **GitHub Actions will automatically:**
   - ✅ Run tests
   - ✅ Build the package
   - ✅ Authenticate via OIDC
   - ✅ Publish to npm with provenance
   - ✅ No npm token needed!

### Option 2: Manual Publishing (Fallback)

If you need to publish manually (not recommended for production):

1. **Create an npm access token** (classic automation token)
2. **Publish locally:**
   ```bash
   npm publish --access public
   ```

## Verifying the Publication

After publishing, verify:

1. **Check npm:** https://www.npmjs.com/package/@servicestack/react
2. **Verify provenance:** Look for the "Provenance" badge on the npm package page
3. **Check GitHub Actions:** Review the workflow run for any issues

## Troubleshooting

### "OIDC token not found" error

- Ensure `permissions.id-token: write` is set in the workflow
- Verify the workflow is triggered by a release event
- Check that you're using npm CLI version 11.5.1 or later

### "Trusted publisher not configured" error

- Complete the trusted publishing setup on npmjs.com (see Prerequisites)
- Ensure the repository owner, name, and workflow match exactly

### "Package already exists" error

- If this is the first publish, you may need to use `--access public` for scoped packages
- The workflow already includes this flag

## Additional Resources

- [npm Trusted Publishing Documentation](https://docs.npmjs.com/trusted-publishers/)
- [GitHub OIDC Documentation](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)

## Current Package Configuration

- **Package name:** `@servicestack/react`
- **Version:** `2.0.0`
- **Registry:** https://registry.npmjs.org/
- **Access:** Public
- **Provenance:** Enabled

