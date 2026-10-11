import React from 'react';
import { DemoSection, DemoSubsection } from '../../shared/DemoSection';
import { DemoShowcase } from '../../shared/DemoShowcase';
import { PropsTable } from '../../shared/PropsTable';
import type { PropRow } from '../../shared/PropsTable';
import { DocPage, extractHeadings } from '@/layout';
import { PageContents } from '@/navigation';

const DocPageProps: PropRow[] = [
  { prop: 'content', type: 'string', description: 'Markdown string to render.' },
  { prop: 'centered', type: 'boolean', default: 'true', description: 'Center the content with a max-width constraint.' },
  { prop: 'maxWidth', type: 'number | string', description: 'Override the max-width of the content area.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the root element.' },
];

const markdownContent = `# Admin Platform Overview

The admin platform provides tools for managing users, configuring system settings, and monitoring operational health across all environments.

## Getting Started

Before using the admin tools, ensure you have the correct **role assignments** and *access credentials*. Contact your [IT administrator](#) if you need elevated permissions.

### Authentication

All API requests require a valid session token. Tokens expire after **24 hours** of inactivity.

#### Token Refresh

Tokens can be refreshed using the \`/auth/refresh\` endpoint before they expire.

##### Rate Limits

Each client is limited to 100 requests per minute. Exceeding this threshold returns a \`429 Too Many Requests\` response.

###### Deprecation Notice

Legacy v1 authentication endpoints will be removed in the next major release. Migrate to v2 as soon as possible.

---

## User Management

Platform administrators can perform the following actions:

- Create and deactivate user accounts
- Assign roles and permission groups
- Reset passwords and revoke active sessions
- Configure multi-factor authentication policies
  - Time-based one-time passwords (TOTP)
  - Hardware security keys (WebAuthn)
  - Backup recovery codes

### Onboarding Checklist

1. Provision the user account in the identity provider
2. Assign the appropriate role
3. Send the welcome email with login instructions
4. Verify that the user can access their assigned resources
   1. Check dashboard visibility
   2. Confirm API key generation
   3. Validate webhook configuration

---

## Configuration Reference

Below is a summary of the available environment configuration options:

| Setting             | Default     | Required | Description                          |
| ------------------- | ----------- | -------- | ------------------------------------ |
| \`API_BASE_URL\`      | \`/api/v2\`   | Yes      | Base URL for all API requests        |
| \`SESSION_TIMEOUT\`   | \`86400\`     | No       | Session timeout in seconds           |
| \`MAX_UPLOAD_SIZE\`   | \`10MB\`      | No       | Maximum file upload size             |
| \`ENABLE_AUDIT_LOG\`  | \`true\`      | Yes      | Toggle audit logging                 |
| \`RETRY_ATTEMPTS\`    | \`3\`         | No       | Number of retry attempts on failure  |

## Code Examples

Use the admin SDK to interact with the platform programmatically. Here is an inline reference to the \`AdminClient\` class.

\`\`\`typescript
import { AdminClient } from '@company/admin-sdk';

const client = new AdminClient({
  baseUrl: process.env.API_BASE_URL,
  token: process.env.ADMIN_TOKEN,
});

const users = await client.users.list({ status: 'active' });
console.log(\`Found \${users.length} active users\`);
\`\`\`

## Release Notes

> **Note:** Version 3.2 introduced breaking changes to the webhook payload format.
> Review the migration guide before upgrading.
>
> > *"We recommend testing in a staging environment first."*
> > -- Engineering Team

---

## Deployment Checklist

- [x] Run database migrations
- [x] Update environment variables
- [ ] Verify health check endpoints
- [ ] Notify stakeholders of the deployment window
- [ ] ~~Roll back v2.9 hotfix~~ (no longer needed)

The platform also supports ~~manual deployments~~, but automated pipelines are strongly recommended.
`;

export default function DocPageDemo() {
  return (
    <DemoSection title="DocPage" description="Renders markdown content with full styling. Uses react-markdown and remark-gfm internally.">
      <DemoShowcase code={`import { DocPage } from 'admin-ui';

const content = \`# Page Title

Some **markdown** content with *emphasis* and [links](#).
\`;

<DocPage content={content} />`}>
        <div style={{ width: '100%' }}>
          <DocPage content={markdownContent} />
        </div>
      </DemoShowcase>
      <PropsTable props={DocPageProps} />

      <DemoSubsection label="With Custom Class">
        <DocPage content={`## Custom Styled Section\n\nThis instance uses a custom \`className\` prop for additional styling control.`} className="custom-doc" />
      </DemoSubsection>

      <DemoSubsection label="With PageContents (extractHeadings)">
        <DemoShowcase code={`import { DocPage, extractHeadings } from 'admin-ui';
import { PageContents } from 'admin-ui';

const items = extractHeadings(content);

<div style={{ display: 'flex', gap: 'var(--admin-space-xl)', alignItems: 'flex-start' }}>
  <div style={{ position: 'sticky', top: 0, width: 200, flexShrink: 0 }}>
    <PageContents items={items} label="On this page" />
  </div>
  <div style={{ flex: 1, maxHeight: 480, overflowY: 'auto' }}>
    <DocPage content={content} centered={false} />
  </div>
</div>`}>
          <div style={{ display: 'flex', gap: 'var(--admin-space-xl)', alignItems: 'flex-start' }}>
            <div style={{ position: 'sticky', top: 'var(--admin-space-l)', width: 200, flexShrink: 0 }}>
              <PageContents items={extractHeadings(markdownContent)} label="On this page" />
            </div>
            <div style={{ flex: 1, maxHeight: 480, overflowY: 'auto', paddingRight: 'var(--admin-space-s)' }}>
              <DocPage content={markdownContent} centered={false} />
            </div>
          </div>
        </DemoShowcase>
      </DemoSubsection>
    </DemoSection>
  );
}
