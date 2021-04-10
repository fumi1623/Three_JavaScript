// ページの読み込みを待つ
window.addEventListener('load', init);
// サイズを指定
const width = 960;
const height = 540;

function init() {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30, width / height);

  {
    const spotLight = new THREE.SpotLight(
      0xffffff,
      4,
      2000,
      Math.PI / 5,
      0.2,
      1.5
    );
    spotLight.position.set(500, 300, 500);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);
  }

  //地面
  {
    const texture = new THREE.TextureLoader().load("textures/floor4.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // リピート可能に
    texture.repeat.set(10, 10); // 10x10マスに設定
    texture.magFilter = THREE.NearestFilter; // アンチエイリアスを外す

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.0,
        metalness: 0.6
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
  }

  //マス目
  {
    //立方体とジオメトリ
    const material = new THREE.MeshStandardMaterial({
      color: 0x22dd22,
      roughness: 0.1,
      metalness: 0.2
    });
    const geometry = new THREE.BoxGeometry(45, 45, 45);

    //箱
    for (let i = 0; i < 60; i++) {
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.round((Math.random() - 0.5) * 19) *50 + 25;
      box.position.y = 25;
      box.position.z = Math.round((Math.random() - 0.5) * 19) *50 + 25;
      //影
      box.receiveShadow = true;
      box.castShadow = true;
      scene.add(box);
    }
  }

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // 角度に応じてカメラの位置を設定
    camera.position.x = 500 * Math.sin(Date.now() / 2000);
    camera.position.y = 250;
    camera.position.z = 500 * Math.cos(Date.now() / 2000);
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}