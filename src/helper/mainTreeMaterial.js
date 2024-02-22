import {
  AddBlock,
  AnimatedInputBlockTypes,
  Color3,
  ColorMergerBlock,
  DotBlock,
  FragmentOutputBlock,
  InputBlock,
  LightInformationBlock,
  MultiplyBlock,
  NodeMaterial,
  NodeMaterialModes,
  NodeMaterialSystemValues,
  NormalizeBlock,
  OneMinusBlock,
  PowBlock,
  ScaleBlock,
  StepBlock,
  TransformBlock,
  VectorSplitterBlock,
  VertexOutputBlock,
  ViewDirectionBlock
} from '@babylonjs/core';

const constructTreeMaterial = (treeModel) => {
  //////////////////
  // Tree Material
  //////////////////
  const nodeMaterial = new NodeMaterial('node');
  nodeMaterial.mode = NodeMaterialModes.Material;

  // InputBlock
  const position = new InputBlock('position');
  position.visibleInInspector = false;
  position.visibleOnFrame = false;
  position.target = 1;
  position.setAsAttribute('position');

  // TransformBlock
  const WorldPos = new TransformBlock('WorldPos');
  WorldPos.visibleInInspector = false;
  WorldPos.visibleOnFrame = false;
  WorldPos.target = 1;
  WorldPos.complementZ = 0;
  WorldPos.complementW = 1;

  // InputBlock
  const World = new InputBlock('World');
  World.visibleInInspector = false;
  World.visibleOnFrame = false;
  World.target = 1;
  World.setAsSystemValue(NodeMaterialSystemValues.World);

  // TransformBlock
  const WorldnormalN = new TransformBlock('World normal (N)');
  WorldnormalN.visibleInInspector = false;
  WorldnormalN.visibleOnFrame = false;
  WorldnormalN.target = 1;
  WorldnormalN.complementZ = 0;
  WorldnormalN.complementW = 0;

  // InputBlock
  const normal = new InputBlock('normal');
  normal.visibleInInspector = false;
  normal.visibleOnFrame = false;
  normal.target = 1;
  normal.setAsAttribute('normal');

  // VectorSplitterBlock
  const N = new VectorSplitterBlock('N');
  N.visibleInInspector = false;
  N.visibleOnFrame = false;
  N.target = 4;

  // NormalizeBlock
  const NNormalized = new NormalizeBlock('N (Normalized)');
  NNormalized.visibleInInspector = false;
  NNormalized.visibleOnFrame = false;
  NNormalized.target = 4;

  // DotBlock
  const NDotL = new DotBlock('N Dot L');
  NDotL.visibleInInspector = false;
  NDotL.visibleOnFrame = false;
  NDotL.target = 4;

  // NormalizeBlock
  const LNormalized = new NormalizeBlock('L (Normalized)');
  LNormalized.visibleInInspector = false;
  LNormalized.visibleOnFrame = false;
  LNormalized.target = 4;

  // LightInformationBlock
  const Lightinformationlight = new LightInformationBlock(
      'Light information (light)'
  );
  Lightinformationlight.visibleInInspector = false;
  Lightinformationlight.visibleOnFrame = false;
  Lightinformationlight.target = 1;

  // AddBlock
  const H = new AddBlock('H');
  H.visibleInInspector = false;
  H.visibleOnFrame = false;
  H.target = 4;

  // NormalizeBlock
  const Vnormalized = new NormalizeBlock('V (normalized)');
  Vnormalized.visibleInInspector = false;
  Vnormalized.visibleOnFrame = false;
  Vnormalized.target = 4;

  // ViewDirectionBlock
  const Viewdirection = new ViewDirectionBlock('View direction');
  Viewdirection.visibleInInspector = false;
  Viewdirection.visibleOnFrame = false;
  Viewdirection.target = 4;

  // InputBlock
  const cameraPosition = new InputBlock('cameraPosition');
  cameraPosition.visibleInInspector = false;
  cameraPosition.visibleOnFrame = false;
  cameraPosition.target = 1;
  cameraPosition.setAsSystemValue(
      NodeMaterialSystemValues.CameraPosition
  );

  // DotBlock
  const NDotV = new DotBlock('N Dot V');
  NDotV.visibleInInspector = false;
  NDotV.visibleOnFrame = false;
  NDotV.target = 4;

  // OneMinusBlock
  const NDotV1 = new OneMinusBlock('1 - N Dot V');
  NDotV1.visibleInInspector = false;
  NDotV1.visibleOnFrame = false;
  NDotV1.target = 4;

  // MultiplyBlock
  const RimIntensity = new MultiplyBlock('Rim Intensity');
  RimIntensity.visibleInInspector = false;
  RimIntensity.visibleOnFrame = false;
  RimIntensity.target = 4;

  // PowBlock
  const RimFactor = new PowBlock('Rim Factor');
  RimFactor.visibleInInspector = false;
  RimFactor.visibleOnFrame = false;
  RimFactor.target = 4;

  // InputBlock
  const RimIntensity1 = new InputBlock('Rim Intensity');
  RimIntensity1.visibleInInspector = false;
  RimIntensity1.visibleOnFrame = false;
  RimIntensity1.target = 1;
  RimIntensity1.value = 0.4;
  RimIntensity1.min = 0;
  RimIntensity1.max = 0;
  RimIntensity1.isBoolean = false;
  RimIntensity1.matrixMode = 0;
  RimIntensity1.animationType = AnimatedInputBlockTypes.None;
  RimIntensity1.isConstant = false;

  // StepBlock
  const QuantizedRimLightIntensity = new StepBlock(
      'Quantized Rim Light Intensity'
  );
  QuantizedRimLightIntensity.visibleInInspector = false;
  QuantizedRimLightIntensity.visibleOnFrame = false;
  QuantizedRimLightIntensity.target = 4;

  // InputBlock
  const RimCutoff = new InputBlock('Rim Cutoff');
  RimCutoff.visibleInInspector = false;
  RimCutoff.visibleOnFrame = false;
  RimCutoff.target = 1;
  RimCutoff.value = 0.6;
  RimCutoff.min = 0;
  RimCutoff.max = 0;
  RimCutoff.isBoolean = false;
  RimCutoff.matrixMode = 0;
  RimCutoff.animationType = AnimatedInputBlockTypes.None;
  RimCutoff.isConstant = false;

  // ScaleBlock
  const Scale = new ScaleBlock('Scale');
  Scale.visibleInInspector = false;
  Scale.visibleOnFrame = false;
  Scale.target = 4;

  // InputBlock
  const RimLightColor = new InputBlock('Rim Light Color');
  RimLightColor.visibleInInspector = false;
  RimLightColor.visibleOnFrame = false;
  RimLightColor.target = 1;
  RimLightColor.value = new Color3(
      0.47843137254901963,
      0.4745098039215686,
      0.4745098039215686
  );
  RimLightColor.isConstant = false;

  // AddBlock
  const AddRimSpecDiffAmbient = new AddBlock(
      'Add Rim + Spec + Diff + Ambient'
  );
  AddRimSpecDiffAmbient.visibleInInspector = false;
  AddRimSpecDiffAmbient.visibleOnFrame = false;
  AddRimSpecDiffAmbient.target = 4;

  // AddBlock
  const AddSpecularAmbientDuffuse = new AddBlock(
      'Add Specular + Ambient + Duffuse'
  );
  AddSpecularAmbientDuffuse.visibleInInspector = false;
  AddSpecularAmbientDuffuse.visibleOnFrame = false;
  AddSpecularAmbientDuffuse.target = 4;

  // AddBlock
  const AddAmbienttoDiffuse = new AddBlock('Add Ambient to Diffuse');
  AddAmbienttoDiffuse.visibleInInspector = false;
  AddAmbienttoDiffuse.visibleOnFrame = false;
  AddAmbienttoDiffuse.target = 4;

  // InputBlock
  const AmbientLight = new InputBlock('Ambient Light');
  AmbientLight.visibleInInspector = false;
  AmbientLight.visibleOnFrame = false;
  AmbientLight.target = 1;
  AmbientLight.value = new Color3(
      0.3176470588235294,
      0.34901960784313724,
      0.3607843137254902
  );
  AmbientLight.isConstant = false;

  // ScaleBlock
  const DiffuzeLightCalculation = new ScaleBlock(
      'Diffuze Light Calculation'
  );
  DiffuzeLightCalculation.visibleInInspector = false;
  DiffuzeLightCalculation.visibleOnFrame = false;
  DiffuzeLightCalculation.target = 4;

  // InputBlock
  const Color = new InputBlock('Color3');
  Color.visibleInInspector = false;
  Color.visibleOnFrame = false;
  Color.target = 1;
  Color.value = new Color3(
      0.2235294117647059,
      0.22745098039215686,
      0.23921568627450981
  );
  Color.isConstant = false;

  // StepBlock
  const QuantizedDuffizeLighting = new StepBlock(
      'Quantized Duffize Lighting'
  );
  QuantizedDuffizeLighting.visibleInInspector = false;
  QuantizedDuffizeLighting.visibleOnFrame = false;
  QuantizedDuffizeLighting.target = 4;

  // InputBlock
  const Diffusecutoff = new InputBlock('Diffuse cutoff');
  Diffusecutoff.visibleInInspector = false;
  Diffusecutoff.visibleOnFrame = false;
  Diffusecutoff.target = 1;
  Diffusecutoff.value = 0;
  Diffusecutoff.min = 0;
  Diffusecutoff.max = 0;
  Diffusecutoff.isBoolean = false;
  Diffusecutoff.matrixMode = 0;
  Diffusecutoff.animationType = AnimatedInputBlockTypes.None;
  Diffusecutoff.isConstant = false;

  // MultiplyBlock
  const SpecularFactor = new MultiplyBlock('Specular Factor');
  SpecularFactor.visibleInInspector = false;
  SpecularFactor.visibleOnFrame = false;
  SpecularFactor.target = 4;

  // DotBlock
  const NDotH = new DotBlock('N Dot H');
  NDotH.visibleInInspector = false;
  NDotH.visibleOnFrame = false;
  NDotH.target = 4;

  // NormalizeBlock
  const HNormalized = new NormalizeBlock('H (Normalized)');
  HNormalized.visibleInInspector = false;
  HNormalized.visibleOnFrame = false;
  HNormalized.target = 4;

  // PowBlock
  const SpecularIntensity = new PowBlock('Specular Intensity');
  SpecularIntensity.visibleInInspector = false;
  SpecularIntensity.visibleOnFrame = false;
  SpecularIntensity.target = 4;

  // MultiplyBlock
  const Glossiness = new MultiplyBlock('Glossiness >2');
  Glossiness.visibleInInspector = false;
  Glossiness.visibleOnFrame = false;
  Glossiness.target = 4;

  // InputBlock
  const Glossiness1 = new InputBlock('Glossiness');
  Glossiness1.visibleInInspector = false;
  Glossiness1.visibleOnFrame = false;
  Glossiness1.target = 1;
  Glossiness1.value = 3;
  Glossiness1.min = 0;
  Glossiness1.max = 0;
  Glossiness1.isBoolean = false;
  Glossiness1.matrixMode = 0;
  Glossiness1.animationType = AnimatedInputBlockTypes.None;
  Glossiness1.isConstant = false;

  // StepBlock
  const QuatnizedSpecularIntesity = new StepBlock(
      'Quatnized Specular Intesity'
  );
  QuatnizedSpecularIntesity.visibleInInspector = false;
  QuatnizedSpecularIntesity.visibleOnFrame = false;
  QuatnizedSpecularIntesity.target = 4;

  // InputBlock
  const SpecularCutoff = new InputBlock('Specular Cutoff');
  SpecularCutoff.visibleInInspector = false;
  SpecularCutoff.visibleOnFrame = false;
  SpecularCutoff.target = 1;
  SpecularCutoff.value = 0.5;
  SpecularCutoff.min = 0;
  SpecularCutoff.max = 0;
  SpecularCutoff.isBoolean = false;
  SpecularCutoff.matrixMode = 0;
  SpecularCutoff.animationType = AnimatedInputBlockTypes.None;
  SpecularCutoff.isConstant = false;

  // ScaleBlock
  const SpecularLightingCalculation = new ScaleBlock(
      'Specular Lighting Calculation'
  );
  SpecularLightingCalculation.visibleInInspector = false;
  SpecularLightingCalculation.visibleOnFrame = false;
  SpecularLightingCalculation.target = 4;

  // InputBlock
  const Color1 = new InputBlock('Color3');
  Color1.visibleInInspector = false;
  Color1.visibleOnFrame = false;
  Color1.target = 1;
  Color1.value = new Color3(
      0.15294117647058825,
      0.15294117647058825,
      0.15294117647058825
  );
  Color1.isConstant = false;

  // ColorMergerBlock
  const ColorMerger = new ColorMergerBlock('ColorMerger');
  ColorMerger.visibleInInspector = false;
  ColorMerger.visibleOnFrame = false;
  ColorMerger.target = 4;
  ColorMerger.rSwizzle = 'r';
  ColorMerger.gSwizzle = 'g';
  ColorMerger.bSwizzle = 'b';
  ColorMerger.aSwizzle = 'a';

  // MultiplyBlock
  const MultiplyLughtbySurfaceColor = new MultiplyBlock(
      'Multiply Lught by Surface Color'
  );
  MultiplyLughtbySurfaceColor.visibleInInspector = false;
  MultiplyLughtbySurfaceColor.visibleOnFrame = false;
  MultiplyLughtbySurfaceColor.target = 4;

  // InputBlock
  const Color2 = new InputBlock('Color3');
  Color2.visibleInInspector = false;
  Color2.visibleOnFrame = false;
  Color2.target = 1;
  Color2.value = new Color3(
      0.30196078431372547,
      0.30196078431372547,
      0.3137254901960784
  );
  Color2.isConstant = false;

  // FragmentOutputBlock
  const FragmentOutput = new FragmentOutputBlock('FragmentOutput');
  FragmentOutput.visibleInInspector = false;
  FragmentOutput.visibleOnFrame = false;
  FragmentOutput.target = 2;
  FragmentOutput.convertToGammaSpace = false;
  FragmentOutput.convertToLinearSpace = false;
  FragmentOutput.useLogarithmicDepth = false;

  // TransformBlock
  const WorldPosViewProjectionTransform = new TransformBlock(
      'WorldPos * ViewProjectionTransform'
  );
  WorldPosViewProjectionTransform.visibleInInspector = false;
  WorldPosViewProjectionTransform.visibleOnFrame = false;
  WorldPosViewProjectionTransform.target = 1;
  WorldPosViewProjectionTransform.complementZ = 0;
  WorldPosViewProjectionTransform.complementW = 1;

  // InputBlock
  const ViewProjection = new InputBlock('ViewProjection');
  ViewProjection.visibleInInspector = false;
  ViewProjection.visibleOnFrame = false;
  ViewProjection.target = 1;
  ViewProjection.setAsSystemValue(
      NodeMaterialSystemValues.ViewProjection
  );

  // VertexOutputBlock
  const VertexOutput = new VertexOutputBlock('VertexOutput');
  VertexOutput.visibleInInspector = false;
  VertexOutput.visibleOnFrame = false;
  VertexOutput.target = 1;

  // Connections
  position.output.connectTo(WorldPos.vector);
  World.output.connectTo(WorldPos.transform);
  WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
  ViewProjection.output.connectTo(
      WorldPosViewProjectionTransform.transform
  );
  WorldPosViewProjectionTransform.output.connectTo(
      VertexOutput.vector
  );
  AmbientLight.output.connectTo(AddAmbienttoDiffuse.left);
  Color.output.connectTo(DiffuzeLightCalculation.input);
  normal.output.connectTo(WorldnormalN.vector);
  World.output.connectTo(WorldnormalN.transform);
  WorldnormalN.output.connectTo(N.xyzw);
  N.xyzOut.connectTo(NNormalized.input);
  NNormalized.output.connectTo(NDotL.left);
  WorldPos.output.connectTo(Lightinformationlight.worldPosition);
  Lightinformationlight.direction.connectTo(LNormalized.input);
  LNormalized.output.connectTo(NDotL.right);
  NDotL.output.connectTo(QuantizedDuffizeLighting.value);
  Diffusecutoff.output.connectTo(QuantizedDuffizeLighting.edge);
  QuantizedDuffizeLighting.output.connectTo(
      DiffuzeLightCalculation.factor
  );
  DiffuzeLightCalculation.output.connectTo(AddAmbienttoDiffuse.right);
  AddAmbienttoDiffuse.output.connectTo(AddSpecularAmbientDuffuse.left);
  Color1.output.connectTo(SpecularLightingCalculation.input);
  NNormalized.output.connectTo(NDotH.left);
  LNormalized.output.connectTo(H.left);
  WorldPos.output.connectTo(Viewdirection.worldPosition);
  cameraPosition.output.connectTo(Viewdirection.cameraPosition);
  Viewdirection.output.connectTo(Vnormalized.input);
  Vnormalized.output.connectTo(H.right);
  H.output.connectTo(HNormalized.input);
  HNormalized.output.connectTo(NDotH.right);
  NDotH.output.connectTo(SpecularFactor.left);
  QuantizedDuffizeLighting.output.connectTo(SpecularFactor.right);
  SpecularFactor.output.connectTo(SpecularIntensity.value);
  Glossiness1.output.connectTo(Glossiness.left);
  Glossiness1.output.connectTo(Glossiness.right);
  Glossiness.output.connectTo(SpecularIntensity.power);
  SpecularIntensity.output.connectTo(QuatnizedSpecularIntesity.value);
  SpecularCutoff.output.connectTo(QuatnizedSpecularIntesity.edge);
  QuatnizedSpecularIntesity.output.connectTo(
      SpecularLightingCalculation.factor
  );
  SpecularLightingCalculation.output.connectTo(
      AddSpecularAmbientDuffuse.right
  );
  AddSpecularAmbientDuffuse.output.connectTo(
      AddRimSpecDiffAmbient.left
  );
  RimLightColor.output.connectTo(Scale.input);
  NNormalized.output.connectTo(NDotV.left);
  Vnormalized.output.connectTo(NDotV.right);
  NDotV.output.connectTo(NDotV1.input);
  NDotV1.output.connectTo(RimIntensity.left);
  NDotL.output.connectTo(RimFactor.value);
  RimIntensity1.output.connectTo(RimFactor.power);
  RimFactor.output.connectTo(RimIntensity.right);
  RimIntensity.output.connectTo(QuantizedRimLightIntensity.value);
  RimCutoff.output.connectTo(QuantizedRimLightIntensity.edge);
  QuantizedRimLightIntensity.output.connectTo(Scale.factor);
  Scale.output.connectTo(AddRimSpecDiffAmbient.right);
  AddRimSpecDiffAmbient.output.connectTo(
      MultiplyLughtbySurfaceColor.left
  );
  Color2.output.connectTo(MultiplyLughtbySurfaceColor.right);
  MultiplyLughtbySurfaceColor.output.connectTo(FragmentOutput.rgb);

  // Output nodes
  nodeMaterial.addOutputNode(VertexOutput);
  nodeMaterial.addOutputNode(FragmentOutput);
  nodeMaterial.build();

  treeModel.material = nodeMaterial;
}

export default constructTreeMaterial;