export const Packs = {
  Type: {
    Regular: 'regular',
    Ultimus: 'ultimus',
  },
}

export type PackType = {
  type: string
  name: string
  imageUrl: string
}

export const PACK_TYPES = [
  {
    type: 'regular',
    name: 'Regular Pack',
    imageUrl:
      'https://cdn.discordapp.com/attachments/1128513370048438333/1144126080136007761/contest_pack.png',
  },
  {
    type: 'ultimus',
    name: 'Ultimus Pack',
    imageUrl:
      'https://cdn.discordapp.com/attachments/719410556578299954/930916112604995685/Pack_Template.png',
  },
]

export const test = []
