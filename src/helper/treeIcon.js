import {
  Color3,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3
} from '@babylonjs/core';

const createTreeIcon = (iconId, positionVector, imgUrl) => {

  const transFromNode = new TransformNode('node_' + iconId);
  transFromNode.position.y = 3;
  // GUI
  const bgPlane = MeshBuilder.CreatePlane('bgPlane_' + iconId, {
      size: 25,
      sideOrientation: Mesh.DOUBLESIDE,
  });
  bgPlane.setEnabled(false);

  const stand = new StandardMaterial('bgMaterial_' + iconId);
  const bgTexture = new Texture(imgUrl);
  stand.disableLighting = true;
  stand.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'));
  stand.opacityTexture = bgTexture;
  bgPlane.material = stand;

  const sizeV = 0.5;
  const iconMesh = MeshBuilder.CreatePlane('iconMesh_' + iconId, {
      width: sizeV * 1.4,
      height: sizeV,
      sideOrientation: Mesh.DOUBLESIDE,
  });

  const stand2 = new StandardMaterial('iconMaterial_' + iconId);
  const bgTexture2 = new Texture(imgUrl);
  stand2.disableLighting = true;
  stand2.emissiveColor.copyFrom(Color3.FromHexString('#ffffff'));
  stand2.opacityTexture = bgTexture2;
  iconMesh.material = stand2;
  iconMesh.position.z += 0.01;
  iconMesh.setEnabled(false);

  const iconGroup = new TransformNode('iconGroup_' + iconId);
  iconGroup.billboardMode = Mesh.BILLBOARDMODE_ALL;
  const bgPlaneInstance = bgPlane.createInstance(
      bgPlane.name + '_instance'
  );
  bgPlaneInstance.setEnabled(true);
  const iconMeshInstance = iconMesh.createInstance(
    iconMesh.name + '_instance'
  );
  iconGroup.position = positionVector;
  iconMeshInstance.setEnabled(true);
  bgPlaneInstance.parent = iconGroup;
  iconMeshInstance.parent = iconGroup;
  iconGroup.parent = transFromNode;

  // bgPlane.isPickable = true;
}

const createTreeIcons = () => {

  // Tree N //////////////////////
  createTreeIcon(
    "treeNperson",
    new Vector3(-340, 50, -25),
    "/jpg/icon/tree_icon_person_N.png"
  );

  createTreeIcon(
    "treeNsound",
    new Vector3(-380, 50, -60),
    "/jpg/icon/tree_icon_music.png"
  );

  createTreeIcon(
    "treeNartobj",
    new Vector3(-360, 50, 10),
    "/jpg/icon/tree_icon_artobj.png"
  );

  // Tree S ////////////////////

  createTreeIcon(
    "treeSperson",
    new Vector3(260, 50, -320),
    "/jpg/icon/tree_icon_person_S.png"
  );

  createTreeIcon(
    "treeSsound",
    new Vector3(280, 50, -380),
    "/jpg/icon/tree_icon_music.png"
  );

  createTreeIcon(
    "treeSartobj",
    new Vector3(320, 50, -310),
    "/jpg/icon/tree_icon_artobj.png"
  );

  // Tree Z //////////////////////

  createTreeIcon(
    "treeZperson",
    new Vector3(180, 50, 340),
    "/jpg/icon/tree_icon_person_Z.png"
  );

  createTreeIcon(
    "treeZsound",
    new Vector3(280, 50, 340),
    "/jpg/icon/tree_icon_music.png"
  );

  createTreeIcon(
    "treeZartobj",
    new Vector3(260, 50, 400),
    "/jpg/icon/tree_icon_artobj.png"
  );
}

export default createTreeIcons;