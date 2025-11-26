declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      primitive: any;
      group: any;
      perspectiveCamera: any;
      orbitControls: any;
    }
  }
}

export {};

