import boxen, { Options } from 'boxen';
import { blue, bold, cyan } from 'colorette';

interface Config {
  boxen?: Options;
}

interface Work {
  company: string;
  title: string;
}

interface Info {
  name?: string;
  github?: string;
  gitlab?: string;
  handle?: string;
  linkedin?: string;
  medium?: string;
  npm?: string;
  packageName?: string;
  slides?: string;
  twitter?: string;
  website?: string;
  work?: string | Work;
}

const pad = (label: string, length: number, padding: number = 2): string =>
  `${label}${new Array(length - label.length + padding).fill(' ').join('')}`;

const parseItem = (label: string, longestKey: number, url: string, name?: string): string => {
  const labelPadded = pad(label, longestKey);
  const value = `${url}${name ? bold(name) : ''}`;

  return `${labelPadded}${blue(value)}`;
};

const carderator = ({ name, handle, work, packageName, ...info }: Info, config: Config = {}): void => {
  const output = [];
  const infoKeys = Object.keys(info);
  const hasInfo = infoKeys.length > 0;
  const longestKey = infoKeys.reduce(
    (lastNumber: number, nextKey: string): number => (nextKey.length > lastNumber ? nextKey.length : lastNumber),
    4,
  );

  if (name) {
    if (handle) {
      output.push(`${name} / ${cyan(handle)}`);
    } else {
      output.push(name);
    }

    output.push('');
  }

  if (work) {
    const label = pad('Work', longestKey);

    if (typeof work === 'string') {
      output.push(`${label}${work}`);
    } else {
      output.push(`${label}${cyan(work.title)} @ ${work.company}`);
    }

    if (hasInfo) {
      output.push('');
    }
  }

  if (info.twitter) {
    output.push(parseItem('Twitter', longestKey, 'https://twitter.com/', info.twitter));
  }

  if (info.npm) {
    output.push(parseItem('npm', longestKey, 'https://npmjs.com/~', info.npm));
  }

  if (info.github) {
    output.push(parseItem('GitHub', longestKey, 'https://github.com/', info.github));
  }

  if (info.gitlab) {
    output.push(parseItem('GitLab', longestKey, 'https://gitlab.com/', info.gitlab));
  }

  if (info.linkedin) {
    output.push(parseItem('LinkedIn', longestKey, 'https://linkedin.com/in/', info.linkedin));
  }

  if (info.slides) {
    output.push(parseItem('Slides', longestKey, 'https://slides.com/', info.slides));
  }

  if (info.medium) {
    output.push(parseItem('Medium', longestKey, 'https://medium.com/@', info.medium));
  }

  if (info.website) {
    output.push(parseItem('Web', longestKey, info.website));
  }

  if (packageName) {
    if (hasInfo) {
      output.push('');
    }

    output.push(`${pad('Card', longestKey)}npx ${packageName}`);
  }

  /* eslint-disable-next-line no-console */
  console.log(boxen(output.join('\n'), { margin: 1, padding: 1, ...config.boxen }));
};

export default carderator;
