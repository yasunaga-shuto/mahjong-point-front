<template>
  <div>
    <OrganismsHeader />
    <div class="container mx-auto w-3/4 mt-8 mb-48">
      <div class="flex justify-between items-center my-6">
        <div class="flex items-center gap-6">
          <!-- 場風 -->
          <div class="flex items-center">
            <select v-model="roundWind" id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="ton" selected>東</option>
              <option value="nan">南</option>
              <option value="sha">西</option>
              <option value="pei">北</option>
            </select>
            <label class="ml-2">場</label>
          </div>
          <!-- 本場 -->
          <div class="flex items-center">
            <input v-model="honba" type="number" id="number-input" aria-describedby="helper-text-explanation" class="w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" required />

            <label class="w-full ml-2">本場</label>
          </div>
          <!-- 自風 -->
          <div class="flex items-center">
            <select v-model="playerWind" id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="ton" selected>東</option>
              <option value="nan">南</option>
              <option value="sha">西</option>
              <option value="pei">北</option>
            </select>
            <label class="ml-2">家</label>
          </div>
        </div>
        <!-- ドラ表示牌 -->
        <div class="border border-gray-400 rounded-md py-3 px-6">
          ドラ表示牌
          <div class="text-center">
            <img v-for="(d, index) in doraIndicators" :key="index" :src="`/pai/${d}.png`" width="37" class="inline">
          </div>
        </div>
      </div>
      <!-- 手牌 -->
      <div class="border w-full h-52 border-gray-400 rounded-md mb-6 flex items-center justify-center relative">
        <el-button class="absolute top-4 right-8" @click="sort">並び替え（埋牌）</el-button>
        <img v-for="(t, index) in tehai" :key="index" :src="`/pai/${t}.png`" width="47">
        <img v-if="agariPai" class="ml-3" :src="`/pai/${agariPai}.png`" width="47">

        <div v-for="(t, i) in hupai" :key="`hupai-${i}`" class="ml-4">
          <!-- カン -->
          <template v-if="t.type === 'ankan'">
            <span v-for="(p, j) in t.pai" :key="`hupai-${i}-${j}`">
              <img v-if="j === 0 || j === t.pai.length - 1" src="/pai/back.png" class="inline-block h-16" width="47">
              <img v-else :src="`/pai/${p}.png`" class="inline-block h-16" width="47">
            </span>
          </template>
          <template v-else>
            <span v-for="(p, j) in t.pai" :key="`hupai-${i}-${j}`">
              <img :src="`/pai/${p}.png`" class="inline-block h-16" :class="{ 'rotate-[270deg] mr-2': j === 0 }" width="47">
            </span>
          </template>
        </div>
      </div>
      <!-- モード -->
      <div class="mb-6">
        <el-radio-group v-model="mode" size="large" @input="inputMode">
          <el-radio-button label="チー" value="chi" />
          <el-radio-button label="ポン" value="pon" />
          <el-radio-button label="カン" value="kan" />
          <el-radio-button label="暗カン" value="ankan" />
          <el-radio-button label="ドラ表示牌" value="dora_indicators" />
          <el-radio-button label="和了牌" value="agari" />
        </el-radio-group>
      </div>
      <div class="flex">
        <div class="h-36 w-3/6">
          <div class="mb-3">
            <img v-for="(man, index) in MANZU" :key="index" :src="`/pai/${man}.png`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai(man)">
          </div>
          <div class="mb-3">
            <img v-for="(pin, index) in PINZU" :key="index" :src="`/pai/${pin}.png`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai(pin)">
          </div>
          <div class="mb-3">
            <img v-for="(sou, index) in SOZU" :key="index" :src="`/pai/${sou}.png`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai(sou)">
          </div>
          <div class="mb-3">
            <img src="/pai/ton.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('ton')">
            <img src="/pai/nan.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('nan')">
            <img src="/pai/sha.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('sha')">
            <img src="/pai/pei.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('pei')">
            <img src="/pai/haku.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('haku')">
            <img src="/pai/hatsu.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('hatsu')">
            <img src="/pai/chun.png" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" width="47" @click="addPai('chun')">
          </div>
        </div>
        <div class="w-3/6">
          <div class="mb-3">
            <el-radio-group v-model="how" size="large">
              <el-radio-button label="ツモ" value="ツモ" />
              <el-radio-button label="ロン" value="ロン" />
            </el-radio-group>
          </div>
          <div class="mb-3">
            <el-radio-group v-model="riichi" size="large">
              <el-radio-button label="なし" value="なし" />
              <el-radio-button label="リーチ" value="リーチ" />
              <el-radio-button label="ダブルリーチ" value="ダブルリーチ" />
            </el-radio-group>
          </div>
          <div class="mb-3">
            <el-switch
              v-model="hasAkaDora"
              size="large"
              active-text="赤あり"
            />
          </div>
          <div class="mb-3">
            <el-switch
              v-model="ippatsu"
              size="large"
              active-text="一発"
            />
          </div>
          <div class="mb-3">
            <el-switch
              v-model="chankan"
              size="large"
              active-text="チャンカン"
            />
          </div>
          <div class="mb-3">
            <el-switch
              v-model="linshan"
              size="large"
              active-text="嶺上開花"
            />
          </div>
          <div class="mb-3">
            <el-switch
              v-model="haitei"
              size="large"
              active-text="ハイテイ"
            />
          </div>
          <div class="mb-3">
            <el-switch
              v-model="hora"
              size="large"
              active-text="第一ツモで和了"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center fixed bottom-0 h-28" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="w-3/4 mx-auto flex justify-end">
        <el-button size="large" @click="reset">リセット</el-button>
        <el-button type="primary" size="large" @click="calculate">計算</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// https://majandofu.com/mahjong-images
