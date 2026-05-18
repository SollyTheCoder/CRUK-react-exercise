/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // minify is true by default in nextjs 16
  // swcMinify: true,

  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    // styledComponents: true,
    //{
    // fileName?: boolean,
    // Empty by default.
    // topLevelImportPaths?: string[],
    // Defaults to ["index"].
    // meaninglessFileNames?: string[],
    // Empty by default.
    // namespace?: string,
    // Not supported yet.
    // minify?: boolean,
    // Not supported yet.
    // transpileTemplateLiterals?: boolean,
    // Not supported yet.
    // pure?: boolean,
  },
};

module.exports = nextConfig;
