declare global {
  namespace JSX {
    // Extend the global JSX.IntrinsicElements with r3f's elements
    interface IntrinsicElements
      extends import('@react-three/fiber').JSX.IntrinsicElements {}
  }
}

export {};

