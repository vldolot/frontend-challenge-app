import React, { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { GET_BLOCKS } from '../queries/blocks';
import { GET_INCLUDES } from '../queries/includes';
import { cubeIcon } from './Icons';
import Block from './Block';
import styles from '../styles/BlockList.module.scss';

interface IEvent {
  id: string;
  block: {
    height: string;
  };
}

interface IExtrinsic {
  id: string;
  block: {
    height: string;
  };
}

type TId = {
  id: string;
};

type TExtrinsic = {
  blockHeight: string;
  extrinsics: TId[];
};

type TEvent = {
  blockHeight: string;
  events: TId[];
};

export interface IBlock {
  id: string;
  height: string;
  timestamp: string;
  extrinsicsCount?: number;
  eventsCount?: number;
}

interface IBlockData {
  blocks: IBlock[];
}

interface IIncludesData {
  extrinsics: IExtrinsic[];
  events: IEvent[];
}

function pivotBy(data: any, key1: string, key2: string, T: any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return data.reduce<typeof T[]>((prev: typeof T, cur: typeof data): typeof T => {
    const existing: typeof T[] = prev.find((x: { [x: string]: string }): typeof T => x[key1] === cur.block.height);
    if (existing) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      existing[key2].push({ id: cur.id });
    } else {
      const objToInsert = {
        [key1]: cur.block?.height,
        [key2]: [{ id: cur.id }],
      };
      prev.push(objToInsert);
    }
    return prev;
  }, []);
}

// the latest blocks list component
export default function BlocksList(): JSX.Element {
  const [blockData, setBlockData] = useState<IBlock[]>();

  const [getIncludes, { error: incError }] = useLazyQuery<IIncludesData>(GET_INCLUDES);
  const { loading, error } = useQuery<IBlockData>(GET_BLOCKS, {
    pollInterval: 12000, // re-fetch block every 12 secs same as in subscan
    onCompleted: async data => {
      // get only the block height values
      const blockNumbers: number[] = data?.blocks.map(b => parseInt(b.height)) || [];
      // then manually query the GET_INCLUDES filtering with blockNumbers
      const includes = await getIncludes({ variables: { height_in: blockNumbers } });
      // to pivot the extrinsics and events data into a better structure
      const pivotedExtrinsics: TExtrinsic[] =
        pivotBy(includes?.data?.extrinsics, 'blockHeight', 'extrinsics', {
          blockHeight: '',
          extrinsics: [],
        }) || [];
      const pivotedEvents: TEvent[] =
        pivotBy(includes?.data?.events, 'blockHeight', 'events', {
          blockHeight: '',
          events: [],
        }) || [];

      // map the new blocks data which includes extrinsics and events counts
      const newBlockData: IBlock[] = data.blocks.map(b => {
        let extrinsicsCount = 0;
        let eventsCount = 0;
        for (const el of pivotedExtrinsics) {
          if (el.blockHeight === b.height) {
            extrinsicsCount = el.extrinsics.length;
          }
        }
        for (const el of pivotedEvents) {
          if (el.blockHeight === b.height) {
            eventsCount = el.events.length;
          }
        }
        return { extrinsicsCount, eventsCount, ...b };
      });

      setBlockData(newBlockData);
    },
  });

  if (loading) {
    return (
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    );
  }
  if (error) {
    return <div>{`Error! ${error.message}`}</div>;
  }
  if (incError) {
    return <div>{`Error! ${incError.message}`}</div>;
  }

  return (
    // latest blocks wrapper
    <div className={`${styles['latest-blocks-wrapper']} ${styles['latest-blocks-component']}`}>
      {/* latest blocks headers */}
      <div className={`${styles['header-content']} ${styles['space-between']}`}>
        <div className={`${styles['header-left']} ${styles['align-items-center']}`}>
          {cubeIcon}
          <span className={styles['title']}>Latest Blocks</span>
        </div>
        <div className={`${styles['header-right']}`}>
          <div
            className={`${styles['all-link']} ${styles['main-btn-outlined']}`}
            onClick={() => {
              location.href = 'https://moonbeam.subscan.io/block';
            }}
          >
            View All
          </div>
        </div>
      </div>

      {/* blocks card component */}
      <div className={`${styles['subscan-card']} ${styles['el-scrollbar']}`}>
        {/* block data list */}
        <div
          className={`${styles['data-list']} ${styles['el-scrollbar__wrap']} ${styles['el-scrollbar__wrap--hidden-default']}`}
        >
          <div className={`${styles['el-scrollbar__view']} ${styles['view-box']}`}>
            {/* use react-transition-group to add microinteraction when new block/s is/are added or removed */}
            <TransitionGroup>
              {blockData?.map(block => {
                return (
                  <CSSTransition
                    key={block.id}
                    timeout={500}
                    classNames={{
                      enter: styles['item-enter'],
                      enterActive: styles['item-enter-active'],
                      exit: styles['item-exit'],
                      exitActive: styles['item-exit-active'],
                    }}
                  >
                    <Block block={block} />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
