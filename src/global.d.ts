// types.d.ts
declare module "*.css" {
  const url: string;
  export default url;
}

declare module "*.png" {
  const value: any;
  export = value;
}
