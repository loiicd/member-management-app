import { z } from 'zod'

export const QualificationShema = z.object({
  id:           z.string(),
  name:         z.string(),
  abbreviation: z.string().optional(),
  color:        z.string().optional(),
  version:      z.number()
})
export type QualificationType = z.infer<typeof QualificationShema>

export const QualificationFormDataShema = z.object({
  name:         z.string(),
  abbreviation: z.string().optional(),
  color:        z.string().optional(),
})
export type QualificationFormDataType = z.infer<typeof QualificationFormDataShema>