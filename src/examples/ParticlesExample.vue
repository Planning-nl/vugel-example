<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { ref, watch, Ref, onMounted, shallowRef } from "vue";
import { ColorUtils } from "tree2d";
import { Container } from "vugel";

class Item {
    id: number = 0;
    x: number = 0;
    y: number = 0;
    color: number = 0;
}

export default {
    components: { DragBar, Editor, item: FormItem },
    setup() {
        const amount = ref(0);
        const items: Ref<Item[]> = shallowRef([]);

        const container: Ref<Container | null> = shallowRef(null);

        const loop = () => {
            const n = amount.value;

            if (container.value?.getChildren().length !== n) {
                const newItems = [];
                for (let i = 0; i < n; i++) {
                    const item = new Item();
                    item.id = Math.random();
                    item.x = Math.random() * 500;
                    item.y = Math.random() * 500;
                    item.color = ColorUtils.getArgbNumber([
                        Math.random() * 255,
                        Math.random() * 255,
                        Math.random() * 255,
                        255,
                    ]);
                    newItems.push(item);
                }
                items.value = newItems;
            }

            const objs = items.value;
            objs.forEach((obj: Item) => {
                //obj.x += 0.1;
            });

            items.value = items.value;
            requestAnimationFrame(loop);
        };

        loop();

        return {
            changeAmount(e: { value: number }) {
                amount.value = e.value;
            },
            amount,
            items,
            container,
        };
    },
};
</script>

<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <container ref="container">
                <rectangle
                    v-for="item in items"
                    :key="item.id"
                    :x="item.x"
                    :y="item.y"
                    :w="10"
                    :h="10"
                    :mount="0.5"
                    :color="item.color"
                />
            </container>
        </template>
        <template v-slot:form-items>
            <item name="amount">
                <drag-bar :initial-value="100" :max="60000" @change="changeAmount" />
            </item>
        </template>
    </editor>
</template>
