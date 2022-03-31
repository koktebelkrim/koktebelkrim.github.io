const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = () => {
  // Создаём сцену
  const scene = new BABYLON.Scene(engine);
  // Положение камеры
  const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  // Привязываем камеру к канвасу
  camera.attachControl(canvas, true);
  // Освещение
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1.25, 0));

  /**
   * Создание объектов
   */

  let faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.50, 0.0, 0.65, 1.0); //rear face
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.20, 1.0); //front face
  faceUV[2] = new BABYLON.Vector4(0.20, 0.0, 0.5, 1.0); //right side
  faceUV[3] = new BABYLON.Vector4(0.70, 0.0, 1.0, 1.0); //left side

  const box = BABYLON.MeshBuilder.CreateBox('box', {
    faceUV: faceUV,
    wrap: true,
    width:  2,
    height: 1.5,
    depth:  3,
  })

  box.position = new BABYLON.Vector3(0, 0.75, 0); // Ставим коробочку на землю
  box.rotation.y = BABYLON.Tools.ToRadians(90);

  const
    boxMaterial = new BABYLON.StandardMaterial('boxMaterial');
    boxMaterial.diffuseTexture = new BABYLON.Texture('textures/home_texture.png', scene);

  box.material = boxMaterial;


  // Крыша
  const roof   = BABYLON.MeshBuilder.CreateCylinder('roof', { 
    diameter:     3,
    height:       3.5,
    tessellation: 3,
  })

  roof.scaling.x  = 0.5;
  roof.rotation.z = BABYLON.Tools.ToRadians(90);
  roof.position = new BABYLON.Vector3(0, 1.75, 0);

  const
    roofMaterial = new BABYLON.StandardMaterial('roofMaterial');
    roofMaterial.diffuseTexture = new BABYLON.Texture('textures/roof_texture.png', scene);

  roof.material = roofMaterial;


  // Поверхность
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { 
    width:  10,
    height: 10,
  })

  const 
    groundMaterial = new BABYLON.StandardMaterial('groundMaterial');
    groundMaterial.diffuseTexture = new BABYLON.Texture('textures/ground_texture.jpg', scene)
  
  ground.material = groundMaterial;
  

  /**
   * Добавлям звуки
   */
  const btnSwitch    = document.querySelector('.player-switch');
  const curSoundNode = document.querySelector('.sound-name');

   const sound = new BABYLON.Sound('euphoria', 'audio/BurntDusk.mp3', scene, null, {
    loop: true,
  })

  btnSwitch.addEventListener('click', () => {
    btnSwitch.classList.toggle('active');
    if (btnSwitch.classList.contains('active')) {
      btnSwitch.innerHTML = 'Off';
      curSoundNode.innerHTML = 'BurntDusk.mp3';
      sound.play();
    } else {
      btnSwitch.innerHTML = 'On';
      curSoundNode.innerHTML = '';
      sound.stop();
    }
  })

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});