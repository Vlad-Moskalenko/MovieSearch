import { Vortex } from 'react-loader-spinner';

import css from './Spinner.module.css';

export const Spinner = () => (
  <div className={css.spinnerWrapper}>
    <Vortex
      visible={true}
      height="150"
      width="150"
      ariaLabel="vortex-loading"
      wrapperStyle={{ margin: 'auto' }}
      wrapperClass=""
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  </div>
);
