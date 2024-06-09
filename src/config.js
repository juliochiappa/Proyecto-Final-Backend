import path from 'path';

const config = {
  SERVER: 'atlas',
  PORT: 8080,
  //DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
  DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
  get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
  //MONGODB_URI: 'mongodb://127.0.0.1:27017/coder_53160'
  //MONGODB_URI: 'mongodb+srv://coder_53160:coder2024@clustercoder.sxqjiud.mongodb.net/coder_53160'
  MONGODB_URI: 'mongodb+srv://coder_53160:coder2024@clustercoder.ueqobzv.mongodb.net/ecommerce',
  MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
  SECRET: 'coder_53160_abc1118',
  
  GITHUB_CLIENT_ID: 'Iv23ct5oQGlZkAyUB6vR',
  GITHUB_CLIENT_SECRET: '3b12fa745390b051d46cd8b485b2303f334cc189',
  GITHUB_CALLBACK_URL: 'http://localhost:8080/api/session/ghlogincallback'
};

export default config;