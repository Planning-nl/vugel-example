<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { ref, watch, Ref, shallowRef } from "vue";
import { ColorUtils, Element } from "tree2d";
import { Container, Node } from "vugel";

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
        const items: Ref<Item[]> = ref([]);

        const container: Ref<Container | null> = shallowRef(null);

        const loop = () => {
            if (container.value) {
                const ctr = container.value!.el;
                const n = Math.floor(amount.value);
                if (ctr.children.length !== n) {
                    ctr.childList.clear();
                    for (let i = 0; i < n; i++) {
                        const element = new Element(ctr.stage);
                        element.ref = "" + i;
                        element.color = ColorUtils.getArgbNumber([
                            Math.random() * 255,
                            Math.random() * 255,
                            Math.random() * 255,
                            255,
                        ]);
                        element.w = 10;
                        element.h = 10;
                        element.mount = 0.5;
                        element.texture = ctr.stage.rectangleTexture;
                        element.x = Math.random() * 500;
                        element.y = Math.random() * 500;
                        ctr.childList.add(element);
                    }
                }

                const children = ctr.children;
                children.forEach((child: Element) => {
                    if (child) {
                        child.x = (child.x as number) + 0.1;
                    }
                });
            }

            requestAnimationFrame(loop);
        };

        loop();

        return {
            changeAmount(e: { value: number }) {
                amount.value = e.value;
            },
            container,
            amount,
            items,
        };
    },
};
</script>

<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <container ref="container"></container>
        </template>
        <template v-slot:form-items>
            <item name="amount">
                <drag-bar :initial-value="100" :min="0" :max="60000" @change="changeAmount" />
            </item>
        </template>
    </editor>
</template>
