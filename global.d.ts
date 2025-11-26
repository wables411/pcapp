// global.d.ts
import '@react-three/fiber';
import { ThreeElements } from '@react-three/fiber';

// Explicitly extend JSX namespace to ensure types are recognized
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

