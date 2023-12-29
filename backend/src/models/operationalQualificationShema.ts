import { z } from 'zod'

export const OperationalQualificationShema = z.object({
  id:        z.string(),
  name:      z.string(),
})
export type OperationalQualificationType = z.infer<typeof OperationalQualificationShema>