import { RuleConfigSeverity } from '@commitlint/types';

const config: UserConfig = {
  rules: {
      RuleConfigSeverity.Error,
        'docs',
        'fix',
        'release',
        'revert',
        'security',
      ],
      // add an exception for github
    },
  ],
};
export default config;
