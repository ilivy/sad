import React, { useState } from 'react';
import '@babylonjs/loaders/OBJ';
import PropTypes from 'prop-types';
import {
    Color3,
    CubeTexture,
    FreeCamera,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3
} from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import { useButtonContext } from './App';
import ThirdPage from './ThirdPage';
import MainMenu from './sidebar/MainMenu';
import BurgerButton from './sidebar/BurgerButton';
import ControlButtons from "./sidebar/ControlButtons";
import IconPopup from './treeIcons/IconPopup';
import SoundPlayer from './soundPlayer/SoundPlayer';
import createTreeIcons from './helper/treeIcon';
import loadMainTrees from './helper/mainTree';

export default function BabylonScene() {
    const { 
        setIsLoaded,
        isOpen,
        setProgress,

        isBurgerPopupOpen,
        setIsBurgerPopupOpen,

        isIconPopupOpen,
        setIsIconPopupOpen,
        setIconPopupId
    } = useButtonContext();

    const [isClose, setIsClose] = useState(false)

    const onSceneReady = async (scene) => {
        setProgress(0)
        const engine = scene.getEngine();
        const canvas = engine.getRenderingCanvas();

        const camera = new FreeCamera(
            'FreeCamera',
            new Vector3(0, 20, 0),
            scene
        );
        camera.setTarget(new Vector3(-5, 20, -5));
        camera.attachControl(canvas, true);
        camera.minZ = 0.42;
        camera.speed = 1;
        camera.angularSensibility = 5000;
        camera.keysUp.push(87);
        camera.keysLeft.push(65);
        camera.keysDown.push(83);
        camera.keysRight.push(68);
        scene.activeCamera = camera;

    
        //Light
        const light = new HemisphericLight(
            'light1',
            new Vector3(0, 0.00001, 0),
            scene
        );
        light.intensity = 0.7;

        //Skybox
        const skybox = Mesh.CreateBox('skyBox', 10000.0, scene);
        var skyboxMaterial = new StandardMaterial('skyBox', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture(
            'environment_3.env',
            scene
        );
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(1, 1, 1);
        skyboxMaterial.specularColor = new Color3(5, 5, 5);
        skyboxMaterial.disableLighting = false;
        skybox.material = skyboxMaterial;

        scene.fogMode = Scene.FOGMODE_EXP;

        scene.fogColor = new Color3(0.58, 0.85, 0.99);
        //(0.58, 0.85, 0.99) day (0.29, 0.32, 0.35) night
        scene.fogDensity = 0.0040;  // 0.0040
        setProgress(2);
        //Ground
        const ground = new MeshBuilder.CreateGroundFromHeightMap(
            '',
            '/jpg/Terrain_map.png',
            {
                height: 2000,
                width: 2000,
                subdivisions: 40,  // 40
                maxHeight: 25,
            }
        );
        setProgress(4);
        const groundmaterial = new StandardMaterial('ground', scene);
        groundmaterial.diffuseTexture = new Texture('/jpg/342342.jpg', scene);
        groundmaterial.diffuseTexture.uScale = 10;
        groundmaterial.diffuseTexture.vScale = 10;

        ground.material = groundmaterial;

        // Enable Collisions
        ground.collisionsEnabled = true;

        // Physics
        const gravity = new Vector3(0, -1, 0);
        scene.enablePhysics(gravity);

        //earth gravity
        const assumedFramesPerSecond = 60;
        const earthGravity = -90.81;
        scene.gravity = new Vector3(0, earthGravity / assumedFramesPerSecond, 0);

        //Then apply collisions and gravity to the active camera
        camera.checkCollisions = true;
        camera.applyGravity = true;

        //Set the ellipsoid around the camera (e.g. your player's size)
        camera.ellipsoid = new Vector3(1, 10, 1);

        //finally, say which mesh will be collisionable
        ground.checkCollisions = true;


        setProgress(6);

        // Add 3 info icons on every Tree
        createTreeIcons();


        // scene.skipPointerMovePicking = true;

        scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type == 1) {  // POINTERPICK = 16, POINTERDOWN = 1
                // console.log(pointerInfo.pickInfo.pickedMesh.name);

                switch (pointerInfo.pickInfo.pickedMesh.name) {
                    case 'bgPlane_treeNperson_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('personN');
                        // console.log('personN');
                        break;
                    case 'bgPlane_treeNsound_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('soundN');
                        // console.log('personN');
                        break;
                    case 'bgPlane_treeNartobj_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('artobjN');
                        // console.log('artobjN');
                        break;

                    case 'bgPlane_treeSperson_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('personS');
                        // console.log('artobjN');
                        break;
                    case 'bgPlane_treeSsound_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('soundS');
                        // console.log('soundS');
                        break;
                    case 'bgPlane_treeSartobj_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('artobjS');
                        // console.log('artobjS');
                        break;

                    case "bgPlane_treeZperson_instance":
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('personZ');
                        // console.log('personZ');
                        break;
                    case 'bgPlane_treeZsound_instance':
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('soundZ');
                        // console.log('soundZ');
                        break;
                    case 'bgPlane_treeZartobj_instance': 
                        setIsBurgerPopupOpen(false);
                        setIsIconPopupOpen(true);
                        setIconPopupId('artobjZ');
                        // console.log('artobjZ');
                        break;
                }
            }
        });

        // function onProgressLoading(event) {
        const onProgressLoading = (event) => {
            if (event.lengthComputable) {
                let progress = event.loaded / event.total;
                progress = Math.round(progress * 100) / 100;
                
                // console.log(progress);
                // we need to scale the current loading from 20% to 100%
                let progressScaled = 20 + (progress / 1.25) * 100;
                progressScaled = Math.round(progressScaled);
                // console.log(progressScaled);
                setProgress(progressScaled);
                
                // if (progress >= 0.98) {
                //     setProgress(100)
                // }
            }
        }

        //
        // Loading 3 main Trees
        //
        loadMainTrees(
            './main_trees/M_Tree_1.obj', 
            scene,
            onProgressLoading,
            () => {
                setProgress(100);
                setIsLoaded(true);
                engine.hideLoadingUI();
            },
        );

        // This feature uses memory, we turn it off
        engine.enableOfflineSupport = false;

        // const workerPool = new WorkerPool([4])

        // setProgress(90)
        // await SceneLoader.ImportMeshAsync(
        //     '',
        //     '/',
        //     './minor_trees/trees_minor.obj',
        //     scene,
        //     onProgressLoading,
        //     '.obj',
        //     '',
        //     '',
        //     undefined,
        //     undefined,
        //     workerPool
        // ).then(({meshes}) => {
        //     const minor_trees_meshes = meshes[0]
        //     light.excludedMeshes.push(minor_trees_meshes)
        //     minor_trees_meshes.rotation = new Vector3(0, 30, 0)
        //     minor_trees_meshes.position = new Vector3(0, 0, 0)
        //     setProgress(100)
        //     setIsLoaded(true)
        //     engine.hideLoadingUI()
        // })
        // setProgress(100);  // to comment
        // setIsLoaded(true);  // to comment
        // engine.hideLoadingUI();  // to comment
    }
    // #end onSceneReady

    // Click "B SAD" button
    const handleClose = () => {
        setIsClose(true);
    }

    return (
        <>
            {!isClose && isOpen && <ThirdPage onClose={handleClose} />}
            {isClose && isOpen && isBurgerPopupOpen && <MainMenu />}
            {isClose && isOpen && !isBurgerPopupOpen && <BurgerButton />}
            {isClose && isOpen && isIconPopupOpen && <IconPopup />}
            {isClose && isOpen && <ControlButtons />}
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

            {isClose && isOpen && <SoundPlayer />}
        </>
    )
}

BabylonScene.propTypes = {
    onLoadedHandle: PropTypes.func,
}
