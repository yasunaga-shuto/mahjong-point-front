<template>
  <div>
    <OrganismsHeader />
    <div class="container mx-auto w-3/4 mt-8 mb-48">
      <div class="flex items-center gap-6 mb-6">
        <!-- 場風 -->
        <div class="flex items-center">
          <select id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="east" selected>東</option>
            <option value="south">南</option>
            <option value="west">西</option>
            <option value="north">北</option>
          </select>
          <label class="ml-2">場</label>
        </div>
        <!-- 本場 -->
        <div class="flex items-center">
          <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" required />

          <label class="w-full ml-2">本場</label>
        </div>
        <!-- 自風 -->
        <div class="flex items-center">
          <select id="countries" class="w-16 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="east" selected>東</option>
            <option value="south">南</option>
            <option value="west">西</option>
            <option value="north">北</option>
          </select>
          <label class="ml-2">家</label>
        </div>
      </div>
      <!-- 手牌 -->
      <div class="border w-full h-36 border-gray-400 rounded-md mb-6 flex items-center justify-center">
        <img v-for="t in tehai" :key="t" :src="`/pai/normal/${t}.gif`" class="w-12 h-14">
      </div>
      <!-- モード -->
      <div class="mb-6">
        <el-radio-group v-model="mode" size="large">
          <el-radio-button label="チー" value="チー" />
          <el-radio-button label="ポン" value="ポン" />
          <el-radio-button label="カン" value="カン" />
          <el-radio-button label="暗カン" value="暗カン" />
          <el-radio-button label="ドラ" value="ドラ" />
        </el-radio-group>
      </div>
      <div class="flex">
        <div class="h-36 w-3/6">
          <div class="mb-3">
            <img v-for="i in 9" :key="i" :src="`/pai/normal/${i}m.gif`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai(`${i}m`)">
          </div>
          <div class="mb-3">
            <img v-for="i in 9" :key="i" :src="`/pai/normal/${i}p.gif`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai(`${i}p`)">
          </div>
          <div class="mb-3">
            <img v-for="i in 9" :key="i" :src="`/pai/normal/${i}s.gif`" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai(`${i}s`)">
          </div>
          <div class="mb-3">
            <img src="/pai/normal/ton.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('ton')">
            <img src="/pai/normal/nan.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('nan')">
            <img src="/pai/normal/sha.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('sha')">
            <img src="/pai/normal/pei.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('pei')">
            <img src="/pai/normal/haku.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('haku')">
            <img src="/pai/normal/hatsu.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('hatsu')">
            <img src="/pai/normal/chun.gif" alt="pai1" class="inline-block cursor-pointer hover:-mt-3" @click="addPai('chun')">
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
        <el-button size="large">リセット</el-button>
        <el-button type="primary" size="large">計算</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type Manzu = '1m' | '2m' | '3m' | '4m' | '5m' | '6m' | '7m' | '8m' | '9m'
type Pinzu = '1p' | '2p' | '3p' | '4p' | '5p' | '6p' | '7p' | '8p' | '9p'
type Sozu = '1s' | '2s' | '3s' | '4s' | '5s' | '6s' | '7s' | '8s' | '9s'
type Tupai = 'ton' | 'nan' | 'sha' | 'pei' | 'haku' | 'hatsu' | 'chun'

const mode = ref('')
const how = ref('')
const riichi = ref('なし')
const ippatsu = ref(false)
const chankan = ref(false)
const linshan = ref(false)
const haitei = ref(false)
const hora = ref(false)

const tehai = ref<(Manzu | Pinzu | Sozu | Tupai)[]>([])

const addPai = (pai: Manzu | Pinzu | Sozu | Tupai) => {
  if (tehai && tehai.value.length >= 14) {
    return
  }
  tehai.value.push(pai)
}
</script>
