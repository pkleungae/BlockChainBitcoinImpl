
const { GENESIS_DATA, MINE_RATE } = require('../config');

class Block {
    constructor({ difficulty, hash, lastHash, data, nonce, timestamp }) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.nonce = nonce;
      this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
      }

    static mineBlock({lastBlock, data}){
      const lastHash = lastBlock.hash;
      let hash, timestamp;
      //depends on the difficulty in last block
      let { difficulty } = lastBlock;
      let nonce = 0;

      do{
        nonce ++; 
        timestamp = Date.now(); 

      }while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))
    
      return new this({ timestamp, lastHash, data, difficulty, nonce, hash });

    }

    static adjustDifficulty({ originalBlock, timestamp }) {
      const { difficulty } = originalBlock;
  
      if (difficulty < 1) return 1;
  
      if ((timestamp - originalBlock.timestamp) > MINE_RATE ) return difficulty - 1;
  
      return difficulty + 1;
    }
  
}
module.exports = Block;