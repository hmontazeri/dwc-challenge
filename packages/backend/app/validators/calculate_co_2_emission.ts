import vine from '@vinejs/vine'

export const calculateCO2EmissionValidator = vine.compile(
  vine.object({
    distance: vine.number(),
    distanceUnit: vine.enum(['km', 'm'] as const),
    transportMethod: vine.string(),
    outputUnit: vine.enum(['g', 'kg'] as const),
  })
)
