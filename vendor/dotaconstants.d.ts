declare module 'dotaconstants' {
  export const items: {
    [item_name: string]: {
      active?: {
        name: string
        desc: string
      }[]
      id: number
      img: string
      dname: string
      qual: string
      cost: number
      notes: string
      attrib: {
        key: string
        header: string
        value: string
        footer: string
      }[]
      mc: boolean
      cd: number
      lore: string
      components: string[] | null
      created: boolean
    }
  }
}
