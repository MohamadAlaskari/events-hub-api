// mail/templates/verification.template.ts
export function verificationEmailTemplate(
  username: string,
  verifyUrl: string,
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
        <h2 style="margin:0; font-size:22px;">Confirm your email</h2>
        <div style="margin-top:6px; font-size:12px; opacity:0.9;">
          by <a href="${brand.url}" style="color:#F5F3FF; text-decoration:underline;">${brand.name}</a>
        </div>
      </div>
      <div style="padding:24px;">
        <p>Hi ${username},</p>
        <p>Please confirm your email to unlock all ${appName} features. After confirming, you can save favorites, get reminders, and access tickets/links faster.</p>
        <div style="margin-top:20px;">
          <a href="${verifyUrl}" style="display:inline-block; background:${primary}; color:#FFFFFF; text-decoration:none; padding:12px 18px; border-radius:8px; font-weight:bold;">
            Confirm email
          </a>
        </div>
        <p style="margin-top:16px; color:${muted}; word-break:break-all;">
          Or open this link:<br />
          <a href="${verifyUrl}" style="color:${primary}; text-decoration:none;">${verifyUrl}</a>
        </p>
        <p style="margin-top:16px; color:${muted};">If you didn’t request this, you can ignore this message.</p>
      </div>
      <div style="padding:16px 24px; border-top:1px solid ${border}; color:${muted}; font-size:12px;">
        © ${new Date().getFullYear()} ${appName} • A product of <a href="${brand.url}" style="color:${primary}; text-decoration:none;">${brand.name}</a>
      </div>
    </div>
  </div>`;
}
