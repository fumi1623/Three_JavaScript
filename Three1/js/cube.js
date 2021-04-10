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
  renderer.setSize(width, height); //サイズ適応

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000); //(画角, アスペクト比)
  camera.position.set(0, 0, +1000);

  // 球体
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // const material = new THREE.MeshStandardMaterial({color: 0xFF0000});　//単色
  const loader = new THREE.TextureLoader();
  const texture = loader.load("../textures/earth.jpg");
  //materialにtexture設定
  const material = new THREE.MeshStandardMaterial({ map: texture});
  //メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(mesh);

  //光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  //sceneに追加
  scene.add(directionalLight);

  //アニメーション
  tick(); //初回実行

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    mesh.rotation.y += 0.01;
    //レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}