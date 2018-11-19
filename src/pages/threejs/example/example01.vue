<template>
  <div class="graph" id="graphId"></div>
</template>

<script>
  import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    CubeGeometry,
    MeshBasicMaterial,
    Mesh
  } from 'three'

  export default {
    name: 'example01',
    data () {
      return {
        w: 100,
        h: 100,
        reqHandler: 0
      }
    },
    mounted () {
      this.graphChart()
      window.callbackResize = () => {
        this.graphChart()
      }
    },
    beforeDestroy () {
      if (this.renderer) {
        this.renderer.dispose()
        delete this.renderer
      }
    },
    methods: {
      graphChart () {
        let objEle = document.getElementById('graphId')
        let h = objEle.offsetHeight
        let w = objEle.offsetWidth
        this.h = h
        this.w = w
        // 创建场景
        let scene = new Scene()
        let camera = this.initCamera()
        let renderer = this.initRenderer()
        // 渲染器renderer的domElement元素，表示渲染器中的画布
        objEle.appendChild(renderer.domElement)
        let cubeMesh = this.initMesh()
        scene.add(cubeMesh)
        let _self = this

        function render () {
          if (_self.reqHandler) {
            cancelAnimationFrame(_self.reqHandler)
            _self.reqHandler = 0
          }
          _self.reqHandler = requestAnimationFrame(render)
          cubeMesh.rotation.x += 0.01
          cubeMesh.rotation.y += 0.01
          renderer.clear()
          // 渲染场景
          renderer.render(scene, camera)
        }

        render()
      },
      initRenderer () {
        // 创建渲染器，渲染器决定了渲染的结果应该画在页面的什么元素上面
        let renderer = new WebGLRenderer()
        // 设置渲染器大小
        renderer.setSize(this.w, this.h)
        // 参数16进制样色值和透明度
        renderer.setClearColor(0xcccccc, 0.6)
        return renderer
      },
      /* 创建透视相机，这一投影模式被用来模拟人眼所看到的景象 */
      initCamera () {
        let camera = new PerspectiveCamera(45, this.w / this.h, 1, 10000)
        camera.position.z = 5
        return camera
      },
      /* 创建网格物体 */
      initMesh () {
        // 创建几何体，CubeGeometry是一个正方体或者长方体
        // CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)
        let geometryCube = new CubeGeometry(1, 1, 1)
        // 创建材质，MeshBasicMaterial是一种非常简单的材质，这种材质不考虑场景中光照的影响。
        // 使用这种材质的网格会被渲染成简单的平面多边形，而且也可以显示几何体的线框。
        // MeshBasicMaterial({ color: '颜色', wireframe: '线框' })
        let material = new MeshBasicMaterial({ color: 0x33ff33, wireframe: true })
        // 通过几何体和材质来创建网格
        return new Mesh(geometryCube, material)
      }
    }
  }
</script>

<style scoped>
  .graph {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .1);
  }
</style>
