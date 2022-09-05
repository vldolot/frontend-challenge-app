import TimeAgo, { Labels, Style } from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { round } from 'javascript-time-ago/steps';

TimeAgo.addLocale(en);
const customLabels: Labels = {
  second: {
    past: {
      one: '{0} sec ago',
      other: '{0} secs ago',
    },
    future: {
      one: '{0} sec later',
      other: '{0} secs later',
    },
  },
  minute: {
    past: {
      one: '{0} min ago',
      other: '{0} mins ago',
    },
    future: {
      one: '{0} min later',
      other: '{0} mins later',
    },
  },
  hour: {
    past: {
      one: '{0} hour ago',
      other: '{0} hours ago',
    },
    future: {
      one: '{0} hour later',
      other: '{0} hours later',
    },
  },
  day: {
    past: {
      one: '{0} day ago',
      other: '{0} days ago',
    },
    future: {
      one: '{0} day later',
      other: '{0} days later',
    },
  },
  week: {
    past: {
      one: '{0} week ago',
      other: '{0} weeks ago',
    },
    future: {
      one: '{0} week later',
      other: '{0} weeks later',
    },
  },
  month: {
    past: {
      one: '{0} month ago',
      other: '{0} months ago',
    },
    future: {
      one: '{0} month later',
      other: '{0} months later',
    },
  },
  year: {
    past: {
      one: '{0} year ago',
      other: '{0} years ago',
    },
    future: {
      one: '{0} year later',
      other: '{0} years later',
    },
  },
};
TimeAgo.addLabels('en', 'custom', customLabels);
const timeAgo = new TimeAgo('en-US');
const customStyle: Style = {
  steps: round,
  labels: 'custom',
};

export default function formatTimeAgo(d: Date): string {
  return timeAgo.format(d, customStyle);
}
