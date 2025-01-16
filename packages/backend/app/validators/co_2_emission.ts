import vine from '@vinejs/vine'

export const co2EmissionValidator = vine.compile(
  vine.object({
    transportMethod: vine.string(),
    co2PerKm: vine.number(),
  })
)
