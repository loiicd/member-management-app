import { z } from 'zod'

export const qualificationShema = z.object({
  id:           z.string(),
  name:         z.string(),
  abbreviation: z.string().optional(),
})
export type qualificationType = z.infer<typeof qualificationShema>

export const qualificationFormDataShema = z.object({
  name:         z.string(),
  abbreviation: z.string().optional(),
})
export type qualificationFormDataType = z.infer<typeof qualificationFormDataShema>