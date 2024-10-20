export type ResultYaku = {
  han_closed: number
  han_open: Object
  is_yakuman: boolean
  name: string
  tenhou_id: number
  yaku_id: number
}

export type ResultType = {
  cost: {
    additional: number
    additional_bonus: number
    kyoutaku_bonus: number
    main: number
    main_bonus: number
    total: number
    yaku_level: string
  }
  error: null | string
  fu: number
  fu_details: { fu: number, reason: string }[]
  han: number
  is_open_hand: boolean
  yaku: ResultYaku[]
}
