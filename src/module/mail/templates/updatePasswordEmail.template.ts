// mail/templates/updatePasswordEmail.template.ts
export function updatePasswordEmailTemplate(
  username: string,
  resetUrl: string,
  appName = 'EventHub',
  brand: { name: string; url: string } = { name: 'Alaskari Tech.', url: 'https://alaskaritech.com' }
): string {
  const primary = '#7C3AED';
  const text = '#111827';
  const muted = '#6B7280';
  const border = '#E5E7EB';
  const bg = '#FFFFFF';

  return `
  <div style="font-family: Arial, sans-serif; background:${bg}; color:${text}; padding:24px;">
    <div style="max-width:600px; margin:0 auto; border:1px solid ${border}; border-radius:12px; overflow:hidden;">
      <div style="background:${primary}; color:#FFFFFF; padding:20px 24px;">
        <h2 style="margin:0; font-size:22px;">Reset your password</h2>
        <div style="margin-top:6px; font-size:12px; opacity:0.9;">
          by <a href="${brand.url}" style="color:#F5F3FF; text-decoration:underline;">${brand.name}</a>
        </div>
      </div>
      <div style="padding:24px;">
        <p>Hi ${username},</p>
        <p>You requested to reset your <strong style="color:${primary};">${appName}</strong> password. Use the button below to set a new one.</p>
        <div style="margin-top:20px;">
          <a href="${resetUrl}" style="display:inline-block; background:${primary}; color:#FFFFFF; text-decoration:none; padding:12px 18px; border-radius:8px; font-weight:bold;">
            Set new password
          </a>
        </div>
        <p style="margin-top:16px; color:${muted}; word-break:break-all;">
          If the button doesn’t work, open this link:<br />
          <a href="${resetUrl}" style="color:${primary}; text-decoration:none;">${resetUrl}</a>
        </p>
        <p style="margin-top:16px; color:${muted};">
          If you didn’t request this, you can ignore this email.
        </p>
      </div>
      <div style="padding:16px 24px; border-top:1px solid ${border}; color:${muted}; font-size:12px;">
        © ${new Date().getFullYear()} ${appName} • A product of <a href="${brand.url}" style="color:${primary}; text-decoration:none;">${brand.name}</a>
      </div>
    </div>
  </div>`;
}
