import Web3 from 'web3';
import WebsocketProvider from '../../services/wsProvider';
import { conf } from '../../app.config';

const confParams = conf();

let web3Instance;

export function getWeb3() {
  if (typeof web3Instance === 'undefined') {
    web3Instance = new Web3(new WebsocketProvider(confParams.gethUrl));
  }
  return web3Instance;
}

export function addEventsDate(events) {
  const web3 = getWeb3();
  const batch = web3.createBatch();
  const result = Promise.all(events.map((event) => (
    new Promise((resolve) => {
      batch.add(web3.eth.getBlock.request(event.blockNumber, (blErr, block) => {
        resolve({
          ...event,
          timestamp: block.timestamp,
        });
      }));
    })
  )));
  batch.execute();

  return result;
}
