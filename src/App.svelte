<script lang="ts">
  import { onMount } from "svelte";
  import Story from "./lib/Story.svelte";
  import SamokatLogo from "./assets/samokat-logo.png";
  import Loader from "./lib/Loader.svelte";
  import type { StoryItem } from "./types";
  import base from "./services/airtable";

  let isLoading: boolean = false;
  let stories: StoryItem[] = [];

  onMount(async () => {
    isLoading = true;

    try {
      base("story")
        .select({
          view: "Grid view",
        })
        .eachPage(
          function page(records: any) {
            stories = records.map((rec) => rec.fields);
            isLoading = false;
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );

      
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div class="dark:bg-neutral-700">
  <div class="pt-8 mb-10">
    <div class="screen-container flex flex-col items-center">
      <div class="relative mb-4">
        <img class="h-14 w-14" src={SamokatLogo} alt="Samokat Logo" />

        {#if isLoading}
          <div
            class="absolute top-0 left-0 w-full h-full flex justify-center items-center"
          >
            <div
              class="bg-[#ff3b65] w-[70%] h-[70%] rounded-xl flex justify-center items-center text-3xl"
            >
              <Loader />
            </div>
          </div>
        {/if}
      </div>

      <h1 class="text-center text-3xl font-bold border-b-4 border-[#ff335f] dark:text-white dark:pb-1">
        Истории
      </h1>
    </div>
  </div>

  <main class="screen-container space-y-12 md:space-y-16">
    {#each stories as story}
      <Story data={story} />
    {/each}
  </main>

  <footer class="mt-12 w-full bg-[#ff335f] py-10 text-white">
    <div class="screen-container text-center">
      <p class="mb-6">
        <a
          class="text-5xl"
          href="https://t.me/d3ple"
          target="_blank"
          rel="noopener noreferrer"
        >
          🐵
        </a>
      </p>

      <p>Вся информация только для ознакомления</p>
      <p class="mb-4">Все права на материалы принадлежат сервису "Самокат"</p>

      <a
        class="border-b-2 border-gray-200"
        href="https://samokat.ru/"
        target="_blank"
        rel="noopener noreferrer"
      >
        samokat.ru
      </a>
    </div>
  </footer>
</div>

<style>
  .screen-container {
    @apply max-w-screen-lg px-4 mx-auto;
  }
</style>