const MANZU = ['1m', '2m', '3m', '4m', '5m', '5mRed', '6m', '7m', '8m', '9m'] as const
const PINZU = ['1p', '2p', '3p', '4p', '5p', '5pRed', '6p', '7p', '8p', '9p'] as const
const SOZU = ['1s', '2s', '3s', '4s', '5s', '5sRed', '6s', '7s', '8s', '9s'] as const
const TUPAI = ['ton', 'nan', 'sha', 'pei', 'haku', 'hatsu', 'chun'] as const

type Manzu = typeof MANZU[number]
type Pinzu = typeof PINZU[number]
type Sozu = typeof SOZU[number]
type Tupai = typeof TUPAI[number]
type Pai = Manzu | Pinzu | Sozu | Tupai
type Mode = 'chi' | 'pon' | 'kan' | 'ankan' | 'dora_indicators' | ''

const roundWind = ref('ton')
const playerWind = ref('ton')
const honba = ref(0)

const mode = ref<Mode>('')
const how = ref('ロン')
const riichi = ref('なし')
const ippatsu = ref(false)
const hasAkaDora = ref(true)
const chankan = ref(false)
const linshan = ref(false)
const haitei = ref(false)
const hora = ref(false)
const doraIndicators = ref<Pai[]>([])
const agariPai = ref('')

const tehai = ref<Pai[]>([])
const hupai = ref<{ type: Mode, pai: Pai[] }[]>([])

const addPai = (pai: Pai) => {
  switch (mode.value) {
  case 'agari':
    agariPai.value = pai
    mode.value = ''
    break
  case 'dora_indicators':
    doraIndicators.value.push(pai)
    mode.value = ''
    break
  }
  if (tehai.value.length + hupai.value.length * 3 >= 13) {
    return
  }
  switch (mode.value) {
  case 'chi':
    const last = hupai.value.slice(-1)[0]
    last.pai.push(pai)
    hupai.value[hupai.length - 1] = last
    if (last && last.pai.length === 3) {
      mode.value = ''
    }
    break
  case 'pon':
    hupai.value.push({ type: 'pon', pai: [pai, pai, pai] })
    mode.value = ''
    break
  case 'ankan':
  case 'kan':
    if (!hasAkaDora.value) {
      hupai.value.push({ type: mode.value, pai: [pai, pai, pai, pai] })
      mode.value = ''
      break
    }
    switch (pai) {
    case '5m':
    case '5mRed':
      hupai.value.push({ type: mode.value, pai: ['5m', '5m', '5mRed', '5m'] })
      break
    case '5p':
    case '5pRed':
      hupai.value.push({ type: mode.value, pai: ['5p', '5p', '5pRed', '5p'] })
      break
    case '5s':
    case '5sRed':
      hupai.value.push({ type: mode.value, pai: ['5s', '5s', '5sRed', '5s'] })
      break
    default:
      hupai.value.push({ type: mode.value, pai: [pai, pai, pai, pai] })
      break
    }
    mode.value = ''
    break
  default:
    tehai.value.push(pai)
  }
}
const inputMode = (event: { target: HTMLInputElement }) => {
  const mode = event.target.value
  if (mode !== 'chi') {
    return
  }
  hupai.value.push({ type: mode, pai: [] })
}
const sort = () => {
  const order = [...MANZU, ...PINZU, ...SOZU, ...TUPAI]
  const t = tehai.value.sort((x: Pai, y: Pai) => order.indexOf(x) - order.indexOf(y))
  tehai.value = t
}
const reset = () => {
  mode.value = ''
  how.value = ''
  riichi.value = 'なし'
  ippatsu.value = false
  chankan.value = false
  linshan.value = false
  haitei.value = false
  hora.value = false
  agariPai.value = ''
  doraIndicators.value = []
  tehai.value = []
  hupai.value = []
}

