<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let timer;
    const emojis: string[] = ["🍉", "🥐", "🌮", "🍗", "🍕", "🥗", "🍒", "🧀", "🍣"];
    let currentEmoji: string = emojis[0];

    onMount(() => {
        timer = setInterval(() => {
           currentEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        }, 300);
    });

    onDestroy(() => {
        if (timer) {
            clearInterval(timer);
        }
    });
</script>

<div class="cursor-wait">
    {currentEmoji}
</div>

<style></style>
