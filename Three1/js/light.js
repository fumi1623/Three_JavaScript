// ページの読み込みを待つ
window.addEventListener('load', init);
// サイズを指定
const width = 960;
const height = 540;

function init() {
  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(20, 20, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 床を作成
  const meshFloor = new THREE.Mesh(
    new THREE.BoxGeometry(2000, 0.1, 2000),
    new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
  );
  scene.add(meshFloor);

  // オブジェクトを作成
  const meshKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(3, 1, 100, 16),
    new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
  );
  meshKnot.position.set(0, 5, 0);
  scene.add(meshKnot);

  // 環境光源を作成
  // new THREE.AmbientLight(色, 光の強さ)
  // const light = new THREE.AmbientLight(0xffffff, 1.0);
  // 平行光源を作成
  // new THREE.DirectionalLight(色, 光の強さ)
  // const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  // 半球光源を作成
  // new THREE.HemisphereLight(空の色, 地の色, 光の強さ)
  // const light = new THREE.HemisphereLight(0x888888, 0x0000FF, 5.0);
  // scene.add(light);
  // 点光源を作成
  // new THREE.PointLight(色, 光の強さ, 距離, 光の減衰率)
  // const light = new THREE.PointLight(0xFFFFFF, 2, 50, 1.0);
  // scene.add(light);
  // スポットライト光源を作成
  // new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
  const light = new THREE.SpotLight(0xFFFFFF, 10, 30, Math.PI / 4, 10, 0.5);
  scene.add(light);

  // 照明を可視化するヘルパー
  // const lightHelper = new THREE.HemisphereLightHelper(light);
  // scene.add(lightHelper);
  

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // レンダリング
    renderer.render(scene, camera);

    // 照明の位置を更新
    const t = Date.now() / 500;
    const r = 20.0;
    const lx = r * Math.cos(t);
    const lz = r * Math.sin(t);
    const ly = 6.0 + 5.0 * Math.sin(t / 3.0);
    light.position.set(lx, ly, lz);

    requestAnimationFrame(tick);
  }
}