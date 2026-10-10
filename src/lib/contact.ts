export const CONTACT_SUBJECTS = [
  "Activity not counted",
  "Reward withdrawal enquiry",
  "Schedule and break modification",
  "Account closure enquiry",
  "Others",
] as const;

export const MESSAGE_MAX = 500;
export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic", "pdf"];
export const ACCEPT_ATTR = ".jpg,.jpeg,.png,.webp,.heic,.pdf,image/jpeg,image/png,image/webp,image/heic,application/pdf";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactErrors = Partial<Record<"name" | "email" | "subject" | "message" | "attachments", string>>;

export function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

/** Shared by the form (client) and the API route (server) so both enforce identical rules. */
export function validateContact(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: { name: string; size: number }[];
}): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.trim().length < 2) errors.name = "Please enter your name.";
  else if (input.name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!EMAIL_PATTERN.test(input.email.trim())) errors.email = "Please enter a valid email address.";

  if (!(CONTACT_SUBJECTS as readonly string[]).includes(input.subject)) {
    errors.subject = "Please choose a subject.";
  }

  const message = input.message.trim();
  if (message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (input.message.length > MESSAGE_MAX) errors.message = `Message must be ${MESSAGE_MAX} characters or fewer.`;

  const attachmentError = validateAttachments(input.files);
  if (attachmentError) errors.attachments = attachmentError;
  return errors;
}

export function validateAttachments(files: { name: string; size: number }[]): string | undefined {
  if (files.length > MAX_FILES) return `You can attach up to ${MAX_FILES} files.`;
  const bad = files.find((f) => !ALLOWED_EXTENSIONS.includes(fileExtension(f.name)));
  if (bad) return `"${bad.name}" isn't a supported file type.`;
  const big = files.find((f) => f.size > MAX_FILE_BYTES);
  if (big) return `"${big.name}" is larger than 5 MB.`;
  return undefined;
}