const splitTile = (tileStr: Pai) => {
  const num = /^([1-9])[mps]/g.exec(tileStr)
  if (!num) {
    return [tileStr, tileStr]
  }
  const type = /^[1-9]([mps])/g.exec(tileStr)
  if (!type) {
    return [tileStr, tileStr]
  }
  if (tileStr.includes('Red')) {
    return ['r', type[1]]
  }
  return [num[1], type[1]]
}

const getTileNum = (t: Pai) => {
  const [num, type] = splitTile(t)
  let man = ''
  let pin = ''
  let sou = ''
  let honor = ''
  switch (type) {
  case 'm':
    man = num
    break
  case 'p':
    pin = num
    break
  case 's':
    sou = num
    break
  case 'ton':
    honor = '1'
    break
  case 'nan':
    honor = '2'
    break
  case 'sha':
    honor = '3'
    break
  case 'pei':
    honor = '4'
    break
  case 'haku':
    honor = '5'
    break
  case 'hatsu':
    honor = '6'
    break
  case 'chun':
    honor = '7'
    break
  }
  return [man, pin, sou, honor]
}

const calculate = async () => {
  let man = ''
  let pin = ''
  let sou = ''
  let honors = ''
  for (const t of tehai.value) {
    const [m, p, s, h] = getTileNum(t)
    man += m
    pin += p
    sou += s
    honors += h
  }
  for (const t of hupai.value) {
    if (t.type === 'chi' || t.type === 'pon') {
      let pai: Pai
      for (pai of t.pai) {
        const [m, p, s, h] = getTileNum(pai)
        man += m
        pin += p
        sou += s
        honors += h
      }
    } else {
      // カン
      let kanTilesMan = ''
      let kanTilesPin = ''
      let kanTilesSou = ''
      let kanTilesHonors = ''
      let pai: Pai
      for (pai of t.pai) {
        const [m, p, s, h] = getTileNum(pai)
        kanTilesMan += m
        kanTilesPin += p
        kanTilesSou += s
        kanTilesHonors += h
      }
      man += kanTilesMan
      pin += kanTilesPin
      sou += kanTilesSou
      honors += kanTilesHonors
    }
  }
  // 和了牌
  const [m, p, s, h] = getTileNum(agariPai.value)
  man += m
  pin += p
  sou += s
  honors += h
  console.log(man, pin, sou)
  man = man.split('').sort().join('')
  pin = pin.split('').sort().join('')
  sou = sou.split('').sort().join('')
  honors = honors.split('').sort().join('')
  // const data = await $fetch('http://localhost:8080', {
  //   method: 'POST',
  //   body: {
  //     man: '234678',
  //     pin: '5r55',
  //     sou: '23455',
  //     honors: '',
  //     dora_indicators: ['1m', '1p'],
  //     win_tile: '2s',
  //     melds: [
  //       { type: 'ankan', pai: ['back', '5p', '5p', 'back'] },
  //     ],
  //     has_aka_dora: true,
  //   }
  // })
  const data = await $fetch('http://localhost:8080', {
    method: 'POST',
    body: {
      man,
      sou,
      pin,
      honors,
      dora_indicators: doraIndicators.value,
      win_tile: agariPai.value,
      melds: hupai.value,
      has_aka_dora: hasAkaDora.value,
      is_riichi: riichi.value === 'リーチ',
      is_tsumo: how.value === 'ツモ',
      is_daburu_riichi: riichi.value === 'ダブルリーチ',
      is_ippatsu: ippatsu.value,
      is_chankan: chankan.value,
      is_rinshan: linshan.value,
      is_haitei: haitei.value,
      is_tenhou: hora.value,
      round_wind: roundWind.value,
      player_wind: playerWind.value,
    }
  })
  console.log(data)
}
</script>
