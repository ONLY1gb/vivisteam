export const CONTACT_EMAIL = 'vivistemsummercamp@gmail.com';

export function openMailClient(email: string) {
  const anchor = document.createElement('a');
  anchor.href = `mailto:${email}`;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
