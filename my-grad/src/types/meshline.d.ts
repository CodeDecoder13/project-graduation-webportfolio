/* eslint-disable @typescript-eslint/no-explicit-any */
// Type augmentations for meshline JSX elements in R3F
// This avoids TS errors for <meshLineGeometry /> and <meshLineMaterial />

export {};

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

// Also augment R3F's ThreeElements; some setups rely on this instead of global JSX
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}
