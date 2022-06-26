<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import videojs from "video.js";
  import "video.js/dist/video-js.css";

  export let src: string;
  let player: any;
  let videoElement: HTMLVideoElement;

  const options: any = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: src,
        type: "application/x-mpegURL",
      },
    ],
  };

  onMount(() => {
    player = videojs(videoElement, options, () => {});
  });

  onDestroy(() => {
    if (player) {
      player.dispose();
    }
  });
</script>

<video bind:this={videoElement} class="video-js h-full w-full aspect-[9/16]">
  <track kind="captions" />
</video>

<style></style>
