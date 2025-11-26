import { JSX as FiberJSX } from '@react-three/fiber';

declare global {
  namespace JSX {
    // Merge @react-three/fiber's IntrinsicElements into the global JSX namespace
    interface IntrinsicElements extends FiberJSX.IntrinsicElements {}
  }
}

export {};

