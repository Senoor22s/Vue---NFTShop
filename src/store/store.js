import { createStore } from 'vuex';

import nftModule from './modules/nft/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    nft: nftModule,
    auth: authModule
  }
});

export default store;