import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getClassAndSubjectFromURL(search: string) {
  const params = new URLSearchParams(search);
  const className = params.get('class');
  const subject = params.get('subject');
  return { className, subject };
}
