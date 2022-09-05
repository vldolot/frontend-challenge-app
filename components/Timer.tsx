import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import formatTimeAgo from '../utils/formatTimeAgo';
import { clockIcon, checkIcon } from './Icons';
import styles from '../styles/BlockList.module.scss';

type TimerProps = {
  timestamp: Date;
  isFinalized: boolean;
};

export default function Timer({ timestamp, isFinalized }: TimerProps): JSX.Element {
  const [ts, setTS] = useState(new Date(timestamp));

  useEffect(() => {
    // this sets the elapsed time when the block was created/retrieved
    const interval = setInterval(() => {
      setTS((prevDate: Date) => new Date(prevDate.setSeconds(prevDate.getSeconds() + 1)));
    }, 1000);

    return () => clearInterval(interval);
  }, [ts]);

  const getStatusIcon = (elName: string, elJSX: JSX.Element, tooltip: string) => {
    return (
      <>
        <div data-tip data-for={elName}>
          {elJSX}
        </div>
        <ReactTooltip id={elName} type="light" effect="solid" className={styles.tooltip} border borderColor="#302b3c">
          <span>{tooltip}</span>
        </ReactTooltip>
      </>
    );
  };

  let blockStatusIcon: JSX.Element;
  if (isFinalized) {
    blockStatusIcon = getStatusIcon('checkIcon', checkIcon, 'Finalized');
  } else {
    blockStatusIcon = getStatusIcon('clockIcon', clockIcon, 'Unfinalized');
  }

  return (
    <div className={`${styles['block-right']} ${styles['align-items-center']}`}>
      <span className={styles['time']}>{formatTimeAgo(timestamp)}</span>
      {blockStatusIcon}
    </div>
  );
}
