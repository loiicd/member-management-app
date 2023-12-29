import { z } from 'zod'

export const OperationalQualificationShema = z.object({
  id:           z.string(),
  name:         z.string(),
  abbreviation: z.string().optional(),
})
export type OperationalQualificationType = z.infer<typeof OperationalQualificationShema>