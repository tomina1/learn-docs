---
aside: false
---

# Vue-CLI 源代码结构图
**简介**

<div id="xmind"></div>

<script setup>
    import { defineOptions, onMounted } from "vue"
    import { XMindEmbedViewer } from "xmind-embed-viewer"
    
    defineOptions({
        name: "Vue_CLI_Flow"
    })

    let viewer
    onMounted(() => {
        const data = fetch(import.meta.env.BASE_URL + "./Vue-CLI.xmind")
            .then(res => res.arrayBuffer())

        viewer = new XMindEmbedViewer({
            el: "#xmind",
            region: "cn"
        })
        
        data.then(file => viewer.load(file))

        viewer.setStyles({
            width: "100%",
            height: "60vh"
        })
    })
    
</script>
<style scoped>
    #xmind {
        max-width: unset !important;
        width: 60vw;
    }
</style>