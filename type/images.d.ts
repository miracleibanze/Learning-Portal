// custom.d.ts or images.d.ts
declare module "*.svg" {
  const content: any; // Use "any" if you're not using a specific SVG type
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.tsx" {
  const content: React.ComponentType<any>;
  export default content;
}
