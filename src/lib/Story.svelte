<script lang="ts">
  import { onMount } from "svelte";
  import HlsVideo from "./HlsVideo.svelte";
  import Loader from "./Loader.svelte";
  import type { AirtableStory, AirtableSlide } from "../types";
  import base from "../services/airtable";

  export let data: AirtableStory;

  let slides: AirtableSlide[] = [];
  let isLoading: boolean = false;

  onMount(async () => {
    isLoading = true;

    try {
      base("slide")
        .select({
          view: "Grid view",
          filterByFormula: `{story} = '${data.slug}'`,
          sort: [{field: "order", direction: "asc"}]
        })
        .eachPage(
          function page(records: any) {
            slides = records.map(rec => rec.fields);
          },
          function done(err) {
            if (err) {
              console.error(err);
              return;
            }
          }
        );

      isLoading = false;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div id={data.slug}>
  <!-- <h2 class="text-2xl font-medium text-center mb-3">{data.title}</h2> -->
  <div
    class="flex w-full space-x-6 flex-nowrap overflow-x-auto snap-mandatory snap-x"
    style="scrollbar-width: none;"
  >
    {#if isLoading}
      <div
        class="h-[70vh] aspect-[9/16] rounded w-full bg-red-100 text-5xl flex justify-center items-center"
      >
        <Loader />
      </div>
    {/if}

    {#each slides as slide}
      <figure
        class="flex cursor-pointer flex-shrink-0 h-[70vh] aspect-[9/16] rounded overflow-hidden snap-start snap-always"
      >
        {#if slide.type === "fullscreen-image"}
          <img
            class="w-full h-full object-cover bg-red-100 flex justify-center items-center"
            src={slide.url}
            alt="Слайд"
          />
        {/if}

        {#if slide.type === "video"}
          <HlsVideo src={slide.url} />
        {/if}
      </figure>
    {/each}
  </div>
</div>

<style>
</style>
