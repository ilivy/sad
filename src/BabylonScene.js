import React, { useState } from 'react'
import '@babylonjs/loaders/OBJ'
import PropTypes from 'prop-types'
import {
    FreeCamera,
    Vector3,
    HemisphericLight,
    Mesh,
    StandardMaterial,
    CubeTexture,
    Texture,
    Scene,
    Color3,
    MeshBuilder,
    SceneLoader,
    Sound,
    WorkerPool,
    VertexOutputBlock,
    NodeMaterialSystemValues,
    InputBlock,
    TransformBlock,
    FragmentOutputBlock,
    MultiplyBlock,
    ColorMergerBlock,
    ScaleBlock,
    AnimatedInputBlockTypes,
    StepBlock,
    PowBlock,
    NormalizeBlock,
    DotBlock,
    AddBlock,
    OneMinusBlock,
    ViewDirectionBlock,
    LightInformationBlock,
    VectorSplitterBlock,
    NodeMaterial,
    NodeMaterialModes,
    TransformNode,
} from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook'
import { useButtonContext } from './App'
import ThirdPage from './ThirdPage'

export default function BabylonScene() {
    const { setIsLoaded, isOpen, setProgress } = useButtonContext();
    const [isClose, setIsClose] = useState(false)

    const onSceneReady = async (scene) => {
        setProgress(0)
        const engine = scene.getEngine()
        const canvas = engine.getRenderingCanvas()

        const camera = new FreeCamera(
            'FreeCamera',
            new Vector3(-40, 20, -40),
            scene
        )
        camera.setTarget(new Vector3(0, 0, 0))
        camera.attachControl(canvas, true)
        camera.minZ = 0.42
        camera.speed = 1
        camera.angularSensibility = 5000
        camera.keysUp.push(87)
        camera.keysLeft.push(65)
        camera.keysDown.push(83)
        camera.keysRight.push(68)

        // // Функция для создания анимации перемещения камеры
        // const moveCameraSmoothly = () => {
        //     const randomX = Math.random() * 100 - 50
        //     const randomY = Math.random() * 40 - 20
        //     const randomZ = Math.random() * 100 - 50
        //     const newPosition = new Vector3(randomX, randomY, randomZ)

        //     // Создание анимации
        //     const animation = scene.beginAnimation(
        //         serializeAsCameraReference.current,
        //         0,
        //         60, // Длительность анимации (60 кадров в секунду)
        //         false
        //     )

        //     serializeAsCameraReference.current.animations = []
        //     serializeAsCameraReference.current.animations.push(animation)

        //     // Установка новой позиции камеры
        //     serializeAsCameraReference.current.position = newPosition
        // }

        // // Запустить анимацию при загрузке компонента
        // useEffect(() => {
        //     moveCameraSmoothly()
        // }, [])

        //Light
        const light = new HemisphericLight(
            'light1',
            new Vector3(0, 0.00001, 0),
            scene
        )
        light.intensity = 0.7

        //Skybox
        const skybox = Mesh.CreateBox('skyBox', 10000.0, scene)
        var skyboxMaterial = new StandardMaterial('skyBox', scene)
        skyboxMaterial.backFaceCulling = false
        skyboxMaterial.reflectionTexture = new CubeTexture(
            'environment_3.env',
            scene
        )
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
        skyboxMaterial.diffuseColor = new Color3(1, 1, 1)
        skyboxMaterial.specularColor = new Color3(5, 5, 5)
        skyboxMaterial.disableLighting = false
        skybox.material = skyboxMaterial

        scene.fogMode = Scene.FOGMODE_EXP

        scene.fogColor = new Color3(0.58, 0.85, 0.99)
        //(0.58, 0.85, 0.99) day (0.29, 0.32, 0.35) night
        scene.fogDensity = 0.0085
        setProgress(5)
        //Ground
        const ground = new MeshBuilder.CreateGroundFromHeightMap(
            '',
            '/Terrain_map.png',
            {
                height: 2000,
                width: 2000,
                subdivisions: 40,
                maxHeight: 25,
            }
        )
        setProgress(15)
        const groundmaterial = new StandardMaterial('ground', scene)
        groundmaterial.diffuseTexture = new Texture('/342342.jpg', scene)
        groundmaterial.diffuseTexture.uScale = 10
        groundmaterial.diffuseTexture.vScale = 10

        ground.material = groundmaterial

        // Enable Collisions
        ground.collisionsEnabled = true

        // Physics
        const gravity = new Vector3(0, -1, 0)
        scene.enablePhysics(gravity)

        //earth gravity
        const assumedFramesPerSecond = 60
        const earthGravity = -90.81
        scene.gravity = new Vector3(0, earthGravity / assumedFramesPerSecond, 0)

        //Then apply collisions and gravity to the active camera
        camera.checkCollisions = true
        camera.applyGravity = true

        //Set the ellipsoid around the camera (e.g. your player's size)
        camera.ellipsoid = new Vector3(1, 10, 1)

        //finally, say which mesh will be collisionable
        ground.checkCollisions = true

        const sphereMat = new StandardMaterial('sphereMat', scene)
        sphereMat.diffuseColor = Color3.Purple()
        sphereMat.backFaceCulling = false
        sphereMat.alpha = 0

        const sphereMusicZ = Mesh.CreateSphere('musicsphere', 50, 50, scene)
        sphereMusicZ.material = sphereMat
        sphereMusicZ.position = new Vector3(248, 25, 360)

        const sphereMusicS = Mesh.CreateSphere('musicsphere', 50, 50, scene)
        sphereMusicS.material = sphereMat
        sphereMusicS.position = new Vector3(307, 25, -347)

        const sphereMusicN = Mesh.CreateSphere('musicsphere', 50, 50, scene)
        sphereMusicN.material = sphereMat
        sphereMusicN.position = new Vector3(-391, 25, -27)

        const music1 = new Sound(
            'Z',
            './sound/Z/Z11-ambient.mp3',
            scene,
            null,
            {
                loop: true,
                autoplay: true,
                maxDistance: 700,
                useCustomAttenuation: true,
            }
        )
        music1.attachToMesh(sphereMusicZ)

        const music2 = new Sound(
            'S',
            './sound/S/S-ambient-death01.mp3',
            scene,
            null,
            {
                loop: true,
                autoplay: true,
                maxDistance: 700,
                useCustomAttenuation: true,
            }
        )
        music2.attachToMesh(sphereMusicS)

        const music3 = new Sound(
            'N',
            './sound/N/N_08_chaos_x(1-2).mp3',
            scene,
            null,
            {
                loop: true,
                autoplay: true,
                maxDistance: 700,
                useCustomAttenuation: true,
            }
        )
        music3.attachToMesh(sphereMusicN)
        setProgress(25)

        //////////////////////////tree1//////////////////////

        let transFromNode_tr1 = new TransformNode('node_tr1')
        transFromNode_tr1.position.y = 3
        // GUI
        var bgPlane_tr1 = MeshBuilder.CreatePlane('bgPlane_tr1', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_tr1.setEnabled(false)

        let stand_tr1 = new StandardMaterial('bgMaterial_tr1')
        let bgTexture_tr1 = new Texture('/person2white.png')
        stand_tr1.disableLighting = true
        stand_tr1.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_tr1.opacityTexture = bgTexture_tr1
        bgPlane_tr1.material = stand_tr1
        let iconBgUrl_tr1 = '/person2white.png'
        let sizeV_tr1 = 0.5
        var iconMesh_tr1 = MeshBuilder.CreatePlane('iconMesh_tr1', {
            width: sizeV_tr1 * 1.4,
            height: sizeV_tr1,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_tr1 = new StandardMaterial('iconMaterial_tr1')
        let bgTexture2_tr1 = new Texture(iconBgUrl_tr1)
        stand2_tr1.disableLighting = true
        stand2_tr1.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_tr1.opacityTexture = bgTexture2_tr1
        iconMesh_tr1.material = stand2_tr1
        iconMesh_tr1.position.z += 0.01
        iconMesh_tr1.setEnabled(false)

        let iconGroup_tr1 = new TransformNode('iconGroup_tr1')
        iconGroup_tr1.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_tr1 = bgPlane_tr1.createInstance(
            bgPlane_tr1.name + '-instance'
        )
        bgPlaneInstance_tr1.setEnabled(true)
        let iconMeshInstance_tr1 = iconMesh_tr1.createInstance(
            iconMesh_tr1.name + '-instance'
        )
        iconGroup_tr1.position = new Vector3(180, 50, 340)
        iconMeshInstance_tr1.setEnabled(true)
        bgPlaneInstance_tr1.parent = iconGroup_tr1
        iconMeshInstance_tr1.parent = iconGroup_tr1
        iconGroup_tr1.parent = transFromNode_tr1

        //////////

        let transFromNode_2_tr1 = new TransformNode('node_2_tr1')
        transFromNode_2_tr1.position.y = 3
        // GUI
        var bgPlane_2_tr1 = MeshBuilder.CreatePlane('bgPlane_2_tr1', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_2_tr1.setEnabled(false)

        let stand_2_tr1 = new StandardMaterial('bgMaterial_2_tr1')
        let bgTexture_2_tr1 = new Texture('/nota1white.png')
        stand_2_tr1.disableLighting = true
        stand_2_tr1.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_2_tr1.opacityTexture = bgTexture_2_tr1
        bgPlane_2_tr1.material = stand_2_tr1

        let iconBgUrl_2_tr1 = '/nota1white.png'
        let sizeV_2_tr1 = 0.5
        var iconMesh_2_tr1 = MeshBuilder.CreatePlane('iconMesh_2_tr1', {
            width: sizeV_2_tr1 * 1.4,
            height: sizeV_2_tr1,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_2_tr1 = new StandardMaterial('iconMaterial_2_tr1')
        let bgTexture2_2_tr1 = new Texture(iconBgUrl_2_tr1)
        stand2_2_tr1.disableLighting = true
        stand2_2_tr1.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_2_tr1.opacityTexture = bgTexture2_2_tr1
        iconMesh_2_tr1.material = stand2_2_tr1
        iconMesh_2_tr1.position.z += 0.01
        iconMesh_2_tr1.setEnabled(false)

        let iconGroup_2_tr1 = new TransformNode('iconGroup_2_tr1')
        iconGroup_2_tr1.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_2_tr1 = bgPlane_2_tr1.createInstance(
            bgPlane_2_tr1.name + '-instance_2'
        )
        bgPlaneInstance_2_tr1.setEnabled(true)
        let iconMeshInstance_2_tr1 = iconMesh_2_tr1.createInstance(
            iconMesh_2_tr1.name + '-instance_2'
        )
        iconGroup_2_tr1.position = new Vector3(280, 50, 340)
        iconMeshInstance_2_tr1.setEnabled(true)
        bgPlaneInstance_2_tr1.parent = iconGroup_2_tr1
        iconMeshInstance_2_tr1.parent = iconGroup_2_tr1
        iconGroup_2_tr1.parent = transFromNode_2_tr1

        ///////////

        let transFromNode_3_tr1 = new TransformNode('node_3_tr1')
        transFromNode_3_tr1.position.y = 3
        // GUI
        var bgPlane_3_tr1 = MeshBuilder.CreatePlane('bgPlane_3_tr1', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_3_tr1.setEnabled(false)

        let stand_3_tr1 = new StandardMaterial('bgMaterial_3_tr1')
        let bgTexture_3_tr1 = new Texture('/tree_white.png')
        stand_3_tr1.disableLighting = true
        stand_3_tr1.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_3_tr1.opacityTexture = bgTexture_3_tr1
        bgPlane_3_tr1.material = stand_3_tr1

        let iconBgUrl_3_tr1 = '/tree_white.png'
        let sizeV_3 = 0.5
        var iconMesh_3_tr1 = MeshBuilder.CreatePlane('iconMesh_3_tr1', {
            width: sizeV_3 * 1.4,
            height: sizeV_3,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_3_tr1 = new StandardMaterial('iconMaterial_3_tr1')
        let bgTexture2_3_tr1 = new Texture(iconBgUrl_3_tr1)
        stand2_3_tr1.disableLighting = true
        stand2_3_tr1.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_3_tr1.opacityTexture = bgTexture2_3_tr1
        iconMesh_3_tr1.material = stand2_3_tr1
        iconMesh_3_tr1.position.z += 0.01
        iconMesh_3_tr1.setEnabled(false)

        let iconGroup_3_tr1 = new TransformNode('iconGroup_3_tr1')
        iconGroup_3_tr1.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_3_tr1 = bgPlane_3_tr1.createInstance(
            bgPlane_3_tr1.name + '-instance_3_tr1'
        )
        bgPlaneInstance_3_tr1.setEnabled(true)
        let iconMeshInstance_3_tr1 = iconMesh_3_tr1.createInstance(
            iconMesh_3_tr1.name + '-instance_3_tr1'
        )
        iconGroup_3_tr1.position = new Vector3(260, 50, 400)
        iconMeshInstance_3_tr1.setEnabled(true)
        bgPlaneInstance_3_tr1.parent = iconGroup_3_tr1
        iconMeshInstance_3_tr1.parent = iconGroup_3_tr1
        iconGroup_3_tr1.parent = transFromNode_3_tr1

        ////////////////////////////////////tree2///////////////////////////////////////

        let transFromNode_tr2 = new TransformNode('node_tr2')
        transFromNode_tr2.position.y = 3
        // GUI
        var bgPlane_tr2 = MeshBuilder.CreatePlane('bgPlane_tr2', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_tr2.setEnabled(false)

        let stand_tr2 = new StandardMaterial('bgMaterial_tr2')
        let bgTexture_tr2 = new Texture('/person2white.png')
        stand_tr2.disableLighting = true
        stand_tr2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_tr2.opacityTexture = bgTexture_tr2
        bgPlane_tr2.material = stand_tr2

        let iconBgUrl_tr2 = '/person2white.png'
        let sizeV_tr2 = 0.5
        var iconMesh_tr2 = MeshBuilder.CreatePlane('iconMesh_tr2', {
            width: sizeV_tr2 * 1.4,
            height: sizeV_tr2,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_tr2 = new StandardMaterial('iconMaterial_tr2')
        let bgTexture2_tr2 = new Texture(iconBgUrl_tr2)
        stand2_tr2.disableLighting = true
        stand2_tr2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_tr2.opacityTexture = bgTexture2_tr2
        iconMesh_tr2.material = stand2_tr2
        iconMesh_tr2.position.z += 0.01
        iconMesh_tr2.setEnabled(false)

        let iconGroup_tr2 = new TransformNode('iconGroup_tr2')
        iconGroup_tr2.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_tr2 = bgPlane_tr2.createInstance(
            bgPlane_tr2.name + '-instance'
        )
        bgPlaneInstance_tr2.setEnabled(true)
        let iconMeshInstance_tr2 = iconMesh_tr2.createInstance(
            iconMesh_tr2.name + '-instance'
        )
        iconGroup_tr2.position = new Vector3(-340, 50, -25)
        iconMeshInstance_tr2.setEnabled(true)
        bgPlaneInstance_tr2.parent = iconGroup_tr2
        iconMeshInstance_tr2.parent = iconGroup_tr2
        iconGroup_tr2.parent = transFromNode_tr2

        //////////////////////

        let transFromNode_2_tr2 = new TransformNode('node_2_tr2')
        transFromNode_2_tr2.position.y = 3
        // GUI
        var bgPlane_2_tr2 = MeshBuilder.CreatePlane('bgPlane_2_tr2', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_2_tr2.setEnabled(false)

        let stand_2_tr2 = new StandardMaterial('bgMaterial_2_tr2')
        let bgTexture_2_tr2 = new Texture('/nota1white.png')
        stand_2_tr2.disableLighting = true
        stand_2_tr2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_2_tr2.opacityTexture = bgTexture_2_tr2
        bgPlane_2_tr2.material = stand_2_tr2

        let iconBgUrl_2_tr2 = '/nota1white.png'
        let sizeV_2_tr2 = 0.5
        var iconMesh_2_tr2 = MeshBuilder.CreatePlane('iconMesh_2_tr2', {
            width: sizeV_2_tr2 * 1.4,
            height: sizeV_2_tr2,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_2_tr2 = new StandardMaterial('iconMaterial_2_tr2')
        let bgTexture2_2_tr2 = new Texture(iconBgUrl_2_tr2)
        stand2_2_tr2.disableLighting = true
        stand2_2_tr2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_2_tr2.opacityTexture = bgTexture2_2_tr2
        iconMesh_2_tr2.material = stand2_2_tr2
        iconMesh_2_tr2.position.z += 0.01
        iconMesh_2_tr2.setEnabled(false)

        let iconGroup_2_tr2 = new TransformNode('iconGroup_2_tr2')
        iconGroup_2_tr2.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_2_tr2 = bgPlane_2_tr2.createInstance(
            bgPlane_2_tr2.name + '-instance_2'
        )
        bgPlaneInstance_2_tr2.setEnabled(true)
        let iconMeshInstance_2_tr2 = iconMesh_2_tr2.createInstance(
            iconMesh_2_tr2.name + '-instance_2'
        )
        iconGroup_2_tr2.position = new Vector3(-380, 50, -60)
        iconMeshInstance_2_tr2.setEnabled(true)
        bgPlaneInstance_2_tr2.parent = iconGroup_2_tr2
        iconMeshInstance_2_tr2.parent = iconGroup_2_tr2
        iconGroup_2_tr2.parent = transFromNode_2_tr2

        ////////////////////

        let transFromNode_3_tr2 = new TransformNode('node_3_tr2')
        transFromNode_3_tr2.position.y = 3
        // GUI
        var bgPlane_3_tr2 = MeshBuilder.CreatePlane('bgPlane_3_tr2', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_3_tr2.setEnabled(false)

        let stand_3_tr2 = new StandardMaterial('bgMaterial_3_tr2')
        let bgTexture_3_tr2 = new Texture('/tree_white.png')
        stand_3_tr2.disableLighting = true
        stand_3_tr2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_3_tr2.opacityTexture = bgTexture_3_tr2
        bgPlane_3_tr2.material = stand_3_tr2

        let iconBgUrl_3_tr2 = '/tree_white.png'
        let sizeV_3_tr2 = 0.5
        var iconMesh_3_tr2 = MeshBuilder.CreatePlane('iconMesh_3_tr2', {
            width: sizeV_3_tr2 * 1.4,
            height: sizeV_3_tr2,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_3_tr2 = new StandardMaterial('iconMaterial_3_tr2')
        let bgTexture2_3_tr2 = new Texture(iconBgUrl_3_tr2)
        stand2_3_tr2.disableLighting = true
        stand2_3_tr2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_3_tr2.opacityTexture = bgTexture2_3_tr2
        iconMesh_3_tr2.material = stand2_3_tr2
        iconMesh_3_tr2.position.z += 0.01
        iconMesh_3_tr2.setEnabled(false)

        let iconGroup_3_tr2 = new TransformNode('iconGroup_3_tr2')
        iconGroup_3_tr2.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_3_tr2 = bgPlane_3_tr2.createInstance(
            bgPlane_3_tr2.name + '-instance_3'
        )
        bgPlaneInstance_3_tr2.setEnabled(true)
        let iconMeshInstance_3_tr2 = iconMesh_3_tr2.createInstance(
            iconMesh_3_tr2.name + '-instance_3'
        )
        iconGroup_3_tr2.position = new Vector3(-360, 50, 10)
        iconMeshInstance_3_tr2.setEnabled(true)
        bgPlaneInstance_3_tr2.parent = iconGroup_3_tr2
        iconMeshInstance_3_tr2.parent = iconGroup_3_tr2
        iconGroup_3_tr2.parent = transFromNode_3_tr2

        ///////////////////////////////////tree3////////////////////

        let transFromNode_tr3 = new TransformNode('node_tr3')
        transFromNode_tr3.position.y = 3
        // GUI
        var bgPlane_tr3 = MeshBuilder.CreatePlane('bgPlane_tr3', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_tr3.setEnabled(false)

        let stand_tr3 = new StandardMaterial('bgMaterial_tr3')
        let bgTexture_tr3 = new Texture('/person2white.png')
        stand_tr3.disableLighting = true
        stand_tr3.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_tr3.opacityTexture = bgTexture_tr3
        bgPlane_tr3.material = stand_tr3

        let iconBgUrl_tr3 = '/person2white.png'
        let sizeV_tr3 = 0.5
        var iconMesh_tr3 = MeshBuilder.CreatePlane('iconMesh_tr3', {
            width: sizeV_tr3 * 1.4,
            height: sizeV_tr3,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_tr3 = new StandardMaterial('iconMaterial_tr3')
        let bgTexture2_tr3 = new Texture(iconBgUrl_tr3)
        stand2_tr3.disableLighting = true
        stand2_tr3.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_tr3.opacityTexture = bgTexture2_tr3
        iconMesh_tr3.material = stand2_tr3
        iconMesh_tr3.position.z += 0.01
        iconMesh_tr3.setEnabled(false)

        let iconGroup_tr3 = new TransformNode('iconGroup_tr3')
        iconGroup_tr3.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_tr3 = bgPlane_tr3.createInstance(
            bgPlane_tr3.name + '-instance'
        )
        bgPlaneInstance_tr3.setEnabled(true)
        let iconMeshInstance_tr3 = iconMesh_tr3.createInstance(
            iconMesh_tr3.name + '-instance'
        )
        iconGroup_tr3.position = new Vector3(260, 50, -320)
        iconMeshInstance_tr3.setEnabled(true)
        bgPlaneInstance_tr3.parent = iconGroup_tr3
        iconMeshInstance_tr3.parent = iconGroup_tr3
        iconGroup_tr3.parent = transFromNode_tr3

        //////////////////////

        let transFromNode_2_tr3 = new TransformNode('node_2_tr3')
        transFromNode_2_tr3.position.y = 3
        // GUI
        var bgPlane_2_tr3 = MeshBuilder.CreatePlane('bgPlane_2_tr3', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_2_tr3.setEnabled(false)

        let stand_2_tr3 = new StandardMaterial('bgMaterial_2_tr3')
        let bgTexture_2_tr3 = new Texture('/nota1white.png')
        stand_2_tr3.disableLighting = true
        stand_2_tr3.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_2_tr3.opacityTexture = bgTexture_2_tr3
        bgPlane_2_tr3.material = stand_2_tr3

        let iconBgUrl_2_tr3 = '/nota1white.png'
        let sizeV_2_tr3 = 0.5
        var iconMesh_2_tr3 = MeshBuilder.CreatePlane('iconMesh_2_tr3', {
            width: sizeV_2_tr3 * 1.4,
            height: sizeV_2_tr3,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_2_tr3 = new StandardMaterial('iconMaterial_2_tr3')
        let bgTexture2_2_tr3 = new Texture(iconBgUrl_2_tr3)
        stand2_2_tr3.disableLighting = true
        stand2_2_tr3.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_2_tr3.opacityTexture = bgTexture2_2_tr3
        iconMesh_2_tr3.material = stand2_2_tr3
        iconMesh_2_tr3.position.z += 0.01
        iconMesh_2_tr3.setEnabled(false)

        let iconGroup_2_tr3 = new TransformNode('iconGroup_2_tr3')
        iconGroup_2_tr3.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_2_tr3 = bgPlane_2_tr3.createInstance(
            bgPlane_2_tr3.name + '-instance_2'
        )
        bgPlaneInstance_2_tr3.setEnabled(true)
        let iconMeshInstance_2_tr3 = iconMesh_2_tr3.createInstance(
            iconMesh_2_tr3.name + '-instance_2'
        )
        iconGroup_2_tr3.position = new Vector3(280, 50, -380)
        iconMeshInstance_2_tr3.setEnabled(true)
        bgPlaneInstance_2_tr3.parent = iconGroup_2_tr3
        iconMeshInstance_2_tr3.parent = iconGroup_2_tr3
        iconGroup_2_tr3.parent = transFromNode_2_tr3
        ////////////////////

        let transFromNode_3_tr3 = new TransformNode('node_3_tr3')
        transFromNode_3_tr3.position.y = 3
        // GUI
        var bgPlane_3_tr3 = MeshBuilder.CreatePlane('bgPlane_3_tr3', {
            size: 25,
            sideOrientation: Mesh.DOUBLESIDE,
        })
        bgPlane_3_tr3.setEnabled(false)
        setProgress(30)

        let stand_3_tr3 = new StandardMaterial('bgMaterial_3_tr3')
        let bgTexture_3_tr3 = new Texture('/tree_white.png')
        stand_3_tr3.disableLighting = true
        stand_3_tr3.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand_3_tr3.opacityTexture = bgTexture_3_tr3
        bgPlane_3_tr3.material = stand_3_tr3

        let iconBgUrl_3_tr3 = '/tree_white.png'
        let sizeV_3_tr3 = 0.5
        var iconMesh_3_tr3 = MeshBuilder.CreatePlane('iconMesh_3_tr3', {
            width: sizeV_3_tr3 * 1.4,
            height: sizeV_3_tr3,
            sideOrientation: Mesh.DOUBLESIDE,
        })

        let stand2_3_tr3 = new StandardMaterial('iconMaterial_3_tr3')
        let bgTexture2_3_tr3 = new Texture(iconBgUrl_3_tr3)
        stand2_3_tr3.disableLighting = true
        stand2_3_tr3.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'))
        stand2_3_tr3.opacityTexture = bgTexture2_3_tr3
        iconMesh_3_tr3.material = stand2_3_tr3
        iconMesh_3_tr3.position.z += 0.01
        iconMesh_3_tr3.setEnabled(false)

        let iconGroup_3_tr3 = new TransformNode('iconGroup_3_tr3')
        iconGroup_3_tr3.billboardMode = Mesh.BILLBOARDMODE_ALL
        let bgPlaneInstance_3_tr3 = bgPlane_3_tr3.createInstance(
            bgPlane_3_tr3.name + '-instance_3'
        )
        bgPlaneInstance_3_tr3.setEnabled(true)
        let iconMeshInstance_3_tr3 = iconMesh_3_tr3.createInstance(
            iconMesh_3_tr3.name + '-instance_3'
        )
        iconGroup_3_tr3.position = new Vector3(320, 50, -310)
        iconMeshInstance_3_tr3.setEnabled(true)
        bgPlaneInstance_3_tr3.parent = iconGroup_3_tr3
        iconMeshInstance_3_tr3.parent = iconGroup_3_tr3
        iconGroup_3_tr3.parent = transFromNode_3_tr3

        SceneLoader.ImportMeshAsync(
            '',
            '/',
            './main_trees/M_Tree_1.obj',
            scene
        ).then(({ meshes }) => {
            setProgress(45)
            const treeModel = meshes[0]
            treeModel.scaling = new Vector3(0.04, 0.04, 0.04)
            treeModel.position = new Vector3(0, 0, 0)

            var nodeMaterial = new NodeMaterial('node')
            nodeMaterial.mode = NodeMaterialModes.Material

            // InputBlock
            var position = new InputBlock('position')
            position.visibleInInspector = false
            position.visibleOnFrame = false
            position.target = 1
            position.setAsAttribute('position')

            // TransformBlock
            var WorldPos = new TransformBlock('WorldPos')
            WorldPos.visibleInInspector = false
            WorldPos.visibleOnFrame = false
            WorldPos.target = 1
            WorldPos.complementZ = 0
            WorldPos.complementW = 1

            // InputBlock
            var World = new InputBlock('World')
            World.visibleInInspector = false
            World.visibleOnFrame = false
            World.target = 1
            World.setAsSystemValue(NodeMaterialSystemValues.World)

            // TransformBlock
            var WorldnormalN = new TransformBlock('World normal (N)')
            WorldnormalN.visibleInInspector = false
            WorldnormalN.visibleOnFrame = false
            WorldnormalN.target = 1
            WorldnormalN.complementZ = 0
            WorldnormalN.complementW = 0

            // InputBlock
            var normal = new InputBlock('normal')
            normal.visibleInInspector = false
            normal.visibleOnFrame = false
            normal.target = 1
            normal.setAsAttribute('normal')

            // VectorSplitterBlock
            var N = new VectorSplitterBlock('N')
            N.visibleInInspector = false
            N.visibleOnFrame = false
            N.target = 4

            // NormalizeBlock
            var NNormalized = new NormalizeBlock('N (Normalized)')
            NNormalized.visibleInInspector = false
            NNormalized.visibleOnFrame = false
            NNormalized.target = 4

            // DotBlock
            var NDotL = new DotBlock('N Dot L')
            NDotL.visibleInInspector = false
            NDotL.visibleOnFrame = false
            NDotL.target = 4

            // NormalizeBlock
            var LNormalized = new NormalizeBlock('L (Normalized)')
            LNormalized.visibleInInspector = false
            LNormalized.visibleOnFrame = false
            LNormalized.target = 4

            // LightInformationBlock
            var Lightinformationlight = new LightInformationBlock(
                'Light information (light)'
            )
            Lightinformationlight.visibleInInspector = false
            Lightinformationlight.visibleOnFrame = false
            Lightinformationlight.target = 1

            // AddBlock
            var H = new AddBlock('H')
            H.visibleInInspector = false
            H.visibleOnFrame = false
            H.target = 4

            // NormalizeBlock
            var Vnormalized = new NormalizeBlock('V (normalized)')
            Vnormalized.visibleInInspector = false
            Vnormalized.visibleOnFrame = false
            Vnormalized.target = 4

            // ViewDirectionBlock
            var Viewdirection = new ViewDirectionBlock('View direction')
            Viewdirection.visibleInInspector = false
            Viewdirection.visibleOnFrame = false
            Viewdirection.target = 4

            // InputBlock
            var cameraPosition = new InputBlock('cameraPosition')
            cameraPosition.visibleInInspector = false
            cameraPosition.visibleOnFrame = false
            cameraPosition.target = 1
            cameraPosition.setAsSystemValue(
                NodeMaterialSystemValues.CameraPosition
            )

            // DotBlock
            var NDotV = new DotBlock('N Dot V')
            NDotV.visibleInInspector = false
            NDotV.visibleOnFrame = false
            NDotV.target = 4

            // OneMinusBlock
            var NDotV1 = new OneMinusBlock('1 - N Dot V')
            NDotV1.visibleInInspector = false
            NDotV1.visibleOnFrame = false
            NDotV1.target = 4

            // MultiplyBlock
            var RimIntensity = new MultiplyBlock('Rim Intensity')
            RimIntensity.visibleInInspector = false
            RimIntensity.visibleOnFrame = false
            RimIntensity.target = 4

            // PowBlock
            var RimFactor = new PowBlock('Rim Factor')
            RimFactor.visibleInInspector = false
            RimFactor.visibleOnFrame = false
            RimFactor.target = 4

            // InputBlock
            var RimIntensity1 = new InputBlock('Rim Intensity ')
            RimIntensity1.visibleInInspector = false
            RimIntensity1.visibleOnFrame = false
            RimIntensity1.target = 1
            RimIntensity1.value = 0.4
            RimIntensity1.min = 0
            RimIntensity1.max = 0
            RimIntensity1.isBoolean = false
            RimIntensity1.matrixMode = 0
            RimIntensity1.animationType = AnimatedInputBlockTypes.None
            RimIntensity1.isConstant = false

            // StepBlock
            var QuantizedRimLightIntensity = new StepBlock(
                'Quantized Rim Light Intensity'
            )
            QuantizedRimLightIntensity.visibleInInspector = false
            QuantizedRimLightIntensity.visibleOnFrame = false
            QuantizedRimLightIntensity.target = 4

            // InputBlock
            var RimCutoff = new InputBlock('Rim Cutoff')
            RimCutoff.visibleInInspector = false
            RimCutoff.visibleOnFrame = false
            RimCutoff.target = 1
            RimCutoff.value = 0.6
            RimCutoff.min = 0
            RimCutoff.max = 0
            RimCutoff.isBoolean = false
            RimCutoff.matrixMode = 0
            RimCutoff.animationType = AnimatedInputBlockTypes.None
            RimCutoff.isConstant = false

            // ScaleBlock
            var Scale = new ScaleBlock('Scale')
            Scale.visibleInInspector = false
            Scale.visibleOnFrame = false
            Scale.target = 4

            // InputBlock
            var RimLightColor = new InputBlock('Rim Light Color')
            RimLightColor.visibleInInspector = false
            RimLightColor.visibleOnFrame = false
            RimLightColor.target = 1
            RimLightColor.value = new Color3(
                0.47843137254901963,
                0.4745098039215686,
                0.4745098039215686
            )
            RimLightColor.isConstant = false

            // AddBlock
            var AddRimSpecDiffAmbient = new AddBlock(
                'Add Rim + Spec + Diff + Ambient'
            )
            AddRimSpecDiffAmbient.visibleInInspector = false
            AddRimSpecDiffAmbient.visibleOnFrame = false
            AddRimSpecDiffAmbient.target = 4

            // AddBlock
            var AddSpecularAmbientDuffuse = new AddBlock(
                'Add Specular + Ambient + Duffuse'
            )
            AddSpecularAmbientDuffuse.visibleInInspector = false
            AddSpecularAmbientDuffuse.visibleOnFrame = false
            AddSpecularAmbientDuffuse.target = 4

            // AddBlock
            var AddAmbienttoDiffuse = new AddBlock('Add Ambient to Diffuse')
            AddAmbienttoDiffuse.visibleInInspector = false
            AddAmbienttoDiffuse.visibleOnFrame = false
            AddAmbienttoDiffuse.target = 4

            // InputBlock
            var AmbientLight = new InputBlock('Ambient Light')
            AmbientLight.visibleInInspector = false
            AmbientLight.visibleOnFrame = false
            AmbientLight.target = 1
            AmbientLight.value = new Color3(
                0.3176470588235294,
                0.34901960784313724,
                0.3607843137254902
            )
            AmbientLight.isConstant = false

            // ScaleBlock
            var DiffuzeLightCalculation = new ScaleBlock(
                'Diffuze Light Calculation'
            )
            DiffuzeLightCalculation.visibleInInspector = false
            DiffuzeLightCalculation.visibleOnFrame = false
            DiffuzeLightCalculation.target = 4

            // InputBlock
            var Color = new InputBlock('Color3')
            Color.visibleInInspector = false
            Color.visibleOnFrame = false
            Color.target = 1
            Color.value = new Color3(
                0.2235294117647059,
                0.22745098039215686,
                0.23921568627450981
            )
            Color.isConstant = false

            // StepBlock
            var QuantizedDuffizeLighting = new StepBlock(
                'Quantized Duffize Lighting'
            )
            QuantizedDuffizeLighting.visibleInInspector = false
            QuantizedDuffizeLighting.visibleOnFrame = false
            QuantizedDuffizeLighting.target = 4

            // InputBlock
            var Diffusecutoff = new InputBlock('Diffuse cutoff')
            Diffusecutoff.visibleInInspector = false
            Diffusecutoff.visibleOnFrame = false
            Diffusecutoff.target = 1
            Diffusecutoff.value = 0
            Diffusecutoff.min = 0
            Diffusecutoff.max = 0
            Diffusecutoff.isBoolean = false
            Diffusecutoff.matrixMode = 0
            Diffusecutoff.animationType = AnimatedInputBlockTypes.None
            Diffusecutoff.isConstant = false

            // MultiplyBlock
            var SpecularFactor = new MultiplyBlock('Specular Factor')
            SpecularFactor.visibleInInspector = false
            SpecularFactor.visibleOnFrame = false
            SpecularFactor.target = 4

            // DotBlock
            var NDotH = new DotBlock('N Dot H')
            NDotH.visibleInInspector = false
            NDotH.visibleOnFrame = false
            NDotH.target = 4

            // NormalizeBlock
            var HNormalized = new NormalizeBlock('H (Normalized)')
            HNormalized.visibleInInspector = false
            HNormalized.visibleOnFrame = false
            HNormalized.target = 4

            // PowBlock
            var SpecularIntensity = new PowBlock('Specular Intensity')
            SpecularIntensity.visibleInInspector = false
            SpecularIntensity.visibleOnFrame = false
            SpecularIntensity.target = 4

            // MultiplyBlock
            var Glossiness = new MultiplyBlock('Glossiness >2')
            Glossiness.visibleInInspector = false
            Glossiness.visibleOnFrame = false
            Glossiness.target = 4

            // InputBlock
            var Glossiness1 = new InputBlock('Glossiness')
            Glossiness1.visibleInInspector = false
            Glossiness1.visibleOnFrame = false
            Glossiness1.target = 1
            Glossiness1.value = 3
            Glossiness1.min = 0
            Glossiness1.max = 0
            Glossiness1.isBoolean = false
            Glossiness1.matrixMode = 0
            Glossiness1.animationType = AnimatedInputBlockTypes.None
            Glossiness1.isConstant = false

            // StepBlock
            var QuatnizedSpecularIntesity = new StepBlock(
                'Quatnized Specular Intesity'
            )
            QuatnizedSpecularIntesity.visibleInInspector = false
            QuatnizedSpecularIntesity.visibleOnFrame = false
            QuatnizedSpecularIntesity.target = 4

            // InputBlock
            var SpecularCutoff = new InputBlock('Specular Cutoff')
            SpecularCutoff.visibleInInspector = false
            SpecularCutoff.visibleOnFrame = false
            SpecularCutoff.target = 1
            SpecularCutoff.value = 0.5
            SpecularCutoff.min = 0
            SpecularCutoff.max = 0
            SpecularCutoff.isBoolean = false
            SpecularCutoff.matrixMode = 0
            SpecularCutoff.animationType = AnimatedInputBlockTypes.None
            SpecularCutoff.isConstant = false

            // ScaleBlock
            var SpecularLightingCalculation = new ScaleBlock(
                'Specular Lighting Calculation'
            )
            SpecularLightingCalculation.visibleInInspector = false
            SpecularLightingCalculation.visibleOnFrame = false
            SpecularLightingCalculation.target = 4

            // InputBlock
            var Color1 = new InputBlock('Color3')
            Color1.visibleInInspector = false
            Color1.visibleOnFrame = false
            Color1.target = 1
            Color1.value = new Color3(
                0.15294117647058825,
                0.15294117647058825,
                0.15294117647058825
            )
            Color1.isConstant = false

            // ColorMergerBlock
            var ColorMerger = new ColorMergerBlock('ColorMerger')
            ColorMerger.visibleInInspector = false
            ColorMerger.visibleOnFrame = false
            ColorMerger.target = 4
            ColorMerger.rSwizzle = 'r'
            ColorMerger.gSwizzle = 'g'
            ColorMerger.bSwizzle = 'b'
            ColorMerger.aSwizzle = 'a'

            // MultiplyBlock
            var MultiplyLughtbySurfaceColor = new MultiplyBlock(
                'Multiply Lught by Surface Color'
            )
            MultiplyLughtbySurfaceColor.visibleInInspector = false
            MultiplyLughtbySurfaceColor.visibleOnFrame = false
            MultiplyLughtbySurfaceColor.target = 4

            // InputBlock
            var Color2 = new InputBlock('Color3')
            Color2.visibleInInspector = false
            Color2.visibleOnFrame = false
            Color2.target = 1
            Color2.value = new Color3(
                0.30196078431372547,
                0.30196078431372547,
                0.3137254901960784
            )
            Color2.isConstant = false

            // FragmentOutputBlock
            var FragmentOutput = new FragmentOutputBlock('FragmentOutput')
            FragmentOutput.visibleInInspector = false
            FragmentOutput.visibleOnFrame = false
            FragmentOutput.target = 2
            FragmentOutput.convertToGammaSpace = false
            FragmentOutput.convertToLinearSpace = false
            FragmentOutput.useLogarithmicDepth = false

            // TransformBlock
            var WorldPosViewProjectionTransform = new TransformBlock(
                'WorldPos * ViewProjectionTransform'
            )
            WorldPosViewProjectionTransform.visibleInInspector = false
            WorldPosViewProjectionTransform.visibleOnFrame = false
            WorldPosViewProjectionTransform.target = 1
            WorldPosViewProjectionTransform.complementZ = 0
            WorldPosViewProjectionTransform.complementW = 1

            // InputBlock
            var ViewProjection = new InputBlock('ViewProjection')
            ViewProjection.visibleInInspector = false
            ViewProjection.visibleOnFrame = false
            ViewProjection.target = 1
            ViewProjection.setAsSystemValue(
                NodeMaterialSystemValues.ViewProjection
            )

            // VertexOutputBlock
            var VertexOutput = new VertexOutputBlock('VertexOutput')
            VertexOutput.visibleInInspector = false
            VertexOutput.visibleOnFrame = false
            VertexOutput.target = 1

            // Connections
            position.output.connectTo(WorldPos.vector)
            World.output.connectTo(WorldPos.transform)
            WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector)
            ViewProjection.output.connectTo(
                WorldPosViewProjectionTransform.transform
            )
            WorldPosViewProjectionTransform.output.connectTo(
                VertexOutput.vector
            )
            AmbientLight.output.connectTo(AddAmbienttoDiffuse.left)
            Color.output.connectTo(DiffuzeLightCalculation.input)
            normal.output.connectTo(WorldnormalN.vector)
            World.output.connectTo(WorldnormalN.transform)
            WorldnormalN.output.connectTo(N.xyzw)
            N.xyzOut.connectTo(NNormalized.input)
            NNormalized.output.connectTo(NDotL.left)
            WorldPos.output.connectTo(Lightinformationlight.worldPosition)
            Lightinformationlight.direction.connectTo(LNormalized.input)
            LNormalized.output.connectTo(NDotL.right)
            NDotL.output.connectTo(QuantizedDuffizeLighting.value)
            Diffusecutoff.output.connectTo(QuantizedDuffizeLighting.edge)
            QuantizedDuffizeLighting.output.connectTo(
                DiffuzeLightCalculation.factor
            )
            DiffuzeLightCalculation.output.connectTo(AddAmbienttoDiffuse.right)
            AddAmbienttoDiffuse.output.connectTo(AddSpecularAmbientDuffuse.left)
            Color1.output.connectTo(SpecularLightingCalculation.input)
            NNormalized.output.connectTo(NDotH.left)
            LNormalized.output.connectTo(H.left)
            WorldPos.output.connectTo(Viewdirection.worldPosition)
            cameraPosition.output.connectTo(Viewdirection.cameraPosition)
            Viewdirection.output.connectTo(Vnormalized.input)
            Vnormalized.output.connectTo(H.right)
            H.output.connectTo(HNormalized.input)
            HNormalized.output.connectTo(NDotH.right)
            NDotH.output.connectTo(SpecularFactor.left)
            QuantizedDuffizeLighting.output.connectTo(SpecularFactor.right)
            SpecularFactor.output.connectTo(SpecularIntensity.value)
            Glossiness1.output.connectTo(Glossiness.left)
            Glossiness1.output.connectTo(Glossiness.right)
            Glossiness.output.connectTo(SpecularIntensity.power)
            SpecularIntensity.output.connectTo(QuatnizedSpecularIntesity.value)
            SpecularCutoff.output.connectTo(QuatnizedSpecularIntesity.edge)
            QuatnizedSpecularIntesity.output.connectTo(
                SpecularLightingCalculation.factor
            )
            SpecularLightingCalculation.output.connectTo(
                AddSpecularAmbientDuffuse.right
            )
            AddSpecularAmbientDuffuse.output.connectTo(
                AddRimSpecDiffAmbient.left
            )
            RimLightColor.output.connectTo(Scale.input)
            NNormalized.output.connectTo(NDotV.left)
            Vnormalized.output.connectTo(NDotV.right)
            NDotV.output.connectTo(NDotV1.input)
            NDotV1.output.connectTo(RimIntensity.left)
            NDotL.output.connectTo(RimFactor.value)
            RimIntensity1.output.connectTo(RimFactor.power)
            RimFactor.output.connectTo(RimIntensity.right)
            RimIntensity.output.connectTo(QuantizedRimLightIntensity.value)
            RimCutoff.output.connectTo(QuantizedRimLightIntensity.edge)
            QuantizedRimLightIntensity.output.connectTo(Scale.factor)
            Scale.output.connectTo(AddRimSpecDiffAmbient.right)
            AddRimSpecDiffAmbient.output.connectTo(
                MultiplyLughtbySurfaceColor.left
            )
            Color2.output.connectTo(MultiplyLughtbySurfaceColor.right)
            MultiplyLughtbySurfaceColor.output.connectTo(FragmentOutput.rgb)

            // Output nodes
            nodeMaterial.addOutputNode(VertexOutput)
            nodeMaterial.addOutputNode(FragmentOutput)
            nodeMaterial.build()

            treeModel.material = nodeMaterial
        })
        SceneLoader.ImportMeshAsync(
            '',
            '/',
            './main_trees/M_Tree_2.obj',
            scene
        ).then(({ meshes }) => {
            setProgress(60)

            const treeModel2 = meshes[0]
            treeModel2.scaling = new Vector3(0.04, 0.04, 0.04)
            treeModel2.position = new Vector3(0, 0, 0)

            var nodeMaterial = new NodeMaterial('node')
            nodeMaterial.mode = NodeMaterialModes.Material

            // InputBlock
            var position = new InputBlock('position')
            position.visibleInInspector = false
            position.visibleOnFrame = false
            position.target = 1
            position.setAsAttribute('position')

            // TransformBlock
            var WorldPos = new TransformBlock('WorldPos')
            WorldPos.visibleInInspector = false
            WorldPos.visibleOnFrame = false
            WorldPos.target = 1
            WorldPos.complementZ = 0
            WorldPos.complementW = 1

            // InputBlock
            var World = new InputBlock('World')
            World.visibleInInspector = false
            World.visibleOnFrame = false
            World.target = 1
            World.setAsSystemValue(NodeMaterialSystemValues.World)

            // TransformBlock
            var WorldnormalN = new TransformBlock('World normal (N)')
            WorldnormalN.visibleInInspector = false
            WorldnormalN.visibleOnFrame = false
            WorldnormalN.target = 1
            WorldnormalN.complementZ = 0
            WorldnormalN.complementW = 0

            // InputBlock
            var normal = new InputBlock('normal')
            normal.visibleInInspector = false
            normal.visibleOnFrame = false
            normal.target = 1
            normal.setAsAttribute('normal')

            // VectorSplitterBlock
            var N = new VectorSplitterBlock('N')
            N.visibleInInspector = false
            N.visibleOnFrame = false
            N.target = 4

            // NormalizeBlock
            var NNormalized = new NormalizeBlock('N (Normalized)')
            NNormalized.visibleInInspector = false
            NNormalized.visibleOnFrame = false
            NNormalized.target = 4

            // DotBlock
            var NDotL = new DotBlock('N Dot L')
            NDotL.visibleInInspector = false
            NDotL.visibleOnFrame = false
            NDotL.target = 4

            // NormalizeBlock
            var LNormalized = new NormalizeBlock('L (Normalized)')
            LNormalized.visibleInInspector = false
            LNormalized.visibleOnFrame = false
            LNormalized.target = 4

            // LightInformationBlock
            var Lightinformationlight = new LightInformationBlock(
                'Light information (light)'
            )
            Lightinformationlight.visibleInInspector = false
            Lightinformationlight.visibleOnFrame = false
            Lightinformationlight.target = 1

            // AddBlock
            var H = new AddBlock('H')
            H.visibleInInspector = false
            H.visibleOnFrame = false
            H.target = 4

            // NormalizeBlock
            var Vnormalized = new NormalizeBlock('V (normalized)')
            Vnormalized.visibleInInspector = false
            Vnormalized.visibleOnFrame = false
            Vnormalized.target = 4

            // ViewDirectionBlock
            var Viewdirection = new ViewDirectionBlock('View direction')
            Viewdirection.visibleInInspector = false
            Viewdirection.visibleOnFrame = false
            Viewdirection.target = 4

            // InputBlock
            var cameraPosition = new InputBlock('cameraPosition')
            cameraPosition.visibleInInspector = false
            cameraPosition.visibleOnFrame = false
            cameraPosition.target = 1
            cameraPosition.setAsSystemValue(
                NodeMaterialSystemValues.CameraPosition
            )

            // DotBlock
            var NDotV = new DotBlock('N Dot V')
            NDotV.visibleInInspector = false
            NDotV.visibleOnFrame = false
            NDotV.target = 4

            // OneMinusBlock
            var NDotV1 = new OneMinusBlock('1 - N Dot V')
            NDotV1.visibleInInspector = false
            NDotV1.visibleOnFrame = false
            NDotV1.target = 4

            // MultiplyBlock
            var RimIntensity = new MultiplyBlock('Rim Intensity')
            RimIntensity.visibleInInspector = false
            RimIntensity.visibleOnFrame = false
            RimIntensity.target = 4

            // PowBlock
            var RimFactor = new PowBlock('Rim Factor')
            RimFactor.visibleInInspector = false
            RimFactor.visibleOnFrame = false
            RimFactor.target = 4
            // InputBlock
            var RimIntensity1 = new InputBlock('Rim Intensity ')
            RimIntensity1.visibleInInspector = false
            RimIntensity1.visibleOnFrame = false
            RimIntensity1.target = 1
            RimIntensity1.value = 0.4
            RimIntensity1.min = 0
            RimIntensity1.max = 0
            RimIntensity1.isBoolean = false
            RimIntensity1.matrixMode = 0
            RimIntensity1.animationType = AnimatedInputBlockTypes.None
            RimIntensity1.isConstant = false

            // StepBlock
            var QuantizedRimLightIntensity = new StepBlock(
                'Quantized Rim Light Intensity'
            )
            QuantizedRimLightIntensity.visibleInInspector = false
            QuantizedRimLightIntensity.visibleOnFrame = false
            QuantizedRimLightIntensity.target = 4

            // InputBlock
            var RimCutoff = new InputBlock('Rim Cutoff')
            RimCutoff.visibleInInspector = false
            RimCutoff.visibleOnFrame = false
            RimCutoff.target = 1
            RimCutoff.value = 0.6
            RimCutoff.min = 0
            RimCutoff.max = 0
            RimCutoff.isBoolean = false
            RimCutoff.matrixMode = 0
            RimCutoff.animationType = AnimatedInputBlockTypes.None
            RimCutoff.isConstant = false

            // ScaleBlock
            var Scale = new ScaleBlock('Scale')
            Scale.visibleInInspector = false
            Scale.visibleOnFrame = false
            Scale.target = 4

            // InputBlock
            var RimLightColor = new InputBlock('Rim Light Color')
            RimLightColor.visibleInInspector = false
            RimLightColor.visibleOnFrame = false
            RimLightColor.target = 1
            RimLightColor.value = new Color3(
                0.47843137254901963,
                0.4745098039215686,
                0.4745098039215686
            )
            RimLightColor.isConstant = false

            // AddBlock
            var AddRimSpecDiffAmbient = new AddBlock(
                'Add Rim + Spec + Diff + Ambient'
            )
            AddRimSpecDiffAmbient.visibleInInspector = false
            AddRimSpecDiffAmbient.visibleOnFrame = false
            AddRimSpecDiffAmbient.target = 4

            // AddBlock
            var AddSpecularAmbientDuffuse = new AddBlock(
                'Add Specular + Ambient + Duffuse'
            )
            AddSpecularAmbientDuffuse.visibleInInspector = false
            AddSpecularAmbientDuffuse.visibleOnFrame = false
            AddSpecularAmbientDuffuse.target = 4

            // AddBlock
            var AddAmbienttoDiffuse = new AddBlock('Add Ambient to Diffuse')
            AddAmbienttoDiffuse.visibleInInspector = false
            AddAmbienttoDiffuse.visibleOnFrame = false
            AddAmbienttoDiffuse.target = 4

            // InputBlock
            var AmbientLight = new InputBlock('Ambient Light')
            AmbientLight.visibleInInspector = false
            AmbientLight.visibleOnFrame = false
            AmbientLight.target = 1
            AmbientLight.value = new Color3(
                0.3176470588235294,
                0.34901960784313724,
                0.3607843137254902
            )
            AmbientLight.isConstant = false

            // ScaleBlock
            var DiffuzeLightCalculation = new ScaleBlock(
                'Diffuze Light Calculation'
            )
            DiffuzeLightCalculation.visibleInInspector = false
            DiffuzeLightCalculation.visibleOnFrame = false
            DiffuzeLightCalculation.target = 4

            // InputBlock
            var Color = new InputBlock('Color3')
            Color.visibleInInspector = false
            Color.visibleOnFrame = false
            Color.target = 1
            Color.value = new Color3(
                0.2235294117647059,
                0.22745098039215686,
                0.23921568627450981
            )
            Color.isConstant = false

            // StepBlock
            var QuantizedDuffizeLighting = new StepBlock(
                'Quantized Duffize Lighting'
            )
            QuantizedDuffizeLighting.visibleInInspector = false
            QuantizedDuffizeLighting.visibleOnFrame = false
            QuantizedDuffizeLighting.target = 4

            // InputBlock
            var Diffusecutoff = new InputBlock('Diffuse cutoff')
            Diffusecutoff.visibleInInspector = false
            Diffusecutoff.visibleOnFrame = false
            Diffusecutoff.target = 1
            Diffusecutoff.value = 0
            Diffusecutoff.min = 0
            Diffusecutoff.max = 0
            Diffusecutoff.isBoolean = false
            Diffusecutoff.matrixMode = 0
            Diffusecutoff.animationType = AnimatedInputBlockTypes.None
            Diffusecutoff.isConstant = false

            // MultiplyBlock
            var SpecularFactor = new MultiplyBlock('Specular Factor')
            SpecularFactor.visibleInInspector = false
            SpecularFactor.visibleOnFrame = false
            SpecularFactor.target = 4

            // DotBlock
            var NDotH = new DotBlock('N Dot H')
            NDotH.visibleInInspector = false
            NDotH.visibleOnFrame = false
            NDotH.target = 4

            // NormalizeBlock
            var HNormalized = new NormalizeBlock('H (Normalized)')
            HNormalized.visibleInInspector = false
            HNormalized.visibleOnFrame = false
            HNormalized.target = 4

            // PowBlock
            var SpecularIntensity = new PowBlock('Specular Intensity')
            SpecularIntensity.visibleInInspector = false
            SpecularIntensity.visibleOnFrame = false
            SpecularIntensity.target = 4

            // MultiplyBlock
            var Glossiness = new MultiplyBlock('Glossiness >2')
            Glossiness.visibleInInspector = false
            Glossiness.visibleOnFrame = false
            Glossiness.target = 4

            // InputBlock
            var Glossiness1 = new InputBlock('Glossiness')
            Glossiness1.visibleInInspector = false
            Glossiness1.visibleOnFrame = false
            Glossiness1.target = 1
            Glossiness1.value = 3
            Glossiness1.min = 0
            Glossiness1.max = 0
            Glossiness1.isBoolean = false
            Glossiness1.matrixMode = 0
            Glossiness1.animationType = AnimatedInputBlockTypes.None
            Glossiness1.isConstant = false

            // StepBlock
            var QuatnizedSpecularIntesity = new StepBlock(
                'Quatnized Specular Intesity'
            )
            QuatnizedSpecularIntesity.visibleInInspector = false
            QuatnizedSpecularIntesity.visibleOnFrame = false
            QuatnizedSpecularIntesity.target = 4

            // InputBlock
            var SpecularCutoff = new InputBlock('Specular Cutoff')
            SpecularCutoff.visibleInInspector = false
            SpecularCutoff.visibleOnFrame = false
            SpecularCutoff.target = 1
            SpecularCutoff.value = 0.5
            SpecularCutoff.min = 0
            SpecularCutoff.max = 0
            SpecularCutoff.isBoolean = false
            SpecularCutoff.matrixMode = 0
            SpecularCutoff.animationType = AnimatedInputBlockTypes.None
            SpecularCutoff.isConstant = false

            // ScaleBlock
            var SpecularLightingCalculation = new ScaleBlock(
                'Specular Lighting Calculation'
            )
            SpecularLightingCalculation.visibleInInspector = false
            SpecularLightingCalculation.visibleOnFrame = false
            SpecularLightingCalculation.target = 4

            // InputBlock
            var Color1 = new InputBlock('Color3')
            Color1.visibleInInspector = false
            Color1.visibleOnFrame = false
            Color1.target = 1
            Color1.value = new Color3(
                0.15294117647058825,
                0.15294117647058825,
                0.15294117647058825
            )
            Color1.isConstant = false

            // ColorMergerBlock
            var ColorMerger = new ColorMergerBlock('ColorMerger')
            ColorMerger.visibleInInspector = false
            ColorMerger.visibleOnFrame = false
            ColorMerger.target = 4
            ColorMerger.rSwizzle = 'r'
            ColorMerger.gSwizzle = 'g'
            ColorMerger.bSwizzle = 'b'
            ColorMerger.aSwizzle = 'a'

            // MultiplyBlock
            var MultiplyLughtbySurfaceColor = new MultiplyBlock(
                'Multiply Lught by Surface Color'
            )
            MultiplyLughtbySurfaceColor.visibleInInspector = false
            MultiplyLughtbySurfaceColor.visibleOnFrame = false
            MultiplyLughtbySurfaceColor.target = 4

            // InputBlock
            var Color2 = new InputBlock('Color3')
            Color2.visibleInInspector = false
            Color2.visibleOnFrame = false
            Color2.target = 1
            Color2.value = new Color3(
                0.30196078431372547,
                0.30196078431372547,
                0.3137254901960784
            )
            Color2.isConstant = false

            // FragmentOutputBlock
            var FragmentOutput = new FragmentOutputBlock('FragmentOutput')
            FragmentOutput.visibleInInspector = false
            FragmentOutput.visibleOnFrame = false
            FragmentOutput.target = 2
            FragmentOutput.convertToGammaSpace = false
            FragmentOutput.convertToLinearSpace = false
            FragmentOutput.useLogarithmicDepth = false

            // TransformBlock
            var WorldPosViewProjectionTransform = new TransformBlock(
                'WorldPos * ViewProjectionTransform'
            )
            WorldPosViewProjectionTransform.visibleInInspector = false
            WorldPosViewProjectionTransform.visibleOnFrame = false
            WorldPosViewProjectionTransform.target = 1
            WorldPosViewProjectionTransform.complementZ = 0
            WorldPosViewProjectionTransform.complementW = 1

            // InputBlock
            var ViewProjection = new InputBlock('ViewProjection')
            ViewProjection.visibleInInspector = false
            ViewProjection.visibleOnFrame = false
            ViewProjection.target = 1
            ViewProjection.setAsSystemValue(
                NodeMaterialSystemValues.ViewProjection
            )

            // VertexOutputBlock
            var VertexOutput = new VertexOutputBlock('VertexOutput')
            VertexOutput.visibleInInspector = false
            VertexOutput.visibleOnFrame = false
            VertexOutput.target = 1

            // Connections
            position.output.connectTo(WorldPos.vector)
            World.output.connectTo(WorldPos.transform)
            WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector)
            ViewProjection.output.connectTo(
                WorldPosViewProjectionTransform.transform
            )
            WorldPosViewProjectionTransform.output.connectTo(
                VertexOutput.vector
            )
            AmbientLight.output.connectTo(AddAmbienttoDiffuse.left)
            Color.output.connectTo(DiffuzeLightCalculation.input)
            normal.output.connectTo(WorldnormalN.vector)
            World.output.connectTo(WorldnormalN.transform)
            WorldnormalN.output.connectTo(N.xyzw)
            N.xyzOut.connectTo(NNormalized.input)
            NNormalized.output.connectTo(NDotL.left)
            WorldPos.output.connectTo(Lightinformationlight.worldPosition)
            Lightinformationlight.direction.connectTo(LNormalized.input)
            LNormalized.output.connectTo(NDotL.right)
            NDotL.output.connectTo(QuantizedDuffizeLighting.value)
            Diffusecutoff.output.connectTo(QuantizedDuffizeLighting.edge)
            QuantizedDuffizeLighting.output.connectTo(
                DiffuzeLightCalculation.factor
            )
            DiffuzeLightCalculation.output.connectTo(AddAmbienttoDiffuse.right)
            AddAmbienttoDiffuse.output.connectTo(AddSpecularAmbientDuffuse.left)
            Color1.output.connectTo(SpecularLightingCalculation.input)
            NNormalized.output.connectTo(NDotH.left)
            LNormalized.output.connectTo(H.left)
            WorldPos.output.connectTo(Viewdirection.worldPosition)
            cameraPosition.output.connectTo(Viewdirection.cameraPosition)
            Viewdirection.output.connectTo(Vnormalized.input)
            Vnormalized.output.connectTo(H.right)
            H.output.connectTo(HNormalized.input)
            HNormalized.output.connectTo(NDotH.right)
            NDotH.output.connectTo(SpecularFactor.left)
            QuantizedDuffizeLighting.output.connectTo(SpecularFactor.right)
            SpecularFactor.output.connectTo(SpecularIntensity.value)
            Glossiness1.output.connectTo(Glossiness.left)
            Glossiness1.output.connectTo(Glossiness.right)
            Glossiness.output.connectTo(SpecularIntensity.power)
            SpecularIntensity.output.connectTo(QuatnizedSpecularIntesity.value)
            SpecularCutoff.output.connectTo(QuatnizedSpecularIntesity.edge)
            QuatnizedSpecularIntesity.output.connectTo(
                SpecularLightingCalculation.factor
            )
            SpecularLightingCalculation.output.connectTo(
                AddSpecularAmbientDuffuse.right
            )
            AddSpecularAmbientDuffuse.output.connectTo(
                AddRimSpecDiffAmbient.left
            )
            RimLightColor.output.connectTo(Scale.input)
            NNormalized.output.connectTo(NDotV.left)
            Vnormalized.output.connectTo(NDotV.right)
            NDotV.output.connectTo(NDotV1.input)
            NDotV1.output.connectTo(RimIntensity.left)
            NDotL.output.connectTo(RimFactor.value)
            RimIntensity1.output.connectTo(RimFactor.power)
            RimFactor.output.connectTo(RimIntensity.right)
            RimIntensity.output.connectTo(QuantizedRimLightIntensity.value)
            RimCutoff.output.connectTo(QuantizedRimLightIntensity.edge)
            QuantizedRimLightIntensity.output.connectTo(Scale.factor)
            Scale.output.connectTo(AddRimSpecDiffAmbient.right)
            AddRimSpecDiffAmbient.output.connectTo(
                MultiplyLughtbySurfaceColor.left
            )
            Color2.output.connectTo(MultiplyLughtbySurfaceColor.right)
            MultiplyLughtbySurfaceColor.output.connectTo(FragmentOutput.rgb)

            // Output nodes
            nodeMaterial.addOutputNode(VertexOutput)
            nodeMaterial.addOutputNode(FragmentOutput)
            nodeMaterial.build()

            treeModel2.material = nodeMaterial
        })

        SceneLoader.ImportMeshAsync(
            '',
            '/',
            './main_trees/M_Tree_3.obj',
            scene
        ).then(({ meshes }) => {
            setProgress(80)

            const treeModel3 = meshes[0]
            treeModel3.scaling = new Vector3(0.04, 0.04, 0.04)
            treeModel3.position = new Vector3(200, 0, -200)

            var nodeMaterial = new NodeMaterial('node')
            nodeMaterial.mode = NodeMaterialModes.Material

            // InputBlock
            var position = new InputBlock('position')
            position.visibleInInspector = false
            position.visibleOnFrame = false
            position.target = 1
            position.setAsAttribute('position')

            // TransformBlock
            var WorldPos = new TransformBlock('WorldPos')
            WorldPos.visibleInInspector = false
            WorldPos.visibleOnFrame = false
            WorldPos.target = 1
            WorldPos.complementZ = 0
            WorldPos.complementW = 1

            // InputBlock
            var World = new InputBlock('World')
            World.visibleInInspector = false
            World.visibleOnFrame = false
            World.target = 1
            World.setAsSystemValue(NodeMaterialSystemValues.World)

            // TransformBlock
            var WorldnormalN = new TransformBlock('World normal (N)')
            WorldnormalN.visibleInInspector = false
            WorldnormalN.visibleOnFrame = false
            WorldnormalN.target = 1
            WorldnormalN.complementZ = 0
            WorldnormalN.complementW = 0

            // InputBlock
            var normal = new InputBlock('normal')
            normal.visibleInInspector = false
            normal.visibleOnFrame = false
            normal.target = 1
            normal.setAsAttribute('normal')

            // VectorSplitterBlock
            var N = new VectorSplitterBlock('N')
            N.visibleInInspector = false
            N.visibleOnFrame = false
            N.target = 4

            // NormalizeBlock
            var NNormalized = new NormalizeBlock('N (Normalized)')
            NNormalized.visibleInInspector = false
            NNormalized.visibleOnFrame = false
            NNormalized.target = 4

            // DotBlock
            var NDotL = new DotBlock('N Dot L')
            NDotL.visibleInInspector = false
            NDotL.visibleOnFrame = false
            NDotL.target = 4

            // NormalizeBlock
            var LNormalized = new NormalizeBlock('L (Normalized)')
            LNormalized.visibleInInspector = false
            LNormalized.visibleOnFrame = false
            LNormalized.target = 4

            // LightInformationBlock
            var Lightinformationlight = new LightInformationBlock(
                'Light information (light)'
            )
            Lightinformationlight.visibleInInspector = false
            Lightinformationlight.visibleOnFrame = false
            Lightinformationlight.target = 1

            // AddBlock
            var H = new AddBlock('H')
            H.visibleInInspector = false
            H.visibleOnFrame = false
            H.target = 4

            // NormalizeBlock
            var Vnormalized = new NormalizeBlock('V (normalized)')
            Vnormalized.visibleInInspector = false
            Vnormalized.visibleOnFrame = false
            Vnormalized.target = 4

            // ViewDirectionBlock
            var Viewdirection = new ViewDirectionBlock('View direction')
            Viewdirection.visibleInInspector = false
            Viewdirection.visibleOnFrame = false
            Viewdirection.target = 4

            // InputBlock
            var cameraPosition = new InputBlock('cameraPosition')
            cameraPosition.visibleInInspector = false
            cameraPosition.visibleOnFrame = false
            cameraPosition.target = 1
            cameraPosition.setAsSystemValue(
                NodeMaterialSystemValues.CameraPosition
            )

            // DotBlock
            var NDotV = new DotBlock('N Dot V')
            NDotV.visibleInInspector = false
            NDotV.visibleOnFrame = false
            NDotV.target = 4

            // OneMinusBlock
            var NDotV1 = new OneMinusBlock('1 - N Dot V')
            NDotV1.visibleInInspector = false
            NDotV1.visibleOnFrame = false
            NDotV1.target = 4

            // MultiplyBlock
            var RimIntensity = new MultiplyBlock('Rim Intensity')
            RimIntensity.visibleInInspector = false
            RimIntensity.visibleOnFrame = false
            RimIntensity.target = 4

            // PowBlock
            var RimFactor = new PowBlock('Rim Factor')
            RimFactor.visibleInInspector = false
            RimFactor.visibleOnFrame = false
            RimFactor.target = 4

            // InputBlock
            var RimIntensity1 = new InputBlock('Rim Intensity ')
            RimIntensity1.visibleInInspector = false
            RimIntensity1.visibleOnFrame = false
            RimIntensity1.target = 1
            RimIntensity1.value = 0.4
            RimIntensity1.min = 0
            RimIntensity1.max = 0
            RimIntensity1.isBoolean = false
            RimIntensity1.matrixMode = 0
            RimIntensity1.animationType = AnimatedInputBlockTypes.None
            RimIntensity1.isConstant = false

            // StepBlock
            var QuantizedRimLightIntensity = new StepBlock(
                'Quantized Rim Light Intensity'
            )
            QuantizedRimLightIntensity.visibleInInspector = false
            QuantizedRimLightIntensity.visibleOnFrame = false
            QuantizedRimLightIntensity.target = 4

            // InputBlock
            var RimCutoff = new InputBlock('Rim Cutoff')
            RimCutoff.visibleInInspector = false
            RimCutoff.visibleOnFrame = false
            RimCutoff.target = 1
            RimCutoff.value = 0.6
            RimCutoff.min = 0
            RimCutoff.max = 0
            RimCutoff.isBoolean = false
            RimCutoff.matrixMode = 0
            RimCutoff.animationType = AnimatedInputBlockTypes.None
            RimCutoff.isConstant = false

            // ScaleBlock
            var Scale = new ScaleBlock('Scale')
            Scale.visibleInInspector = false
            Scale.visibleOnFrame = false
            Scale.target = 4

            // InputBlock
            var RimLightColor = new InputBlock('Rim Light Color')
            RimLightColor.visibleInInspector = false
            RimLightColor.visibleOnFrame = false
            RimLightColor.target = 1
            RimLightColor.value = new Color3(
                0.47843137254901963,
                0.4745098039215686,
                0.4745098039215686
            )
            RimLightColor.isConstant = false

            // AddBlock
            var AddRimSpecDiffAmbient = new AddBlock(
                'Add Rim + Spec + Diff + Ambient'
            )
            AddRimSpecDiffAmbient.visibleInInspector = false
            AddRimSpecDiffAmbient.visibleOnFrame = false
            AddRimSpecDiffAmbient.target = 4

            // AddBlock
            var AddSpecularAmbientDuffuse = new AddBlock(
                'Add Specular + Ambient + Duffuse'
            )
            AddSpecularAmbientDuffuse.visibleInInspector = false
            AddSpecularAmbientDuffuse.visibleOnFrame = false
            AddSpecularAmbientDuffuse.target = 4

            // AddBlock
            var AddAmbienttoDiffuse = new AddBlock('Add Ambient to Diffuse')
            AddAmbienttoDiffuse.visibleInInspector = false
            AddAmbienttoDiffuse.visibleOnFrame = false
            AddAmbienttoDiffuse.target = 4

            // InputBlock
            var AmbientLight = new InputBlock('Ambient Light')
            AmbientLight.visibleInInspector = false
            AmbientLight.visibleOnFrame = false
            AmbientLight.target = 1
            AmbientLight.value = new Color3(
                0.3176470588235294,
                0.34901960784313724,
                0.3607843137254902
            )
            AmbientLight.isConstant = false

            // ScaleBlock
            var DiffuzeLightCalculation = new ScaleBlock(
                'Diffuze Light Calculation'
            )
            DiffuzeLightCalculation.visibleInInspector = false
            DiffuzeLightCalculation.visibleOnFrame = false
            DiffuzeLightCalculation.target = 4

            // InputBlock
            var Color = new InputBlock('Color3')
            Color.visibleInInspector = false
            Color.visibleOnFrame = false
            Color.target = 1
            Color.value = new Color3(
                0.2235294117647059,
                0.22745098039215686,
                0.23921568627450981
            )
            Color.isConstant = false

            // StepBlock
            var QuantizedDuffizeLighting = new StepBlock(
                'Quantized Duffize Lighting'
            )
            QuantizedDuffizeLighting.visibleInInspector = false
            QuantizedDuffizeLighting.visibleOnFrame = false
            QuantizedDuffizeLighting.target = 4

            // InputBlock
            var Diffusecutoff = new InputBlock('Diffuse cutoff')
            Diffusecutoff.visibleInInspector = false
            Diffusecutoff.visibleOnFrame = false
            Diffusecutoff.target = 1
            Diffusecutoff.value = 0
            Diffusecutoff.min = 0
            Diffusecutoff.max = 0
            Diffusecutoff.isBoolean = false
            Diffusecutoff.matrixMode = 0
            Diffusecutoff.animationType = AnimatedInputBlockTypes.None
            Diffusecutoff.isConstant = false

            // MultiplyBlock
            var SpecularFactor = new MultiplyBlock('Specular Factor')
            SpecularFactor.visibleInInspector = false
            SpecularFactor.visibleOnFrame = false
            SpecularFactor.target = 4

            // DotBlock
            var NDotH = new DotBlock('N Dot H')
            NDotH.visibleInInspector = false
            NDotH.visibleOnFrame = false
            NDotH.target = 4

            // NormalizeBlock
            var HNormalized = new NormalizeBlock('H (Normalized)')
            HNormalized.visibleInInspector = false
            HNormalized.visibleOnFrame = false
            HNormalized.target = 4

            // PowBlock
            var SpecularIntensity = new PowBlock('Specular Intensity')
            SpecularIntensity.visibleInInspector = false
            SpecularIntensity.visibleOnFrame = false
            SpecularIntensity.target = 4

            // MultiplyBlock
            var Glossiness = new MultiplyBlock('Glossiness >2')
            Glossiness.visibleInInspector = false
            Glossiness.visibleOnFrame = false
            Glossiness.target = 4

            // InputBlock
            var Glossiness1 = new InputBlock('Glossiness')
            Glossiness1.visibleInInspector = false
            Glossiness1.visibleOnFrame = false
            Glossiness1.target = 1
            Glossiness1.value = 3
            Glossiness1.min = 0
            Glossiness1.max = 0
            Glossiness1.isBoolean = false
            Glossiness1.matrixMode = 0
            Glossiness1.animationType = AnimatedInputBlockTypes.None
            Glossiness1.isConstant = false

            // StepBlock
            var QuatnizedSpecularIntesity = new StepBlock(
                'Quatnized Specular Intesity'
            )
            QuatnizedSpecularIntesity.visibleInInspector = false
            QuatnizedSpecularIntesity.visibleOnFrame = false
            QuatnizedSpecularIntesity.target = 4

            // InputBlock
            var SpecularCutoff = new InputBlock('Specular Cutoff')
            SpecularCutoff.visibleInInspector = false
            SpecularCutoff.visibleOnFrame = false
            SpecularCutoff.target = 1
            SpecularCutoff.value = 0.5
            SpecularCutoff.min = 0
            SpecularCutoff.max = 0
            SpecularCutoff.isBoolean = false
            SpecularCutoff.matrixMode = 0
            SpecularCutoff.animationType = AnimatedInputBlockTypes.None
            SpecularCutoff.isConstant = false

            // ScaleBlock
            var SpecularLightingCalculation = new ScaleBlock(
                'Specular Lighting Calculation'
            )
            SpecularLightingCalculation.visibleInInspector = false
            SpecularLightingCalculation.visibleOnFrame = false
            SpecularLightingCalculation.target = 4

            // InputBlock
            var Color1 = new InputBlock('Color3')
            Color1.visibleInInspector = false
            Color1.visibleOnFrame = false
            Color1.target = 1
            Color1.value = new Color3(
                0.15294117647058825,
                0.15294117647058825,
                0.15294117647058825
            )
            Color1.isConstant = false

            // ColorMergerBlock
            var ColorMerger = new ColorMergerBlock('ColorMerger')
            ColorMerger.visibleInInspector = false
            ColorMerger.visibleOnFrame = false
            ColorMerger.target = 4
            ColorMerger.rSwizzle = 'r'
            ColorMerger.gSwizzle = 'g'
            ColorMerger.bSwizzle = 'b'
            ColorMerger.aSwizzle = 'a'

            // MultiplyBlock
            var MultiplyLughtbySurfaceColor = new MultiplyBlock(
                'Multiply Lught by Surface Color'
            )
            MultiplyLughtbySurfaceColor.visibleInInspector = false
            MultiplyLughtbySurfaceColor.visibleOnFrame = false
            MultiplyLughtbySurfaceColor.target = 4

            // InputBlock
            var Color2 = new InputBlock('Color3')
            Color2.visibleInInspector = false
            Color2.visibleOnFrame = false
            Color2.target = 1
            Color2.value = new Color3(
                0.30196078431372547,
                0.30196078431372547,
                0.3137254901960784
            )
            Color2.isConstant = false

            // FragmentOutputBlock
            var FragmentOutput = new FragmentOutputBlock('FragmentOutput')
            FragmentOutput.visibleInInspector = false
            FragmentOutput.visibleOnFrame = false
            FragmentOutput.target = 2
            FragmentOutput.convertToGammaSpace = false
            FragmentOutput.convertToLinearSpace = false
            FragmentOutput.useLogarithmicDepth = false

            // TransformBlock
            var WorldPosViewProjectionTransform = new TransformBlock(
                'WorldPos * ViewProjectionTransform'
            )
            WorldPosViewProjectionTransform.visibleInInspector = false
            WorldPosViewProjectionTransform.visibleOnFrame = false
            WorldPosViewProjectionTransform.target = 1
            WorldPosViewProjectionTransform.complementZ = 0
            WorldPosViewProjectionTransform.complementW = 1

            // InputBlock
            var ViewProjection = new InputBlock('ViewProjection')
            ViewProjection.visibleInInspector = false
            ViewProjection.visibleOnFrame = false
            ViewProjection.target = 1
            ViewProjection.setAsSystemValue(
                NodeMaterialSystemValues.ViewProjection
            )

            // VertexOutputBlock
            var VertexOutput = new VertexOutputBlock('VertexOutput')
            VertexOutput.visibleInInspector = false
            VertexOutput.visibleOnFrame = false
            VertexOutput.target = 1

            // Connections
            position.output.connectTo(WorldPos.vector)
            World.output.connectTo(WorldPos.transform)
            WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector)
            ViewProjection.output.connectTo(
                WorldPosViewProjectionTransform.transform
            )
            WorldPosViewProjectionTransform.output.connectTo(
                VertexOutput.vector
            )
            AmbientLight.output.connectTo(AddAmbienttoDiffuse.left)
            Color.output.connectTo(DiffuzeLightCalculation.input)
            normal.output.connectTo(WorldnormalN.vector)
            World.output.connectTo(WorldnormalN.transform)
            WorldnormalN.output.connectTo(N.xyzw)
            N.xyzOut.connectTo(NNormalized.input)
            NNormalized.output.connectTo(NDotL.left)
            WorldPos.output.connectTo(Lightinformationlight.worldPosition)
            Lightinformationlight.direction.connectTo(LNormalized.input)
            LNormalized.output.connectTo(NDotL.right)
            NDotL.output.connectTo(QuantizedDuffizeLighting.value)
            Diffusecutoff.output.connectTo(QuantizedDuffizeLighting.edge)
            QuantizedDuffizeLighting.output.connectTo(
                DiffuzeLightCalculation.factor
            )
            DiffuzeLightCalculation.output.connectTo(AddAmbienttoDiffuse.right)
            AddAmbienttoDiffuse.output.connectTo(AddSpecularAmbientDuffuse.left)
            Color1.output.connectTo(SpecularLightingCalculation.input)
            NNormalized.output.connectTo(NDotH.left)
            LNormalized.output.connectTo(H.left)
            WorldPos.output.connectTo(Viewdirection.worldPosition)
            cameraPosition.output.connectTo(Viewdirection.cameraPosition)
            Viewdirection.output.connectTo(Vnormalized.input)
            Vnormalized.output.connectTo(H.right)
            H.output.connectTo(HNormalized.input)
            HNormalized.output.connectTo(NDotH.right)
            NDotH.output.connectTo(SpecularFactor.left)
            QuantizedDuffizeLighting.output.connectTo(SpecularFactor.right)
            SpecularFactor.output.connectTo(SpecularIntensity.value)
            Glossiness1.output.connectTo(Glossiness.left)
            Glossiness1.output.connectTo(Glossiness.right)
            Glossiness.output.connectTo(SpecularIntensity.power)
            SpecularIntensity.output.connectTo(QuatnizedSpecularIntesity.value)
            SpecularCutoff.output.connectTo(QuatnizedSpecularIntesity.edge)
            QuatnizedSpecularIntesity.output.connectTo(
                SpecularLightingCalculation.factor
            )
            SpecularLightingCalculation.output.connectTo(
                AddSpecularAmbientDuffuse.right
            )
            AddSpecularAmbientDuffuse.output.connectTo(
                AddRimSpecDiffAmbient.left
            )
            RimLightColor.output.connectTo(Scale.input)
            NNormalized.output.connectTo(NDotV.left)
            Vnormalized.output.connectTo(NDotV.right)
            NDotV.output.connectTo(NDotV1.input)
            NDotV1.output.connectTo(RimIntensity.left)
            NDotL.output.connectTo(RimFactor.value)
            RimIntensity1.output.connectTo(RimFactor.power)
            RimFactor.output.connectTo(RimIntensity.right)
            RimIntensity.output.connectTo(QuantizedRimLightIntensity.value)
            RimCutoff.output.connectTo(QuantizedRimLightIntensity.edge)
            QuantizedRimLightIntensity.output.connectTo(Scale.factor)
            Scale.output.connectTo(AddRimSpecDiffAmbient.right)
            AddRimSpecDiffAmbient.output.connectTo(
                MultiplyLughtbySurfaceColor.left
            )
            Color2.output.connectTo(MultiplyLughtbySurfaceColor.right)
            MultiplyLughtbySurfaceColor.output.connectTo(FragmentOutput.rgb)

            // Output nodes
            nodeMaterial.addOutputNode(VertexOutput)
            nodeMaterial.addOutputNode(FragmentOutput)
            nodeMaterial.build()

            treeModel3.material = nodeMaterial
        })

        function onProgressLoading(event) {
            if (event.lengthComputable) {
                const progress = event.loaded / event.total
                // console.log(progress)
                if (progress > 0.7) {
                    setProgress(100)
                }
            }
        }

        const workerPool = new WorkerPool([4])

        // setProgress(90)
        await SceneLoader.ImportMeshAsync(
            '',
            '/',
            './minor_trees/trees_minor.obj',
            scene,
            onProgressLoading,
            '.obj',
            '',
            '',
            undefined,
            undefined,
            workerPool
        ).then(({meshes}) => {
            const minor_trees_meshes = meshes[0]
            light.excludedMeshes.push(minor_trees_meshes)
            minor_trees_meshes.rotation = new Vector3(0, 30, 0)
            minor_trees_meshes.position = new Vector3(0, 0, 0)
            setProgress(100)
            setIsLoaded(true)
            engine.hideLoadingUI()
        })
        // setIsLoaded(true)
        // engine.hideLoadingUI()
    }
    // #endregion

    const handleClose = () => {
        setIsClose(true)
    }

    return (
        <>
            {!isClose && isOpen && <ThirdPage onClose={handleClose} />}
            <SceneComponent
                style={{
                    visibility: isOpen ? 'visible' : 'hidden',
                    height: isOpen ? '100vh' : 0,
                    pointerEvents: !isClose ? 'none' : 'all'
                }}
                engineOptions={{
                    adaptToDeviceRatio: true,
                    antialias: true,
                }}
                antialias
                onSceneReady={onSceneReady}
                id="my-canvas"
            />
        </>
    )
}

BabylonScene.propTypes = {
    onLoadedHandle: PropTypes.func,
}
