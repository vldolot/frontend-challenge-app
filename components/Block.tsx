import React from 'react';
import { IBlock } from './BlocksList';
import Timer from './Timer';
import styles from '../styles/BlockList.module.scss';
import numberWithCommas from '../utils/numberWithCommas';

type BlockProps = {
  block: IBlock;
};

// the block item or row component
export default function Block({ block }: BlockProps): JSX.Element {
  // TODO: determine if a block is finalized or not
  const isFinalized = true;
  return (
    <div className={`${styles['block-item-wrapper']} ${styles['space-between']} ${styles['block-item']}`}>
      <div className={`${styles['block-left']} ${styles['flex-vertical']}`}>
        <div className={`${styles['block-num']} ${styles['align-items-center']}`}>
          <div className={styles['label']}>Block#</div>
          <div className={`${styles['value']} ${styles['link']}`}>
            <a href={`https://moonbeam.subscan.io/block/${block.height}`}>{numberWithCommas(block.height)}</a>
          </div>
        </div>
        <div className={`${styles['block-includes']} ${styles['align-items-center']}`}>
          <div className={styles['label']}>Includes</div>
          <div className={styles['value']}>
            <div className={`${styles['extrinsics']} ${styles['empty']} ${styles['link']}`}>
              <a
                href={`https://moonbeam.subscan.io/block/${block.height}?tab=extrinsic`}
              >{`${block.extrinsicsCount} Extrinsics`}</a>
            </div>
            <div className={`${styles['event']} ${styles['empty']} ${styles['link']}`}>
              <a
                href={`https://moonbeam.subscan.io/block/${block.height}?tab=event`}
              >{`${block.eventsCount} Events`}</a>
            </div>
          </div>
        </div>
      </div>
      <Timer timestamp={new Date(block.timestamp)} isFinalized={isFinalized} />
    </div>
  );
}
