import { initializeZapt } from '@zapt/zapt-js';
import { createEvent } from '@zapt/zapt-js';

export const { supabase } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);
export { createEvent };