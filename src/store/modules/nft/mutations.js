export default {
  registerNFT(state, payload) {
    state.nft.push(payload);
  },
  setNFT(state, payload) {
    state.nft = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};