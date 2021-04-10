// ページの読み込みを待つ
window.addEventListener('load', init);
// サイズを指定
const width = 960;
const height = 540;

function init() {

  // レンダラーを作成(3D表示用)
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height); //サイズ適応

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height); //(画角, アスペクト比)
  camera.position.set(0, 0, +1000);

  // material
  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  // マテリアルを作成
  // const material = new THREE.MeshLambertMaterial({color: 0x6699ff});
  // const material = new THREE.MeshPhongMaterial({color: 0x6699ff});
  // const material = new THREE.MeshToonMaterial({color: 0x6699ff});
  const material = new THREE.MeshStandardMaterial({color: 0x6699ff, roughness: 0.5}); //(色, 光沢)
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(mesh);

  //光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // ポイント光源
  const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  scene.add(pointLight);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  //アニメーション
  tick(); //初回実行

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    //light回転
    pointLight.position.set(
      500 * Math.sin(Date.now() / 500),
      500 * Math.sin(Date.now() / 1000),
      500 * Math.sin(Date.now() / 500)
    );

    renderer.render(scene, camera); // レンダリング

    requestAnimationFrame(tick);
  }
}