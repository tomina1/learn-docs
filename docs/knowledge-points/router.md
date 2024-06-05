---
aside: false
---

# Router 源代码结构图
**简介**

<div id="xmind"></div>

<script setup>
    import { defineOptions, onMounted } from "vue"
    import { XMindEmbedViewer } from "xmind-embed-viewer"
    
    defineOptions({
        name: "Router_Flow"
    })

    let viewer
    onMounted(() => {
        const data = fetch("./Router.xmind")
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
<style>
    .content-container {
        max-width: unset !important;
        width: 60vw;
    }
</style>