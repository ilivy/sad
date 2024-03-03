import {
  Color3,
  MeshBuilder,
  SceneLoader,
  StandardMaterial,
  TransformNode,
  Vector3,
} from '@babylonjs/core';

const loadMinorTrees = (scene, light) => {

  /////////////////////////////////////////////
  /// DEBUG
  /// ToDo: remove this block
  /////////////////////////////////////////////
  // const sph = MeshBuilder.CreateSphere("sph", {diameter: 200});
  // sph.position = new Vector3(-391, 25, -27);

  // const smat = new StandardMaterial("smat", scene);
  // smat.diffuseColor = Color3.FromHexString('#bebebe');
  // sph.material = smat;

  // const sph2 = MeshBuilder.CreateSphere("sph", {diameter: 200});
  // sph2.position = new Vector3(307, 25, -347);
  // sph2.material = smat;

  // const sph3 = MeshBuilder.CreateSphere("sph", {diameter: 200});
  // sph3.position = new Vector3(248, 25, 360);
  // sph3.material = smat;

  //////////////////////////////////////////


  loadReed(scene);

  // const objUrl = "./minor_trees/tree.obj";
  const objUrl = "./minor_trees/tree_opt.obj";

  SceneLoader.ImportMeshAsync(
    '',
    '/',
    objUrl,
    scene,
    undefined,
    '.obj',
  ).then(({ meshes }) => {

    const minorTreeModel = meshes[0];
    light.excludedMeshes.push(minorTreeModel);
    minorTreeModel.rotation.x = Math.PI / 2;
    minorTreeModel.position = new Vector3(50, 40, 50);

    for (let i=1; i<100; i++) {
      const mtreeInstance = minorTreeModel.createInstance("minorTreeNInstance" + i);
      // (70, y, 0) relative center 
      let xCoord = Math.floor(Math.random() * 1200) - 600 + 70;  // from -530 to 670
      let zCoord = Math.floor(Math.random() * 1200) - 600;  // from -600 to 600

      // Need to move minor objects a little 
      // from the Main tress
      if (num_between(148, xCoord, 348) && num_between(260, zCoord, 460)) {
        xCoord += 300;
        zCoord += 300;
      }
      if (num_between(207, xCoord, 407) && num_between(-447, zCoord, -247)) {
        xCoord += 300;
        zCoord -= 300;
      }
      if (num_between(-491, xCoord, -291) && num_between(-127, zCoord, 73)) {
        xCoord -= 300;
        zCoord += 300;
      }

      mtreeInstance.position = new Vector3(xCoord, 44, zCoord);
      mtreeInstance.scaling = new Vector3(1.2, 1, 1.2);

      let rnum = Math.random();
      if (rnum > 0.8) {
        mtreeInstance.rotation.y = Math.PI / 2;
      } else if (rnum > 0.6) {
        mtreeInstance.rotation.y = Math.PI / 3;
      } else if (rnum > 0.4) {
        mtreeInstance.rotation.y = Math.PI / -2;
      } else if (rnum > 0.2) {
        mtreeInstance.rotation.y = Math.PI / -1.5;
      }

      rnum = Math.random();
      if (rnum > 0.9) {
        mtreeInstance.scaling = new Vector3(0.8, 1, 0.8);
        mtreeInstance.position.y = 30;
      } else if (rnum > 0.7) {
        mtreeInstance.scaling = new Vector3(1, 1, 1);
        mtreeInstance.position.y = 32;
      }
    }
  });
}

const loadReed = (scene) => {
  const trunkHeight = 40;
  const trunkRadius = 0.3;

  const rootTree = new TransformNode();

  const treeMaterial = new StandardMaterial("treeMaterial", scene);
  treeMaterial.diffuseColor = Color3.FromHexString('#bebebe');

  const trunk = MeshBuilder.CreateCylinder("trunk", {
      height: trunkHeight,
      diameterTop: trunkRadius,
      diameterBottom: trunkRadius * 1.5
    }, scene);
  // light.excludedMeshes.push(trunk);
  trunk.position = new Vector3(10, 20, 10);
  trunk.material = treeMaterial;
  trunk.parent = rootTree;

  const branchOne = MeshBuilder.CreateCylinder("branchOne", {
      height: 8,
      diameterTop: 0.2,
      diameterBottom: trunkRadius * 1.2
    }, scene);
  // light.excludedMeshes.push(branchOne);      
  branchOne.position = new Vector3(10, 30, 12.8);
  branchOne.rotation.x = Math.PI / 4;
  branchOne.material = treeMaterial;
  branchOne.parent = rootTree;

  for (let i=1; i<100; i++) {
    const treeClone = rootTree.clone("trunkClone" + i);
    // light.excludedMeshes.push(treeClone);

    let xCoord = Math.floor(Math.random() * 1000) - 500 + 70;
    let zCoord = Math.floor(Math.random() * 1000) - 500;
    // Need to move minor objects a little 
    // from the Main tress
    if ((num_between(228, xCoord, 268) && num_between(340, zCoord, 380))
      || (num_between(287, xCoord, 327) && num_between(-367, zCoord, -327))
      || (num_between(-411, xCoord, -371) && num_between(-47, zCoord, -7))) {
      xCoord += 100;
      zCoord += 100;
    }
    treeClone.position = new Vector3(xCoord, 0, zCoord);

    let rnum = Math.random();
    if (rnum > 0.8) {
      treeClone.rotation.y = Math.PI / 2;
    } else if (rnum > 0.6) {
      treeClone.rotation.y = Math.PI / 3;
    } else if (rnum > 0.4) {
      treeClone.rotation.y = Math.PI / -2;
    } else if (rnum > 0.2) {
      treeClone.rotation.y = Math.PI / -1.5;
    }

    rnum = Math.random();
    if (rnum > 0.85) {
      treeClone.scaling = new Vector3(1, 0.4, 1);
    } else if (rnum > 0.7) {
      treeClone.scaling = new Vector3(1, 0.6, 1);
    } else {
      treeClone.scaling = new Vector3(1, 0.8, 1);
    }
  }
}

const num_between = (num_min, num, num_max) => {
  return num_min < num && num < num_max;
}

export default loadMinorTrees;