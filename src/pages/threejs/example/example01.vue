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
    LineBasicMaterial,
    Geometry,
    Vector3,
    Line,
    Mesh
  } from 'three'

  export default {
    name: 'example01',
    data () {
      return {
        reqHandler: 0
      }
    },
    mounted () {
      this.graphChart()
      window.callbackResize = () => {
        this.graphChart()
      }
    },
    methods: {
      graphChart () {
        let objEle = document.getElementById('graphId')
        let h = objEle.offsetHeight
        let w = objEle.offsetWidth
        // 创建场景
        let scene = new Scene()
        // 创建透视相机，这一投影模式被用来模拟人眼所看到的景象
        let camera = new PerspectiveCamera(75, w / h, 1, 1000)
        // 创建渲染器，渲染器决定了渲染的结果应该画在页面的什么元素上面
        let renderer = new WebGLRenderer()
        // 设置渲染器大小
        renderer.setSize(w, h)
        // 渲染器renderer的domElement元素，表示渲染器中的画布
        objEle.appendChild(renderer.domElement)
        // 创建几何体，CubeGeometry是一个正方体或者长方体
        // CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)
        let geometryCube = new CubeGeometry(1, 1, 1)
        // 创建材质，MeshBasicMaterial是一种非常简单的材质，这种材质不考虑场景中光照的影响。
        // 使用这种材质的网格会被渲染成简单的平面多边形，而且也可以显示几何体的线框。
        // MeshBasicMaterial({ color: '颜色', wireframe: '线框' })
        let material = new MeshBasicMaterial({ color: 0x00ff00 })
        let materialLine = new LineBasicMaterial({ color: 0x0000ff })
        let geometryLine = new Geometry()
        geometryLine.vertices.push(new Vector3(-10, 0, 0))
        geometryLine.vertices.push(new Vector3(0, 10, 0))
        geometryLine.vertices.push(new Vector3(10, 0, 0))
        let line = new Line(geometryLine, materialLine)
        // 通过几何体和材质来创建网格
        let cube = new Mesh(geometryCube, material)
        scene.add(cube)
        scene.add(line)
        camera.position.z = 5
        let _this = this

        function render () {
          if (_this.reqHandler) {
            cancelAnimationFrame(_this.reqHandler)
            _this.reqHandler = 0
          }
          _this.reqHandler = requestAnimationFrame(render)
          cube.rotation.x += 0.01
          cube.rotation.y += 0.01
          // 渲染场景
          renderer.render(scene, camera)
        }

        render()
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
