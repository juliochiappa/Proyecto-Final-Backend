//import * as url from 'url';
import path from 'path';

const config = {
  PORT: 8080,
  //DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
  DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
  get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
  //MONGODB_URI: 'mongodb://127.0.0.1:27017/coder_53160'
  //MONGODB_URI: 'mongodb+srv://coder_53160:coder2024@clustercoder.sxqjiud.mongodb.net/coder_53160'
  MONGODB_URI: 'mongodb+srv://coder_53160:coder2024@clustercoder.ueqobzv.mongodb.net/ecommerce',
};

export default config;