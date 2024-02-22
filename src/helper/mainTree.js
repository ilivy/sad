import {
  // Color3,
  SceneLoader,
  // StandardMaterial,
  Vector3,
  WorkerPool
} from '@babylonjs/core';
import constructTreeMaterial from "./mainTreeMaterial";

const loadMainTrees = (objUrl, scene, onProgressLoading, onLoad) => {

  const workerPool = new WorkerPool([4]);

  SceneLoader.ImportMeshAsync(
      '',
      '/',
      objUrl,
      scene,
      onProgressLoading,
      '.obj',
      '',
      '',
      undefined,
      undefined,
      workerPool
  ).then(({ meshes }) => {
  // ).then(() => {

      const treeSmodel = meshes[0];
      treeSmodel.scaling = new Vector3(0.04, 0.04, 0.04);
      treeSmodel.position = new Vector3(0, 0, 0);
      constructTreeMaterial(treeSmodel);

      const treeNmodel = treeSmodel.clone("treeNclone");
      treeNmodel.skeleton = null;
      treeNmodel.position = new Vector3(-680, 0, 320);
      constructTreeMaterial(treeNmodel);

      const treeZmodel = treeSmodel.clone("treeZclone");
      treeZmodel.skeleton = null;
      treeZmodel.position = new Vector3(-80, 0, 700);
      constructTreeMaterial(treeZmodel);


      // Instances more efficient in saving resources,
      // if compared to clones

      // const treeSModel = meshes[0];
      // constructTreeMaterial(treeSModel);
      // // const treeMaterial = new StandardMaterial("treeMaterial", scene);
      // // treeMaterial.diffuseColor = Color3.FromHexString('#000000');
      // // treeSModel.material = treeMaterial;

      // treeSModel.scaling = new Vector3(0.04, 0.04, 0.04);
      // treeSModel.position = new Vector3(0, 0, 0);

      // const treeNInstance = treeSModel.createInstance("treeNInstance");
      // // constructTreeMaterial(treeNInstance);
      // treeNInstance.position = new Vector3(-680, 0, 320);

      // const treeZInstance = treeSModel.createInstance("treeZInstance");
      // // constructTreeMaterial(treeZInstance);
      // treeZInstance.position = new Vector3(-80, 0, 700);

      onLoad();
  });
}

export default loadMainTrees;