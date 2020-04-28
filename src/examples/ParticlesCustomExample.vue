<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { ref, watch, Ref, shallowRef } from "vue";
import { ColorUtils, Element } from "tree2d";
import {Container, Node, Rectangle} from "vugel";

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

        const reusedRectangles: Rectangle[] = [];

        const loop = () => {
            if (container.value) {
                if (!reusedRectangles.length) {
                    for (let i = 0; i < 50000; i++) {
                        const rectangle = new Rectangle(container.value!.stage);
                        reusedRectangles.push(rectangle);
                    }
                }

                const ctr = container.value!;

                const n = Math.floor(amount.value);
                if (ctr.getChildren().length !== n) {
                    ctr.clearChildren();
                    for (let i = 0; i < n; i++) {
                        const rectangle = reusedRectangles[i];
                        rectangle.color = ColorUtils.getArgbNumber([
                            Math.random() * 255,
                            Math.random() * 255,
                            Math.random() * 255,
                            255,
                        ]);
                        rectangle.w = 10;
                        rectangle.h = 10;
                        rectangle.mount = 0.5;
                        rectangle.x = Math.random() * 1000;
                        rectangle.y = Math.random() * 1000;
                        ctr.appendChild(rectangle);
                    }
                }

                const children = ctr.getChildren() as Node[];
                children.forEach((child: Node) => {
                    if (child) {
                        child.x = (child.el.x as number) + 0.1;
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
