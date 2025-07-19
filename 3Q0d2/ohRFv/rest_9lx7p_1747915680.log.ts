import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const config: UserConfig = {
  rules: {
      RuleConfigSeverity.Error,
      [
        'chore',
        'docs',
        'fix',
        'release',
        'revert',
        'security',
        'future',
      ],
    ],
  ignores: [
      // add an exception for github
    },
  ],
};

export default config;
