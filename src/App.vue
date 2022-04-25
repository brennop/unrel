<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";

const instanceUrl = "https://inv.riverside.rocks";

const instance = axios.create({
  baseURL: instanceUrl,
});

type VideoItem = {
  title: string;
  author: string;
  videoId: string;
};

const player = ref<HTMLAudioElement | null>(null);

const query = ref("");
const data = ref<VideoItem[]>([]);
const loading = ref(false);

const current = ref<VideoItem>();

function handleSearch() {
  loading.value = true;
  instance
    .get(`api/v1/search?q=${query.value}&fields=title,author,videoId`)
    .then((response) => (data.value = response.data))
    .finally(() => (loading.value = false));
}

watch(current, () => player.value?.load());
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="border-slate-200 border-b">
      <form
        class="m-4 bg-slate-100 h-10 rounded-lg"
        @submit.prevent="handleSearch"
      >
        <input class="bg-transparent p-2 outline-none w-full" v-model="query" />
      </form>
    </div>
    <div v-if="loading">loading...</div>
    <ul class="overflow-y-auto flex-1">
      <li
        v-for="item in data"
        :key="item.videoId"
        class="px-6 py-2 border-b border-slate-200 flex flex-col hover:bg-gray-50 cursor-default"
        @click="current = item"
      >
        <span class="font-medium text-gray-900 truncate">{{ item.title }}</span>
        <span class="font-light text-gray-700">{{ item.author }}</span>
      </li>
    </ul>
    <div
      v-if="current"
      class="p-4 text-lg flex flex-col border-t
      border-slate-200 bg-gray-200 rounded-t-lg"
    >
      <span class="font-medium text-gray-900 truncate">{{
        current.title
      }}</span>
      <span class="font-light text-gray-700">{{ current.author }}</span>
      <audio controls autoplay ref="player" class="w-full mt-4">
        <source
          :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=139`"
          type='audio/mp4; codecs="mp4a.40.5"'
          label="50281k"
        />
        <source
          :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=140`"
          type='audio/mp4; codecs="mp4a.40.2"'
          label="130708k"
        />
        <source
          :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=249`"
          type='audio/webm; codecs="opus"'
          label="54870k"
        />
        <source
          :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=250`"
          type='audio/webm; codecs="opus"'
          label="70731k"
        />
        <source
          :src="`${instanceUrl}/latest_version?id=${current.videoId}&itag=251`"
          type='audio/webm; codecs="opus"'
          label="136432k"
        />
      </audio>
    </div>
  </div>
</template>
