import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomName() {
  const adjectives = ["Anonymous", "Hidden", "Silent", "Ghost", "Neon", "Cyber", "Misty"];
  const nouns = ["Apple", "User", "Shadow", "Echo", "Wolf", "Raven", "Signal"];
  
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const hash = Math.random().toString(36).substring(2, 6); // small hash for uniqueness

  return `${adj}-${noun}-${hash}`;
}