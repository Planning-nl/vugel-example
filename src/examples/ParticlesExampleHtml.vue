<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { ref, watch, Ref, onMounted, shallowRef } from "vue";
import { ColorUtils } from "tree2d";

class Item {
    id: number = 0;
    x: number = 0;
    y: number = 0;
    color: number = 0;
}

export default {
    setup() {
        const amount = ref(0);
        const items: Ref<Item[]> = shallowRef([]);
        watch(amount, (n: number) => {
            const newItems = [];
            for (let i = 0; i < n; i++) {
                const item = new Item();
                item.id = Math.random();
                item.x = Math.random() * 1000;
                item.y = Math.random() * 1000;
                item.color = ColorUtils.getArgbNumber([
                    Math.random() * 255,
                    Math.random() * 255,
                    Math.random() * 255,
                    255,
                ]);
                newItems.push(item);
            }
            items.value = newItems;
        });

        const loop = () => {
            const objs = items.value;
            objs.forEach((obj: Item) => {
                //obj.x += 0.1;
            });

            items.value = items.value;
            requestAnimationFrame(loop);
        };

        loop();

        setInterval(() => {
            amount.value = Math.random() * 10 + 10000;
        }, 100)
        return {
            changeAmount(e: { value: number }) {
                amount.value = e.value;
            },
            amount,
            items,
        };
    },
};
</script>

<template>
    <div>
        <div
            v-for="item in items"
            :key="item.id"
            class="block"
            :style="{
                left: item.x + 'px',
                top: item.y + 'px',
            }"
        />
    </div>
</template>
