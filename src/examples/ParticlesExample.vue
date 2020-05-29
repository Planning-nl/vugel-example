<script lang="ts">
import DragBar from "./form/DragBar.vue";
import Editor from "./form/Editor.vue";
import FormItem from "./form/FormItem.vue";
import { ref, watch, Ref, onMounted, shallowRef, triggerRef } from "vue";
import { ColorUtils, RoundRectTexture, Stage, Texture } from "tree2d";
import { Container, VugelMouseEvent } from "vugel";
import Toggle from "./form/Toggle.vue";
import { Node } from "vugel";

class Item {
    id: number = 0;
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    color: number = 0;
}

export default {
    components: { DragBar, Toggle, Editor, item: FormItem },
    setup() {
        const amount = ref(0);
        const items: Ref<Item[]> = shallowRef([]);

        const container: Ref<Container | null> = ref(null);

        let frames = 0;
        const loop = () => {
            frames++;
            if (frames === 100) {
                console.profile("frame 100-300");
            }
            if (frames === 300) {
                console.profileEnd("frame 100-300");
            }

            const n = Math.floor(amount.value);

            if (container.value) {
                const objs = items.value;
                objs.forEach((obj: Item) => {
                    const dx = pos.value[0] - obj.x;
                    const dy = pos.value[1] - obj.y;
                    const dist2 = 0.1 * (dx * dx + dy * dy) + 100;

                    obj.vx = 0.995 * obj.vx + dx / dist2;
                    obj.vy = 0.995 * obj.vy + dy / dist2;

                    obj.x += obj.vx;
                    obj.y += obj.vy;
                });

                if (custom.value) {
                    update();
                } else {
                    // Force reactivity.
                    triggerRef(items);
                }

                if (container.value?.getChildren().length !== n) {
                    const newItems = [];
                    const rw = container.value!.el.renderWidth;
                    const rh = container.value!.el.renderHeight;
                    for (let i = 0; i < n; i++) {
                        const item = new Item();
                        item.id = i;
                        item.x = Math.random() * rw;
                        item.y = Math.random() * rh;
                        item.vx = Math.random();
                        item.vy = Math.random();
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
            }
            requestAnimationFrame(loop);
        };

        const update = () => {
            const ctr = container.value;
            if (ctr) {
                const children = ctr.getChildren();
                const objs = items.value;
                children.forEach((child, index) => {
                    child.x = objs[index].x;
                    child.y = objs[index].y;
                });
            }
        };

        loop();

        const pos: Ref<number[]> = shallowRef([0, 0]);
        const custom = ref(false);

        const texture: Ref<RoundRectTexture | undefined> = shallowRef(undefined);
        const textureNode: Ref<Node | undefined> = shallowRef(undefined);

        let circleTexture: Texture | undefined = undefined;

        return {
            mousemove(e: VugelMouseEvent) {
                const offset = e.currentTarget!.getLocalOffset(e.canvasOffsetX, e.canvasOffsetY);
                pos.value[0] = offset[0];
                pos.value[1] = offset[1];
            },
            changeAmount(e: { value: number }) {
                amount.value = e.value;
            },
            changeCustom(e: { value: boolean }) {
                custom.value = e.value;
            },
            amount,
            items,
            container,
            textureNode,
            texture,
            createCircle(stage: Stage) {
                if (!circleTexture) {
                    const tx = new RoundRectTexture(stage);
                    tx.options = { w: 10, h: 10, radius: [5, 5, 5, 5], shadowBlur: 2, shadowColor: 0xffffffff };
                    circleTexture = tx;
                }
                return circleTexture;
            },
        };
    },
};
</script>

<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <container ref="container" func-w="w" func-h="h" @mousemove="mousemove">
                <texture
                    v-for="item in items"
                    :key="item.id"
                    :texture-factory="createCircle"
                    :x="item.x"
                    :y="item.y"
                    :mount="0.5"
                    :color="item.color"
                />
            </container>
        </template>
        <template v-slot:form-items>
            <item name="amount">
                <drag-bar :initial-value="6000" :max="20000" @change="changeAmount" />
            </item>
            <item name="direct updates">
                <toggle :initial-value="false" @change="changeCustom" />
            </item>
        </template>
    </editor>
</template>
