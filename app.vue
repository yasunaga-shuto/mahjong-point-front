<template>
  <div>
    <OrganismsHeader />
    <div class="container mx-auto w-3/4 mt-8 mb-48">
      <div class="flex items-center gap-6 mb-6">
        <!-- 場風 -->
        <div class="flex items-center">
          <select v-model="ba" id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
          <select v-model="jicha" id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="ton" selected>東</option>
            <option value="nan">南</option>
            <option value="sha">西</option>
            <option value="pei">北</option>
          </select>
          <label class="ml-2">家</label>
        </div>
      </div>
      <!-- 手牌 -->
      <div class="border w-full h-36 border-gray-400 rounded-md mb-6 flex items-center justify-center relative">
        <el-button class="absolute top-4 right-8" @click="sort">並び替え（埋牌）</el-button>
        <img v-for="(t, index) in tehai" :key="index" :src="`/pai/${t}.gif`" class="w-12 h-14">

        <div v-for="(t, i) in hupai" :key="`hupai-${i}`" class="ml-4">
          <span v-for="(p, j) in t.pai" :key="`hupai-${i}-${j}`">
            <img :src="`/pai/${p}.gif`" class="w-12 h-14 inline-block" :class="{ 'rotate-[270deg]': j === 0 }">
          </span>
        </div>
      </div>
      <!-- モード -->
      <div class="mb-6">
        <el-radio-group v-model="mode" size="large" @input="inputMode">
          <el-radio-button label="チー" value="chi" />
          <el-radio-button label="ポン" value="pon" />
          <el-radio-button label="カン" value="kan" />
          <el-radio-button label="暗カン" value="ankan" />
          <el-radio-button label="ドラ" value="dora" />
        </el-radio-group>
      </div>
      <div class="flex">
        <div class="h-36 w-3/6">
          <div class="mb-3">
            <img v-for="i in 9" :key="i" :src="`/pai/${i}m.gif`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai(`${i}m`)">
          </div>
          <div class="mb-3">
            <img v-for="i in 9" :key="i" :src="`/pai/${i}p.gif`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai(`${i}p`)">
          </div>
          <div class="mb-3">
            <img v-for="i in 9" :key="i" :src="`/pai/${i}s.gif`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai(`${i}s`)">
          </div>
          <div class="mb-3">
            <img src="/pai/ton.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('ton')">
            <img src="/pai/nan.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('nan')">
            <img src="/pai/sha.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('sha')">
            <img src="/pai/pei.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('pei')">
            <img src="/pai/haku.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('haku')">
            <img src="/pai/hatsu.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('hatsu')">
            <img src="/pai/chun.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('chun')">
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
        <el-button type="primary" size="large">計算</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const MANZU = ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m'] as const
const PINZU = ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p'] as const
const SOZU = ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'] as const
const TUPAI = ['ton', 'nan', 'sha', 'pei', 'haku', 'hatsu', 'chun'] as const

type Manzu = typeof MANZU[number]
type Pinzu = typeof PINZU[number]
type Sozu = typeof SOZU[number]
type Tupai = typeof TUPAI[number]
type Pai = Manzu | Pinzu | Sozu | Tupai
type Mode = 'chi' | 'pon' | 'kan' | 'ankan' | 'dora' | ''

const ba = ref('ton')
const honba = ref(0)
const jicha = ref('ton')

const mode = ref<Mode>('')
const how = ref('')
const riichi = ref('なし')
const ippatsu = ref(false)
const chankan = ref(false)
const linshan = ref(false)
const haitei = ref(false)
const hora = ref(false)

const tehai = ref<Pai[]>([])
const hupai = ref<{ type: Mode, pai: Pai[] }[]>([])

const addPai = (pai: Pai) => {
  if (tehai.value.length + hupai.value.length * 3 >= 14) {
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
  tehai.value = []
}
</script>
